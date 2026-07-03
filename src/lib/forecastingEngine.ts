import { Product } from '../types';

export interface ForecastDataPoint {
  monthName: string;
  actual: number;
  forecastMA?: number;
  forecastWMA?: number;
  forecastSES?: number;
  forecastLR?: number;
}

export interface MethodMetrics {
  name: string;
  mad: number;
  mape: number; // in percentage (0 to 100)
  mse: number;
  nextMonthForecast: number;
}

export interface ProductForecastResult {
  product: Product;
  history: number[]; // Jan, Feb, Mar, Apr, May, Jun
  chartData: ForecastDataPoint[];
  metrics: {
    MA: MethodMetrics;
    WMA: MethodMetrics;
    SES: MethodMetrics;
    LR: MethodMetrics;
  };
  bestMethodKey: 'MA' | 'WMA' | 'SES' | 'LR';
  bestMethodName: string;
  bestMethodMAPE: number;
  bestMethodForecast: number;
  recommendedPOQty: number;
  stockStatus: 'Understock' | 'Optimal' | 'Overstock';
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul (Prediksi)'];

export function getHistoricalSales(productId: string, avgDailyDemand: number): number[] {
  // Base monthly sales calculation
  const baseSales = avgDailyDemand > 0 ? avgDailyDemand * 30 : 10;
  
  // Deterministic noise using product ID character codes
  const charSum = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // High-fidelity demand fluctuations
  const monthlyFactors = [0.95, 1.15, 0.82, 1.24, 1.02, 0.96];
  
  return monthlyFactors.map((factor, idx) => {
    const shift = ((charSum + idx) % 7) - 3; // Deterministic range -3 to +3
    const sales = Math.max(1, Math.round(baseSales * factor + shift * 0.4));
    return sales;
  });
}

function fitLinearRegression(y: number[]): { a: number; b: number } {
  const n = y.length;
  if (n < 2) {
    return { a: y[0] || 0, b: 0 };
  }
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  for (let i = 0; i < n; i++) {
    const x = i + 1; // 1-based x values: 1, 2, 3...
    sumX += x;
    sumY += y[i];
    sumXY += x * y[i];
    sumXX += x * x;
  }
  const b = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const a = (sumY - b * sumX) / n;
  return { a, b };
}

export function runProductForecasting(
  product: Product,
  alpha: number = 0.3,
  w1: number = 0.5,
  w2: number = 0.3,
  w3: number = 0.2
): ProductForecastResult {
  const actuals = getHistoricalSales(product.id, product.avgDailyDemand);
  // actuals length is 6:
  // idx 0: Jan, 1: Feb, 2: Mar, 3: Apr, 4: May, 5: Jun

  // 1. Moving Average (MA-3)
  // Forecast available for Apr (3), May (4), Jun (5), and Jul (6)
  const maForecasts: { [key: number]: number } = {};
  for (let t = 3; t <= 6; t++) {
    maForecasts[t] = Math.round((actuals[t - 1] + actuals[t - 2] + actuals[t - 3]) / 3);
  }

  // 2. Weighted Moving Average (WMA-3)
  // Weights sum check & normalize
  const weightSum = w1 + w2 + w3;
  const nw1 = w1 / weightSum;
  const nw2 = w2 / weightSum;
  const nw3 = w3 / weightSum;

  const wmaForecasts: { [key: number]: number } = {};
  for (let t = 3; t <= 6; t++) {
    wmaForecasts[t] = Math.round(
      nw1 * actuals[t - 1] + 
      nw2 * actuals[t - 2] + 
      nw3 * actuals[t - 3]
    );
  }

  // 3. Single Exponential Smoothing (SES)
  // SES is computed step-by-step from t=0
  const sesForecasts: { [key: number]: number } = {};
  sesForecasts[0] = actuals[0]; // Start Jan forecast with Jan actual
  for (let t = 1; t <= 6; t++) {
    // F_t = alpha * Y_t-1 + (1 - alpha) * F_t-1
    sesForecasts[t] = Math.round(alpha * actuals[t - 1] + (1 - alpha) * sesForecasts[t - 1]);
  }

  // 4. Linear Regression (LR)
  const lrForecasts: { [key: number]: number } = {};
  for (let t = 2; t <= 6; t++) {
    const historySlice = actuals.slice(0, t);
    const { a, b } = fitLinearRegression(historySlice);
    // Projecting for month t (where t is 0-indexed, so we want x = t + 1)
    lrForecasts[t] = Math.max(1, Math.round(a + b * (t + 1)));
  }

  // Compute metrics for Apr, May, Jun (t = 3, 4, 5)
  const testPeriods = [3, 4, 5];
  
  // MA error sums
  let maAbsErrSum = 0;
  let maSqrErrSum = 0;
  let maPctErrSum = 0;

  // WMA error sums
  let wmaAbsErrSum = 0;
  let wmaSqrErrSum = 0;
  let wmaPctErrSum = 0;

  // SES error sums
  let sesAbsErrSum = 0;
  let sesSqrErrSum = 0;
  let sesPctErrSum = 0;

  // LR error sums
  let lrAbsErrSum = 0;
  let lrSqrErrSum = 0;
  let lrPctErrSum = 0;

  testPeriods.forEach(t => {
    const act = actuals[t];

    // MA Errors
    const maF = maForecasts[t];
    const maAbs = Math.abs(act - maF);
    maAbsErrSum += maAbs;
    maSqrErrSum += maAbs * maAbs;
    maPctErrSum += act > 0 ? (maAbs / act) : 0;

    // WMA Errors
    const wmaF = wmaForecasts[t];
    const wmaAbs = Math.abs(act - wmaF);
    wmaAbsErrSum += wmaAbs;
    wmaSqrErrSum += wmaAbs * wmaAbs;
    wmaPctErrSum += act > 0 ? (wmaAbs / act) : 0;

    // SES Errors
    const sesF = sesForecasts[t];
    const sesAbs = Math.abs(act - sesF);
    sesAbsErrSum += sesAbs;
    sesSqrErrSum += sesAbs * sesAbs;
    sesPctErrSum += act > 0 ? (sesAbs / act) : 0;

    // LR Errors
    const lrF = lrForecasts[t];
    const lrAbs = Math.abs(act - lrF);
    lrAbsErrSum += lrAbs;
    lrSqrErrSum += lrAbs * lrAbs;
    lrPctErrSum += act > 0 ? (lrAbs / act) : 0;
  });

  const periodsCount = testPeriods.length;

  const metricsMA: MethodMetrics = {
    name: 'Moving Average (3-Bulan)',
    mad: maAbsErrSum / periodsCount,
    mse: maSqrErrSum / periodsCount,
    mape: (maPctErrSum / periodsCount) * 100,
    nextMonthForecast: maForecasts[6]
  };

  const metricsWMA: MethodMetrics = {
    name: 'Weighted Moving Average (3-Bulan)',
    mad: wmaAbsErrSum / periodsCount,
    mse: wmaSqrErrSum / periodsCount,
    mape: (wmaPctErrSum / periodsCount) * 100,
    nextMonthForecast: wmaForecasts[6]
  };

  const metricsSES: MethodMetrics = {
    name: 'Single Exponential Smoothing',
    mad: sesAbsErrSum / periodsCount,
    mse: sesSqrErrSum / periodsCount,
    mape: (sesPctErrSum / periodsCount) * 100,
    nextMonthForecast: sesForecasts[6]
  };

  const metricsLR: MethodMetrics = {
    name: 'Linear Regression (Trend Linear)',
    mad: lrAbsErrSum / periodsCount,
    mse: lrSqrErrSum / periodsCount,
    mape: (lrPctErrSum / periodsCount) * 100,
    nextMonthForecast: lrForecasts[6]
  };

  // Determine best method: lowest MAPE
  let bestMethodKey: 'MA' | 'WMA' | 'SES' | 'LR' = 'SES';
  let bestMetrics = metricsSES;

  if (metricsMA.mape < bestMetrics.mape) {
    bestMethodKey = 'MA';
    bestMetrics = metricsMA;
  }
  if (metricsWMA.mape < bestMetrics.mape) {
    bestMethodKey = 'WMA';
    bestMetrics = metricsWMA;
  }
  if (metricsLR.mape < bestMetrics.mape) {
    bestMethodKey = 'LR';
    bestMetrics = metricsLR;
  }

  const bestMethodForecast = Math.max(1, Math.round(bestMetrics.nextMonthForecast));

  // Determine recommended PO based on the Economic Order Quantity (EOQ) from the data sheet.
  const recommendedPOQty = product.eoq && product.eoq > 0 
    ? product.eoq 
    : Math.max(10, Math.round(bestMethodForecast));

  // Stock Status for next month based on safety guidelines
  let stockStatus: 'Understock' | 'Optimal' | 'Overstock' = 'Optimal';
  if (product.currentStock < bestMethodForecast) {
    stockStatus = 'Understock';
  } else if (product.currentStock > (bestMethodForecast + (product.safetyStock || 2)) * 2) {
    stockStatus = 'Overstock';
  }

  // Assemble chart data
  const chartData: ForecastDataPoint[] = MONTH_NAMES.map((mName, idx) => {
    if (idx === 6) {
      // July prediction
      return {
        monthName: mName,
        actual: 0, // no actual yet
        forecastMA: maForecasts[6],
        forecastWMA: wmaForecasts[6],
        forecastSES: sesForecasts[6],
        forecastLR: lrForecasts[6],
      };
    }

    const dataPoint: ForecastDataPoint = {
      monthName: mName,
      actual: actuals[idx],
    };

    // Apr, May, Jun forecasts are available for test evaluation
    if (idx >= 3) {
      dataPoint.forecastMA = maForecasts[idx];
      dataPoint.forecastWMA = wmaForecasts[idx];
      dataPoint.forecastSES = sesForecasts[idx];
      dataPoint.forecastLR = lrForecasts[idx];
    } else {
      // For exponential smoothing and LR, we can show points from Feb/Mar
      if (idx > 0) {
        dataPoint.forecastSES = sesForecasts[idx];
      }
      if (idx >= 2) {
        dataPoint.forecastLR = lrForecasts[idx];
      }
    }

    return dataPoint;
  });

  return {
    product,
    history: actuals,
    chartData,
    metrics: {
      MA: metricsMA,
      WMA: metricsWMA,
      SES: metricsSES,
      LR: metricsLR
    },
    bestMethodKey,
    bestMethodName: bestMetrics.name,
    bestMethodMAPE: bestMetrics.mape,
    bestMethodForecast,
    recommendedPOQty,
    stockStatus
  };
}
