import React from 'react';
import { useGame } from '../../context/GameContext';
import { Bell, X, Check, Trash2, Clock, Flame, Trophy, Sparkles } from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useGame();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl flex flex-col justify-between animate-fadeIn">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold text-white">Notifications & Reminders</h3>
        </div>
        <div className="flex items-center gap-1">
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="text-slate-400 hover:text-rose-400 p-1 text-xs font-semibold"
              title="Clear All"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5 text-xs">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p>No active alerts. All realm scrolls are quiet!</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1 ${
                notif.isRead
                  ? 'bg-slate-950/60 border-slate-800/60 text-slate-400'
                  : 'bg-slate-900 border-amber-500/40 text-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  {notif.type === 'task_reminder' && <Clock className="w-3.5 h-3.5 text-cyan-400" />}
                  {notif.type === 'streak_alert' && <Flame className="w-3.5 h-3.5 text-orange-400" />}
                  {notif.type === 'level_up' && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                  {notif.title}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{notif.timestamp}</span>
              </div>
              <p className="text-[11px] leading-relaxed">{notif.message}</p>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 text-center text-[11px] text-slate-500">
        In-app alerts & scheduled browser push reminders
      </div>
    </div>
  );
};
