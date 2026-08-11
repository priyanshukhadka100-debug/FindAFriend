import { addRipple } from '../../utils/ripple';
import { formatTimeDisplay } from '../../utils/scheduleHelpers';

export default function StudentDashboardView({
  activities,
  myId,
  filter,
  setFilter,
  filteredActivities,
  setShowPostModal,
  setSelectedPost,
  setShowActivityDetail,
  getUserChats,
  getStatusBadge,
  getStatusClass,
}) {
  const totalActivities = activities.length;

  return (
                    <div className="fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                            <div className="bg-white rounded-2xl p-5 shadow-xs card-hover border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-blue-50 rounded-2xl flex items-center justify-center text-xl">📅</div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Activities</p>
                                        <p className="text-xl font-bold text-gray-800">{totalActivities}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-xs card-hover border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-teal-50 rounded-2xl flex items-center justify-center text-xl">👥</div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Joined Activities</p>
                                        <p className="text-xl font-bold text-gray-800">{activities.filter(p => p.joined && Array.isArray(p.joined) && p.joined.some(j => j.id === myId)).length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-xs card-hover border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center text-xl">💬</div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Conversations</p>
                                        <p className="text-xl font-bold text-gray-800">{getUserChats().length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xs p-5 md:p-6 border border-gray-100">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-800">Campus Activities</h3>
                                    <p className="text-xs text-gray-400 mt-0.5 font-normal">Explore or organize events with peers</p>
                                </div>
                                <button onClick={() => setShowPostModal(true)} onMouseDown={addRipple} className="ripple-btn btn-forest px-5 py-2 rounded-full font-semibold text-xs shadow-xs flex items-center gap-1.5">
                                    <i className="fas fa-plus text-xs"></i> Create Activity
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-5">
                                {['all', 'sport', 'project', 'hangout'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${filter === cat ? 'bg-forest-teal text-white font-semibold' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </button>
                                ))}
                            </div>

                            {filteredActivities.length === 0 ? (
                                <div className="text-center py-10 text-gray-400">
                                    <span className="text-4xl block mb-2">🌱</span>
                                    <p className="font-semibold text-gray-700 text-sm">No activities found</p>
                                    <p className="text-xs text-gray-400 mt-0.5 font-normal">Be the first to create an activity for this category!</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                    {filteredActivities.map(item => {
                                        const status = getStatusBadge(item);
                                        const maxSlots = item.spots || 4;
                                        const joinedCount = item.joined && Array.isArray(item.joined) ? item.joined.length : 0;
                                        const isFull = joinedCount >= maxSlots;
                                        const isJoined = item.joined && Array.isArray(item.joined) && item.joined.some(j => j.id === myId);
                                        const categoryColor = item.category === 'sport' ? 'tag-sport' : item.category === 'project' ? 'tag-project' : 'tag-hangout';
                                        
                                        return (
                                            <div key={item.id} className="activity-card bg-gray-50/70 rounded-xl p-4 border border-gray-100 flex flex-col justify-between" onClick={() => { setSelectedPost(item); setShowActivityDetail(true); }}>
                                                <div>
                                                    <div className="flex items-start justify-between mb-2">
                                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${categoryColor}`}>{item.category}</span>
                                                        <span className={`text-[11px] px-2 py-0.5 rounded-md ${getStatusClass(status)}`}>{status}</span>
                                                    </div>
                                                    <h4 className="font-semibold text-gray-800 text-sm mt-1 line-clamp-1">{item.title}</h4>
                                                    <p className="text-xs text-gray-500 mt-1 font-normal"><i className="fas fa-map-marker-alt text-electric-gold mr-1 text-[11px]"></i>{item.location}</p>
                                                    <p className="text-xs text-gray-400 mt-1 font-normal"><i className="fas fa-clock text-electric-gold mr-1 text-[11px]"></i>{item.date} · {formatTimeDisplay(item.startTime)} - {formatTimeDisplay(item.endTime)}</p>
                                                </div>
                                                <div className="mt-3 pt-2.5 border-t border-gray-200/60 flex items-center justify-between text-xs font-normal">
                                                    <span className="text-gray-600">
                                                        {joinedCount}/{maxSlots} spots
                                                        {isFull && <span className="text-red-500 font-semibold ml-1">(Full)</span>}
                                                        {isJoined && <span className="text-teal-600 font-semibold ml-1">(Joined)</span>}
                                                    </span>
                                                    <span className="text-gray-400">by {item.posterName}</span>
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
