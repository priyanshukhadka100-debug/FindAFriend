import { formatTimeDisplay } from '../../utils/scheduleHelpers';

export default function ActivityDetailModal({ show, activity, onClose, onDelete }) {
  if (!show || !activity) return null;
  return (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
                            <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 shadow-xl" onClick={e => e.stopPropagation()}>
                                <div className="flex items-start justify-between mb-3.5">
                                    <div>
                                        <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md ${activity.category === 'sport' ? 'tag-sport' : activity.category === 'project' ? 'tag-project' : 'tag-hangout'}`}>{activity.category}</span>
                                        <h3 className="text-lg font-bold text-gray-800 mt-1">{activity.title}</h3>
                                    </div>
                                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                                </div>
                                <div className="space-y-3.5">
                                    <div className="flex flex-wrap gap-3 text-xs text-gray-600 bg-gray-50/80 p-3 rounded-xl border border-gray-100 font-normal">
                                        <span><i className="fas fa-calendar text-electric-gold mr-1.5"></i>{activity.date}</span>
                                        <span><i className="fas fa-clock text-electric-gold mr-1.5"></i>{formatTimeDisplay(activity.startTime)} - {formatTimeDisplay(activity.endTime)}</span>
                                        <span><i className="fas fa-map-marker-alt text-electric-gold mr-1.5"></i>{activity.location}</span>
                                    </div>
                                    {activity.description && (
                                        <div className="bg-teal-50/40 p-3.5 rounded-xl border border-teal-100/80 text-xs md:text-sm text-gray-700 leading-relaxed font-normal">
                                            {activity.description}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-semibold text-gray-600">👥 {activity.joined?.length || 0}/{activity.spots || 4} spots filled</span>
                                        <span className="text-xs text-gray-400 font-normal">Organized by {activity.posterName}</span>
                                    </div>
                                    <div className="flex gap-2.5 pt-2">
                                        <button onClick={() => onDelete(activity.id)} className="btn-danger flex-1 py-2 rounded-xl font-medium text-xs">
                                            Delete Activity
                                        </button>
                                        <button onClick={onClose} className="flex-1 border border-gray-200 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
  );
}
