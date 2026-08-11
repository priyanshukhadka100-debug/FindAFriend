import { addRipple } from '../../utils/ripple';
import { formatTimeDisplay } from '../../utils/scheduleHelpers';

export default function DashboardView({
  students,
  allActivities,
  resetAllData,
  setShowCreateModal,
  setShowCreateStudent,
  setCurrentPage,
  setSelectedActivity,
  setShowActivityDetail,
  getStatusBadge,
  getStatusClass,
}) {
  const totalStudents = students.length;
  const totalActivities = allActivities.length;
  const recentActivities = allActivities.slice(0, 6);

  return (
                    <div className="fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                            <div className="bg-white rounded-2xl p-5 shadow-xs card-hover border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-blue-50 rounded-2xl flex items-center justify-center text-xl">👨‍🎓</div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Students</p>
                                        <p className="text-xl font-bold text-gray-800">{totalStudents}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-xs card-hover border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-teal-50 rounded-2xl flex items-center justify-center text-xl">📢</div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Activities</p>
                                        <p className="text-xl font-bold text-gray-800">{totalActivities}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-xs card-hover border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center text-xl">⚙️</div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Storage Control</p>
                                        <button onClick={resetAllData} className="btn-danger text-xs px-3 py-1 rounded-lg font-medium mt-1">
                                            Clear Session
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-white rounded-2xl shadow-xs p-5 border border-gray-100 card-hover">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-lg">📝</div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-sm">Create Activity</h4>
                                        <p className="text-xs text-gray-400 font-normal">Post an official campus activity</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowCreateModal(true)} onMouseDown={addRipple} className="ripple-btn btn-gold w-full py-2.5 rounded-xl font-semibold text-xs shadow-xs">
                                    <i className="fas fa-plus mr-1.5"></i> New Activity
                                </button>
                            </div>
                            <div className="bg-white rounded-2xl shadow-xs p-5 border border-gray-100 card-hover">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg">👨‍🎓</div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-sm">Student Management</h4>
                                        <p className="text-xs text-gray-400 font-normal">Add and manage student credentials</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowCreateStudent(true)} onMouseDown={addRipple} className="ripple-btn btn-forest w-full py-2.5 rounded-xl font-semibold text-xs shadow-xs">
                                    <i className="fas fa-user-plus mr-1.5"></i> Add Student
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xs p-5 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-gray-800">Recent Campus Activities</h3>
                                <button onClick={() => setCurrentPage('activities')} className="text-forest-teal font-medium hover:underline text-xs">
                                    View All →
                                </button>
                            </div>
                            {recentActivities.length === 0 ? (
                                <div className="text-center py-8 text-gray-400 font-normal text-xs">
                                    <span className="text-3xl block mb-1.5">📝</span>
                                    <p>No activities posted yet.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                    {recentActivities.map(activity => {
                                        const status = getStatusBadge(activity);
                                        const categoryColor = activity.category === 'sport' ? 'tag-sport' : activity.category === 'project' ? 'tag-project' : 'tag-hangout';
                                        return (
                                            <div key={activity.id} className="activity-card bg-gray-50/70 rounded-xl p-3.5 border border-gray-100 flex flex-col justify-between" onClick={() => { setSelectedActivity(activity); setShowActivityDetail(true); }}>
                                                <div>
                                                    <div className="flex items-start justify-between mb-1.5">
                                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${categoryColor}`}>{activity.category}</span>
                                                        <span className={`text-[11px] px-2 py-0.5 rounded-md ${getStatusClass(status)}`}>{status}</span>
                                                    </div>
                                                    <h4 className="font-semibold text-gray-800 text-sm mt-1 line-clamp-1">{activity.title}</h4>
                                                    <p className="text-xs text-gray-500 mt-1 font-normal"><i className="fas fa-map-marker-alt text-electric-gold mr-1 text-[11px]"></i>{activity.location}</p>
                                                    <p className="text-xs text-gray-400 mt-1 font-normal"><i className="fas fa-clock text-electric-gold mr-1 text-[11px]"></i>{activity.date} · {formatTimeDisplay(activity.startTime)} - {formatTimeDisplay(activity.endTime)}</p>
                                                </div>
                                                <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs font-normal">
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
