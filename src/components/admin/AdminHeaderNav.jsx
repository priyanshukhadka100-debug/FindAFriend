export default function AdminHeaderNav({ adminUser, setShowLogoutConfirm, currentPage, setCurrentPage }) {
  return (
    <>
      <header className="bg-forest-teal text-white border-b border-white/10 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center">
              <img src="https://ing.edu.np/images/footer/logo-new.svg" alt="ING" className="h-10 w-auto" />
            </div>
            <span className="text-base md:text-lg font-bold tracking-tight hidden sm:block">👔 Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3.5">
            <span className="text-xs text-blue-200 font-medium hidden md:inline">👤 {adminUser?.name || 'Admin'}</span>
            <button onClick={() => setShowLogoutConfirm(true)} className="text-xs text-white/60 hover:text-white transition" title="Logout">
              <i className="fas fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200 sticky top-15 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap gap-2">
          <button onClick={() => setCurrentPage('dashboard')} className={`nav-link px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition ${currentPage === 'dashboard' ? 'active text-forest-teal bg-teal-50' : 'text-gray-600 hover:bg-gray-50'}`}>
            <i className="fas fa-home mr-1.5 text-xs"></i> Dashboard
          </button>
          <button onClick={() => setCurrentPage('activities')} className={`nav-link px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition ${currentPage === 'activities' ? 'active text-forest-teal bg-teal-50' : 'text-gray-600 hover:bg-gray-50'}`}>
            <i className="fas fa-calendar-alt mr-1.5 text-xs"></i> Activities
          </button>
          <button onClick={() => setCurrentPage('students')} className={`nav-link px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition ${currentPage === 'students' ? 'active text-forest-teal bg-teal-50' : 'text-gray-600 hover:bg-gray-50'}`}>
            <i className="fas fa-users mr-1.5 text-xs"></i> Students
          </button>
          <button onClick={() => setCurrentPage('profile')} className={`nav-link px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition ${currentPage === 'profile' ? 'active text-forest-teal bg-teal-50' : 'text-gray-600 hover:bg-gray-50'}`}>
            <i className="fas fa-user mr-1.5 text-xs"></i> Profile
          </button>
          <a href="index.html" className="nav-link px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
            <i className="fas fa-globe mr-1.5 text-xs"></i> Home Page
          </a>
        </div>
      </nav>
    </>
  );
}
