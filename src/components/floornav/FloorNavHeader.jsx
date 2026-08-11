export default function FloorNavHeader({ totalFloors }) {
  return (
    <header className="bg-forest-teal text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center">
            <img src="https://ing.edu.np/images/footer/logo-new.svg" alt="ING" className="h-10 w-auto" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold tracking-tight">🏛️ Floor Navigation</h1>
            <p className="text-[11px] text-blue-200 font-light">ING College · {totalFloors} Floors Mapped</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <a href="index.html" className="text-xs text-white/80 hover:text-white px-3 py-1.5 border border-white/20 rounded-full transition hover:bg-white/10 flex items-center gap-1">
            <i className="fas fa-home"></i> <span className="hidden sm:inline">Home</span>
          </a>
          <a href="student-dashboard.html" className="text-xs text-white/80 hover:text-white px-3 py-1.5 border border-white/20 rounded-full transition hover:bg-white/10 flex items-center gap-1">
            <i className="fas fa-arrow-left"></i> <span className="hidden sm:inline">Dashboard</span>
          </a>
        </div>
      </div>
    </header>
  );
}
