export type ThemeKey = 'ocean' | 'emerald' | 'sunset' | 'violet' | 'rose';
export type ChartColorKey = 'soft_blue' | 'warm_amber' | 'rosewood' | 'emerald_green';
export type FontKey = 'poppins' | 'inter' | 'jakarta' | 'mono';
export type EffectKey = 'default' | 'twilight' | 'minimalist' | 'golden';
export type TextColorKey = 'slate' | 'charcoal' | 'navy' | 'brown';

export interface ThemePreferences {
  theme: ThemeKey;
  chartColor: ChartColorKey;
  font: FontKey;
  effect: EffectKey;
  textColor: TextColorKey;
}

export const DEFAULT_THEME_PREFS: ThemePreferences = {
  theme: 'rose',
  chartColor: 'rosewood',
  font: 'jakarta',
  effect: 'default',
  textColor: 'slate'
};

// Theme color definitions for Tailwind classes
export interface ThemeColorStyles {
  primary: string;       // e.g. "pink-600"
  primaryText: string;   // e.g. "text-pink-600"
  primaryBg: string;     // e.g. "bg-pink-600"
  primaryHover: string;  // e.g. "hover:bg-pink-700"
  primaryBgLight: string; // e.g. "bg-pink-50/20"
  primaryBorder: string;  // e.g. "border-pink-100"
  primaryBorderLight: string; // e.g. "border-pink-50"
  sidebarActive: string; // e.g. "bg-pink-100 text-pink-900"
  accentBar: string;     // e.g. "bg-pink-500"
  textHeader: string;    // e.g. "text-pink-950"
  bgGradient: string;    // e.g. "from-pink-50 to-rose-50/50"
  badge: string;         // e.g. "bg-pink-500 text-white"
  tag: string;           // e.g. "bg-pink-50 text-pink-700 border-pink-100"
  textMuted: string;     // e.g. "text-pink-700/80"
  buttonText: string;    // e.g. "text-pink-700 hover:text-pink-900"
  ring: string;          // e.g. "focus:ring-pink-500"
}

export const THEME_COLOR_MAP: Record<ThemeKey, ThemeColorStyles> = {
  rose: {
    primary: 'pink-600',
    primaryText: 'text-pink-600',
    primaryBg: 'bg-pink-600',
    primaryHover: 'hover:bg-pink-700',
    primaryBgLight: 'bg-pink-50/20',
    primaryBorder: 'border-pink-100',
    primaryBorderLight: 'border-pink-50',
    sidebarActive: 'bg-pink-100 text-pink-900',
    accentBar: 'bg-pink-500',
    textHeader: 'text-pink-950',
    bgGradient: 'from-pink-50 to-rose-50/50',
    badge: 'bg-pink-500 text-white',
    tag: 'bg-pink-50 text-pink-700 border-pink-100',
    textMuted: 'text-pink-700/80',
    buttonText: 'text-pink-700 hover:text-pink-900',
    ring: 'focus:ring-pink-500',
  },
  ocean: {
    primary: 'blue-600',
    primaryText: 'text-blue-600',
    primaryBg: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    primaryBgLight: 'bg-blue-50/20',
    primaryBorder: 'border-blue-100',
    primaryBorderLight: 'border-blue-50',
    sidebarActive: 'bg-blue-100 text-blue-900',
    accentBar: 'bg-blue-500',
    textHeader: 'text-blue-950',
    bgGradient: 'from-blue-50 to-sky-50/50',
    badge: 'bg-blue-500 text-white',
    tag: 'bg-blue-50 text-blue-700 border-blue-100',
    textMuted: 'text-blue-700/80',
    buttonText: 'text-blue-700 hover:text-blue-900',
    ring: 'focus:ring-blue-500',
  },
  emerald: {
    primary: 'emerald-600',
    primaryText: 'text-emerald-600',
    primaryBg: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    primaryBgLight: 'bg-emerald-50/20',
    primaryBorder: 'border-emerald-100',
    primaryBorderLight: 'border-emerald-50',
    sidebarActive: 'bg-emerald-100 text-emerald-900',
    accentBar: 'bg-emerald-500',
    textHeader: 'text-emerald-950',
    bgGradient: 'from-emerald-50 to-teal-50/50',
    badge: 'bg-emerald-500 text-white',
    tag: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    textMuted: 'text-emerald-700/80',
    buttonText: 'text-emerald-700 hover:text-emerald-900',
    ring: 'focus:ring-emerald-500',
  },
  sunset: {
    primary: 'orange-600',
    primaryText: 'text-orange-600',
    primaryBg: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    primaryBgLight: 'bg-orange-50/20',
    primaryBorder: 'border-orange-100',
    primaryBorderLight: 'border-orange-50',
    sidebarActive: 'bg-orange-100 text-orange-900',
    accentBar: 'bg-orange-500',
    textHeader: 'text-orange-950',
    bgGradient: 'from-orange-50 to-amber-50/50',
    badge: 'bg-orange-500 text-white',
    tag: 'bg-orange-50 text-orange-700 border-orange-100',
    textMuted: 'text-orange-700/80',
    buttonText: 'text-orange-700 hover:text-orange-900',
    ring: 'focus:ring-orange-500',
  },
  violet: {
    primary: 'violet-600',
    primaryText: 'text-violet-600',
    primaryBg: 'bg-violet-600',
    primaryHover: 'hover:bg-violet-700',
    primaryBgLight: 'bg-violet-50/20',
    primaryBorder: 'border-violet-100',
    primaryBorderLight: 'border-violet-50',
    sidebarActive: 'bg-violet-100 text-violet-900',
    accentBar: 'bg-violet-500',
    textHeader: 'text-violet-950',
    bgGradient: 'from-violet-50 to-purple-50/50',
    badge: 'bg-violet-500 text-white',
    tag: 'bg-violet-50 text-violet-700 border-violet-100',
    textMuted: 'text-violet-700/80',
    buttonText: 'text-violet-700 hover:text-violet-900',
    ring: 'focus:ring-violet-500',
  }
};

