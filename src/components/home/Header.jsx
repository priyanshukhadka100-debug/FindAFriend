import { addRipple } from '../../utils/ripple';

export default function Header({ isLoggedIn, user, scrolled, mobileMenuOpen, setMobileMenuOpen, onLogoutClick }) {
  return (
    <header className={`bg-forest-teal text-white px-6 py-4 shadow-lg relative top-0 z-50 transition-all duration-300 ${scrolled ? 'header-shrink' : ''}`}>
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#0D5C53]/40"></div>
      <div className="hero-pattern absolute inset-0 opacity-40"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between gap-4">
          <a href="index.html" className="slide-in flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-xs" style={{ background: 'transparent' }}>
              <img src="https://ing.edu.np/images/footer/logo-new.svg" alt="ING College" className="h-10 md:h-12 w-auto" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-2xl font-bold tracking-tight leading-tight">Find a Friend</h1>
              <p className="text-blue-200 text-xs font-normal">ING College · Connect &amp; Collaborate</p>
            </div>
          </a>

          <div className="hidden md:flex flex-wrap gap-3">
            {!isLoggedIn ? (
              <>
                <a href="student-login.html" onMouseDown={addRipple} className="ripple-btn btn-gold px-5 py-2 rounded-full font-semibold text-xs md:text-sm shadow-xs transition-all duration-300 flex items-center gap-2 text-forest-teal">
                  <i className="fas fa-user-graduate text-xs"></i> Student Login
                </a>
                <a href="admin-login.html" onMouseDown={addRipple} className="ripple-btn bg-white/15 backdrop-blur-sm border border-white/25 px-5 py-2 rounded-full font-medium text-xs md:text-sm hover:bg-white/25 transition flex items-center gap-2 text-white">
                  <i className="fas fa-user-shield text-xs"></i> Admin Login
                </a>
              </>
            ) : (
              <div className="glass-effect px-4 py-2 rounded-full flex items-center gap-3 text-xs md:text-sm">
                <span className="text-white font-medium">👋 {user?.name}</span>
                <a href="student-dashboard.html" className="text-white border border-white/30 px-3 py-1 rounded-full text-xs hover:bg-white/10 transition">Dashboard</a>
                <button onClick={onLogoutClick} className="text-white/70 hover:text-white transition">Logout</button>
              </div>
            )}
          </div>

          <button className="md:hidden text-white text-xl" onClick={() => setMobileMenuOpen((o) => !o)} aria-label="Toggle menu">
            <i className={`fas ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>

        <div className={`mobile-menu md:hidden relative z-10 ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="pt-3 flex flex-col gap-2">
            {!isLoggedIn ? (
              <>
                <a href="student-login.html" className="btn-gold px-5 py-2 rounded-full font-semibold text-center text-xs text-forest-teal">Student Login</a>
                <a href="admin-login.html" className="bg-white/15 border border-white/25 px-5 py-2 rounded-full font-medium text-center text-xs text-white">Admin Login</a>
              </>
            ) : (
              <div className="glass-effect px-4 py-2.5 rounded-2xl flex items-center justify-between text-xs">
                <span className="text-white font-medium">👋 {user?.name}</span>
                <div className="flex items-center gap-2">
                  <a href="student-dashboard.html" className="text-white border border-white/30 px-3 py-1 rounded-full">Dashboard</a>
                  <button onClick={onLogoutClick} className="text-white/70">Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
