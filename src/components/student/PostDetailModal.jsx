import { formatTimeDisplay, parseEventDateTime } from '../../utils/scheduleHelpers';

export default function PostDetailModal({ show, post, myId, onClose, onJoinChat, joinPost, cancelJoinPost }) {
  if (!show || !post) return null;
  return (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
                            <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 shadow-xl" onClick={e => e.stopPropagation()}>
                                <div className="flex items-start justify-between mb-3.5">
                                    <div>
                                        <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md ${post.category === 'sport' ? 'tag-sport' : post.category === 'project' ? 'tag-project' : 'tag-hangout'}`}>{post.category}</span>
                                        <h3 className="text-lg font-bold text-gray-800 mt-1">{post.title}</h3>
                                    </div>
                                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                                </div>
                                <div className="space-y-3.5">
                                    <div className="flex flex-wrap gap-3 text-xs text-gray-600 bg-gray-50/80 p-3 rounded-xl border border-gray-100 font-normal">
                                        <span><i className="fas fa-calendar text-electric-gold mr-1.5"></i>{post.date}</span>
                                        <span><i className="fas fa-clock text-electric-gold mr-1.5"></i>{formatTimeDisplay(post.startTime)} - {formatTimeDisplay(post.endTime)}</span>
                                        <span><i className="fas fa-map-marker-alt text-electric-gold mr-1.5"></i>{post.location}</span>
                                    </div>
                                    {post.description && (
                                        <div className="bg-teal-50/40 p-3.5 rounded-xl border border-teal-100/80 text-xs md:text-sm text-gray-700 leading-relaxed font-normal">
                                            {post.description}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-semibold text-gray-600">👥 {post.joined ? post.joined.length : 0}/{post.spots || 4} spots filled</span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-3">
                                        <h4 className="font-semibold text-xs text-gray-700 mb-2 uppercase">Joined Participants</h4>
                                        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                                            {post.joined && post.joined.length > 0 ? (
                                                post.joined.map(j => {
                                                    const isCurrentUser = j.id === myId;
                                                    return (
                                                        <div key={j.id} className="flex items-center justify-between bg-gray-50/80 p-2 rounded-lg border border-gray-100 text-xs">
                                                            <span className="font-medium text-gray-800">{j.name} {isCurrentUser && <span className="text-[10px] bg-teal-100 text-forest-teal px-1.5 py-0.5 rounded ml-1 font-semibold">You</span>}</span>
                                                            {!isCurrentUser && (
                                                                <button onClick={() => onJoinChat(j.id, j.name)} className="btn-forest text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                                                                    💬 DM
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="text-xs text-gray-400 text-center py-2 font-normal">No participants yet</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2.5 pt-1 flex-wrap">
                                        {(!post.joined || !post.joined.some(j => j.id === myId)) && 
                                            (post.joined ? post.joined.length : 0) < (post.spots || 4) &&
                                            parseEventDateTime(post.date, post.startTime) >= new Date() && (
                                                <button 
                                                    onClick={() => { 
                                                        joinPost(post.id); 
                                                        onClose();
                                                    }} 
                                                    className="btn-forest flex-1 py-2.5 rounded-xl font-semibold text-xs"
                                                >
                                                    ✅ Join Activity
                                                </button>
                                            )}
                                        {post.joined && post.joined.some(j => j.id === myId) && 
                                            parseEventDateTime(post.date, post.startTime) >= new Date() && (
                                                <button onClick={() => { cancelJoinPost(post.id); onClose(); }} className="btn-danger flex-1 py-2.5 rounded-xl font-semibold text-xs">
                                                    ❌ Leave Activity
                                                </button>
                                            )}
                                        <button onClick={onClose} className="flex-1 border border-gray-200 py-2.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
  );
}