// Font-family tailwind inline class names
export const FONT_MAP: Record<FontKey, { className: string; name: string }> = {
  poppins: { className: 'font-poppins', name: 'Poppins (Friendly)' },
  inter: { className: 'font-inter', name: 'Inter (Sains/Sleek)' },
  jakarta: { className: 'font-jakarta', name: 'Plus Jakarta (Modern)' },
  mono: { className: 'font-mono-jb', name: 'JetBrains Mono (Teknis)' },
};

// Text color tailwind classes
export const TEXT_COLOR_MAP: Record<TextColorKey, { className: string; name: string; hoverClass: string }> = {
  slate: { className: 'text-slate-800', name: 'Slate Gray (Default)', hoverClass: 'hover:text-slate-900' },
  charcoal: { className: 'text-neutral-900', name: 'Charcoal Black', hoverClass: 'hover:text-black' },
  navy: { className: 'text-indigo-950', name: 'Deep Navy', hoverClass: 'hover:text-indigo-900' },
  brown: { className: 'text-amber-950', name: 'Warm Espresso', hoverClass: 'hover:text-amber-900' }
};

// Chart colors (Primary and auxiliary tones)
export interface ChartColors {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  palette: string[];
}

export const CHART_COLOR_MAP: Record<ChartColorKey, ChartColors> = {
  soft_blue: {
    primary: '#2563eb', // Blue 600
    secondary: '#38bdf8', // Sky 400
    tertiary: '#60a5fa', // Blue 400
    quaternary: '#93c5fd', // Blue 300
    palette: ['#2563eb', '#38bdf8', '#60a5fa', '#93c5fd', '#dbeafe', '#1e3a8a']
  },
  warm_amber: {
    primary: '#ea580c', // Orange 600
    secondary: '#fbbf24', // Amber 400
    tertiary: '#f97316', // Orange 500
    quaternary: '#fcd34d', // Amber 300
    palette: ['#ea580c', '#fbbf24', '#f97316', '#fcd34d', '#fef3c7', '#7c2d12']
  },
  rosewood: {
    primary: '#db2777', // Pink 600
    secondary: '#fb7185', // Rose 400
    tertiary: '#ec4899', // Pink 500
    quaternary: '#fda4af', // Rose 300
    palette: ['#db2777', '#fb7185', '#ec4899', '#fda4af', '#fce7f3', '#9d174d']
  },
  emerald_green: {
    primary: '#059669', // Emerald 600
    secondary: '#34d399', // Emerald 400
    tertiary: '#10b981', // Emerald 500
    quaternary: '#6ee7b7', // Emerald 300
    palette: ['#059669', '#34d399', '#10b981', '#6ee7b7', '#d1fae5', '#064e3b']
  }
};

// Effect preset styles
export interface EffectStyles {
  cardClass: string;
  shadowClass: string;
  buttonEffect: string;
  borderClass: string;
  ambientClass: string;
}

export const EFFECT_MAP: Record<EffectKey, EffectStyles> = {
  default: {
    cardClass: 'bg-white rounded-2xl border',
    shadowClass: 'shadow-xs',
    buttonEffect: 'active:scale-95 transition-transform duration-100',
    borderClass: 'border-slate-100',
    ambientClass: 'bg-slate-50/20'
  },
  twilight: {
    cardClass: 'bg-[#faf6f0] rounded-2xl border', // Warm ivory cream background
    shadowClass: 'shadow-md shadow-amber-900/5',
    buttonEffect: 'active:scale-95 transition-all hover:brightness-95',
    borderClass: 'border-amber-200/40',
    ambientClass: 'bg-amber-50/10 sepia-[0.1]'
  },
  minimalist: {
    cardClass: 'bg-slate-50/40 rounded-xl border-0', // Frameless
    shadowClass: 'shadow-none',
    buttonEffect: 'transition-opacity hover:opacity-90',
    borderClass: 'border-transparent',
    ambientClass: 'bg-white'
  },
  golden: {
    cardClass: 'bg-white rounded-3xl border-2 border-amber-100/80 relative',
    shadowClass: 'shadow-xl shadow-amber-500/5',
    buttonEffect: 'active:scale-95 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-200',
    borderClass: 'border-amber-100',
    ambientClass: 'bg-amber-50/15'
  }
};
