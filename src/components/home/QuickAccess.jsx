import Reveal from '../shared/Reveal';

export default function QuickAccess() {
  return (
                        <Reveal delay={100} className="mb-6">
                            <h2 className="text-xl font-bold text-forest-teal mb-4 flex items-center gap-2">
                                <i className="fas fa-bolt text-electric-gold"></i> Quick Navigation
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                                <a href="floornavigation.html" className="bg-white rounded-2xl p-5 text-center shadow-xs border border-gray-100 card-hover group">
                                    <div className="text-3xl mb-2 transform group-hover:scale-110 transition">🏛️</div>
                                    <span className="text-xs md:text-sm font-semibold text-gray-800 block">Floor Navigation</span>
                                    <span className="text-[11px] text-gray-400 mt-0.5 block font-normal">Interactive 13-Floor Map</span>
                                </a>
                                <a href="student-login.html" className="bg-white rounded-2xl p-5 text-center shadow-xs border border-gray-100 card-hover group">
                                    <div className="text-3xl mb-2 transform group-hover:scale-110 transition">🎓</div>
                                    <span className="text-xs md:text-sm font-semibold text-gray-800 block">Student Portal</span>
                                    <span className="text-[11px] text-gray-400 mt-0.5 block font-normal">Log in to view events</span>
                                </a>
                                <a href="admin-login.html" className="bg-white rounded-2xl p-5 text-center shadow-xs border border-gray-100 card-hover group">
                                    <div className="text-3xl mb-2 transform group-hover:scale-110 transition">👔</div>
                                    <span className="text-xs md:text-sm font-semibold text-gray-800 block">Admin Portal</span>
                                    <span className="text-[11px] text-gray-400 mt-0.5 block font-normal">Manage Campus Data</span>
                                </a>
                                <a href="student-dashboard.html" className="bg-white rounded-2xl p-5 text-center shadow-xs border border-gray-100 card-hover group">
                                    <div className="text-3xl mb-2 transform group-hover:scale-110 transition">📊</div>
                                    <span className="text-xs md:text-sm font-semibold text-gray-800 block">Dashboard</span>
                                    <span className="text-[11px] text-gray-400 mt-0.5 block font-normal">Activities &amp; Messages</span>
                                </a>
                            </div>
                        </Reveal>
  );
}
