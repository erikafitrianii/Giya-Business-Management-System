import React from 'react';
import { 
  Bell, 
  ShoppingBag, 
  AlertTriangle, 
  CreditCard, 
  UserCheck, 
  Cpu, 
  Check, 
  Trash2,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onRefresh?: () => void;
}

export default function NotificationsView({ 
  notifications, 
  onMarkAllAsRead, 
  onMarkAsRead,
  onClearAll,
  onRefresh
}: NotificationsViewProps) {

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-5 h-5 text-pink-600" />;
      case 'stock':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'payment':
        return <CreditCard className="w-5 h-5 text-emerald-600" />;
      case 'customer':
        return <UserCheck className="w-5 h-5 text-indigo-600" />;
      default:
        return <Cpu className="w-5 h-5 text-pink-500" />;
    }
  };

  const getNotificationBg = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return 'bg-pink-50 border-pink-100';
      case 'stock':
        return 'bg-amber-50 border-amber-100';
      case 'payment':
        return 'bg-emerald-50 border-emerald-100';
      case 'customer':
        return 'bg-indigo-50 border-indigo-100';
      default:
        return 'bg-pink-50 border-pink-100';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pink-950 font-sans tracking-tight">Notifikasi & Log Aktivitas</h1>
          <p className="text-sm text-pink-700/80">Monitor aktivitas sistem secara real-time, log stok kritis, dan transaksi yang masuk.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {onRefresh && (
            <button 
              onClick={onRefresh}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Perbarui Aktivitas</span>
            </button>
          )}
          {unreadCount > 0 && (
            <button 
              onClick={onMarkAllAsRead}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-white border border-pink-100 hover:bg-pink-50/50 text-pink-700 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Tandai Semua Dibaca</span>
            </button>
          )}
          <button 
            onClick={onClearAll}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-rose-50 border border-rose-100 hover:bg-rose-100/50 text-rose-700 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Bersihkan Semua</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-pink-50 flex justify-between items-center bg-pink-50/10">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-pink-500" />
            <h3 className="font-bold text-slate-800">Aktivitas Terbaru</h3>
          </div>
          {unreadCount > 0 && (
            <span className="bg-pink-500 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-2xs">
              {unreadCount} Baru
            </span>
          )}
        </div>

        {/* List of items */}
        <div className="divide-y divide-pink-50">
          {notifications.map((item) => {
            return (
              <div 
                key={item.id}
                onClick={() => !item.isRead && onMarkAsRead(item.id)}
                className={`p-5 flex gap-4 transition-all hover:bg-pink-50/10 ${!item.isRead ? 'bg-pink-50/30 cursor-pointer' : ''}`}
              >
                {/* Left side icon indicator */}
                <div className={`p-2.5 rounded-xl border shrink-0 ${getNotificationBg(item.type)}`}>
                  {getNotificationIcon(item.type)}
                </div>

                {/* Text Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className={`text-sm text-slate-800 ${!item.isRead ? 'font-bold' : 'font-semibold'}`}>
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0 font-semibold">{item.timeAgo}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.message}</p>
                </div>

                {/* Right side unread dot */}
                {!item.isRead && (
                  <div className="flex items-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}

          {notifications.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <Sparkles className="w-8 h-8 text-pink-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">Kotak masuk notifikasi bersih!</p>
              <p className="text-xs mt-0.5">Semua peringatan sistem telah dibersihkan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
