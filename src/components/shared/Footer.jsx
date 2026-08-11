import { addRipple } from '../../utils/ripple';

export default function Footer({ isLoggedIn, onLogoutClick }) {
  return (
    <div className="footer-cta mt-10">
      <div className="art-animation">
        <img src="https://ing.edu.np/images/art-animation.png" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">ING College of Innovation &amp; Leadership</h2>
        <p className="text-blue-100 text-xs md:text-sm mb-5 font-normal">New Baneshwor, Kathmandu | +977 9715000120 | info@ing.edu.np</p>
        {!isLoggedIn ? (
          <div className="flex flex-wrap justify-center gap-3">
            <a href="student-login.html" onMouseDown={addRipple} className="ripple-btn btn-gold px-6 py-2 rounded-full font-semibold transition-all duration-300 text-forest-teal text-xs">Student Login</a>
            <a href="admin-login.html" onMouseDown={addRipple} className="ripple-btn bg-white/15 backdrop-blur-sm border border-white/25 px-6 py-2 rounded-full font-normal hover:bg-white/25 transition text-white text-xs">Admin Login</a>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-3">
            <a href="student-dashboard.html" className="bg-white/15 backdrop-blur-sm border border-white/25 px-6 py-2 rounded-full font-normal hover:bg-white/25 transition text-white text-xs">Dashboard</a>
            <button onClick={onLogoutClick} className="bg-white/15 backdrop-blur-sm border border-white/25 px-6 py-2 rounded-full font-normal hover:bg-white/25 transition text-white text-xs">
              Logout
            </button>
          </div>
        )}
        <div className="mt-6 text-[11px] text-blue-200/80 font-normal">
          © 2026 ING College of Innovation and Leadership. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
