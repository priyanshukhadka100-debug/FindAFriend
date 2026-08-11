export default function NotificationsModal({ show, onClose, notifications, markAllNotificationsRead, handleNotificationClick }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={onClose}>
                            <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] shadow-xl flex flex-col" onClick={e => e.stopPropagation()}>
                                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5 shrink-0">
                                    <h3 className="font-bold text-base text-gray-800">🔔 Notifications</h3>
                                    <div className="flex items-center gap-3">
                                        {notifications.filter(n => !n.read).length > 0 && (
                                            <button onClick={markAllNotificationsRead} className="text-xs font-medium text-forest-teal hover:underline">Mark all read</button>
                                        )}
                                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-3.5 space-y-2">
                                    {notifications.length === 0 ? (
                                        <div className="text-center py-8 text-gray-400 text-xs font-normal">No notifications yet</div>
                                    ) : (
                                        notifications.map(notif => (
                                            <div 
                                                key={notif.id} 
                                                className={`notification-item p-3 rounded-xl cursor-pointer border border-gray-100 ${notif.read ? 'bg-white' : 'unread'}`} 
                                                onClick={() => handleNotificationClick(notif)}
                                            >
                                                <div className="flex items-start gap-2.5">
                                                    <div className="mt-0.5 text-base">{notif.type === 'new_activity' ? '📢' : '⭐'}</div>
                                                    <div className="flex-1">
                                                        <p className={`text-xs ${notif.read ? 'text-gray-600 font-normal' : 'text-gray-800 font-semibold'}`}>{notif.message}</p>
                                                        <p className="text-[10px] text-gray-400 mt-0.5 font-normal">{new Date(notif.createdAt).toLocaleString()}</p>
                                                    </div>
                                                    {!notif.read && <span className="w-2 h-2 bg-electric-gold rounded-full shrink-0 mt-1.5"></span>}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
  );
}
