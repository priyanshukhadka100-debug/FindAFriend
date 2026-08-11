import { addRipple } from '../../utils/ripple';
import { formatTimeDisplay } from '../../utils/scheduleHelpers';

export default function ActivitiesView({
  allActivities,
  setShowCreateModal,
  setSelectedActivity,
  setShowActivityDetail,
  getStatusBadge,
  getStatusClass,
}) {
  return (
                <div className="fade-in">
                    <div className="bg-white rounded-2xl shadow-xs p-5 md:p-6 border border-gray-100">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-800">📝 All Campus Activities</h3>
                                <p className="text-xs text-gray-400 mt-0.5 font-normal">Manage all published activities</p>
                            </div>
                            <button onClick={() => setShowCreateModal(true)} onMouseDown={addRipple} className="ripple-btn btn-gold px-5 py-2 rounded-full font-semibold text-xs shadow-xs flex items-center gap-1.5">
                                <i className="fas fa-plus text-xs"></i> Create Activity
                            </button>
                        </div>

                        {allActivities.length === 0 ? (
                            <div className="text-center py-12 text-gray-400">
                                <span className="text-4xl block mb-2">📝</span>
                                <p className="text-sm font-semibold text-gray-700">No activities created yet</p>
                                <p className="text-xs text-gray-400 mt-0.5 font-normal">Click "Create Activity" to publish the first campus event.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                {allActivities.map(activity => {
                                    const status = getStatusBadge(activity);
                                    const categoryColor = activity.category === 'sport' ? 'tag-sport' : activity.category === 'project' ? 'tag-project' : 'tag-hangout';
                                    return (
                                        <div key={activity.id} className="activity-card bg-gray-50/70 rounded-xl p-4 border border-gray-100 flex flex-col justify-between" onClick={() => { setSelectedActivity(activity); setShowActivityDetail(true); }}>
                                            <div>
                                                <div className="flex items-start justify-between mb-1.5">
                                                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${categoryColor}`}>{activity.category}</span>
                                                    <span className={`text-[11px] px-2 py-0.5 rounded-md ${getStatusClass(status)}`}>{status}</span>
                                                </div>
                                                <h4 className="font-semibold text-gray-800 text-sm mt-1 line-clamp-1">{activity.title}</h4>
                                                <p className="text-xs text-gray-500 mt-1 font-normal"><i className="fas fa-map-marker-alt text-electric-gold mr-1 text-[11px]"></i>{activity.location}</p>
                                                <p className="text-xs text-gray-400 mt-1 font-normal"><i className="fas fa-clock text-electric-gold mr-1 text-[11px]"></i>{activity.date} · {formatTimeDisplay(activity.startTime)} - {formatTimeDisplay(activity.endTime)}</p>
                                            </div>
                                            <div className="mt-3 pt-2.5 border-t border-gray-200/60 flex items-center justify-between text-xs font-normal">
                                                <span className="text-gray-600">{activity.joined?.length || 0}/{activity.spots || 4} spots</span>
                                                <span className="text-gray-400">by {activity.posterName}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
  );
}
