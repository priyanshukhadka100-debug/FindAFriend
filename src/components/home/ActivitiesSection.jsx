import Reveal from '../shared/Reveal';
import { parseEventDateTime } from '../../utils/dateTime';

export default function ActivitiesSection({ isLoggedIn, activitiesLoaded, activities }) {
  return (
                        <Reveal className="mb-10">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-forest-teal flex items-center gap-2">
                                        <i className="fas fa-calendar-check text-electric-gold"></i>
                                        Happening on Campus Right Now
                                    </h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Live activities posted by students &amp; staff</p>
                                </div>
                                {isLoggedIn && (
                                    <a href="student-dashboard.html" className="hidden sm:inline-flex items-center gap-1 text-forest-teal font-medium hover:underline text-xs bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-xs hover:border-forest-teal transition">
                                        View All Activities →
                                    </a>
                                )}
                            </div>

                            {!isLoggedIn ? (
                                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-xs max-w-xl mx-auto">
                                    <div className="w-12 h-12 bg-forest-teal/10 rounded-full flex items-center justify-center text-forest-teal text-xl mx-auto mb-3">
                                        <i className="fas fa-lock text-electric-gold"></i>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Log in to see what's going on in campus</h3>
                                    <p className="text-gray-500 text-xs max-w-md mx-auto mb-5 leading-relaxed">
                                        Sign in with your ING student or admin account to discover live events, sports matches, workshops, and connect with peers.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2.5">
                                        <a href="student-login.html" className="btn-gold px-5 py-2 rounded-full font-semibold text-xs text-forest-teal shadow-xs hover:scale-105 transition">
                                            <i className="fas fa-user-graduate mr-1.5 text-xs"></i> Student Login
                                        </a>
                                        <a href="admin-login.html" className="bg-forest-teal text-white px-5 py-2 rounded-full font-semibold text-xs shadow-xs hover:bg-forest-teal-dark hover:scale-105 transition">
                                            <i className="fas fa-user-shield mr-1.5 text-xs"></i> Admin Login
                                        </a>
                                    </div>
                                </div>
                            ) : !activitiesLoaded ? (
                                <div className="flex gap-4 overflow-hidden">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="w-72 shrink-0 bg-white rounded-2xl p-5 border border-gray-100">
                                            <div className="skeleton h-4 w-16 rounded-full mb-3"></div>
                                            <div className="skeleton h-5 w-40 rounded mb-2"></div>
                                            <div className="skeleton h-4 w-full rounded mb-1"></div>
                                            <div className="skeleton h-4 w-3/4 rounded mb-4"></div>
                                            <div className="skeleton h-9 w-full rounded-full"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : activities.length === 0 ? (
                                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-xs max-w-xl mx-auto">
                                    <i className="fas fa-calendar-plus text-3xl text-gray-300 mb-2 block"></i>
                                    <p className="text-gray-700 font-semibold text-base">No activities posted yet</p>
                                    <p className="text-xs text-gray-500 mt-0.5 mb-4">Be the first to create a campus activity!</p>
                                    <a href="student-dashboard.html" className="inline-block bg-forest-teal text-white px-5 py-2 rounded-full font-semibold text-xs hover:bg-forest-teal-dark transition">
                                        Create Activity in Dashboard →
                                    </a>
                                </div>
                            ) : (
                                <div className="carousel-container flex gap-4 pb-3 overflow-x-auto">
                                    {activities.slice(0, 10).map((item) => {
                                        const eventDate = parseEventDateTime(item.date, item.startTime);
                                        const now = new Date();
                                        const status = eventDate < now ? 'Past' :
                                                      (item.date && new Date(item.date).toDateString() === new Date().toDateString()) ? 'Today' : 'Upcoming';
                                        return (
                                            <div key={item.id || Math.random()} className="carousel-item bg-white rounded-2xl p-4 shadow-xs border border-gray-100 card-hover w-72 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center justify-between mb-2.5">
                                                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${status === 'Past' ? 'bg-gray-200 text-gray-600' : status === 'Today' ? 'status-today font-bold' : 'status-upcoming'}`}>
                                                            {status}
                                                        </span>
                                                        <span className="text-xs text-gray-400 font-normal">{item.date || 'Campus Event'}</span>
                                                    </div>
                                                    <h3 className="font-semibold text-gray-800 text-base line-clamp-1">{item.title}</h3>
                                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed font-normal">{item.description || 'Join fellow ING students for this campus activity.'}</p>
                                                </div>
                                                <div className="mt-3 pt-2.5 border-t border-gray-100">
                                                    <div className="space-y-1 text-xs text-gray-600 mb-3 font-normal">
                                                        <div className="flex items-center gap-1.5"><i className="fas fa-clock text-electric-gold w-3.5 text-center text-[10px]"></i><span>{item.startTime || 'TBA'} - {item.endTime || 'TBA'}</span></div>
                                                        <div className="flex items-center gap-1.5"><i className="fas fa-location-dot text-electric-gold w-3.5 text-center text-[10px]"></i><span className="truncate">{item.location || 'ING Campus'}</span></div>
                                                        <div className="flex items-center gap-1.5"><i className="fas fa-user text-electric-gold w-3.5 text-center text-[10px]"></i><span className="truncate">by {item.posterName || 'Student'}</span></div>
                                                    </div>
                                                    <a href="student-dashboard.html" className="block w-full bg-forest-teal text-white py-1.5 rounded-xl font-medium transition-all duration-200 text-xs text-center hover:bg-[#0a4a42]">
                                                        View Activity
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </Reveal>
  );
}
