import Reveal from '../shared/Reveal';
import CountUp from '../shared/CountUp';

export default function Hero({
  searchRef,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleSearchKeyDown,
  showResults,
  setShowResults,
  searchResults,
  setSearchResults,
  activeIndex,
  setActiveIndex,
  handleResultClick,
  recentSearches,
  clearRecentSearches,
  popularSearches,
  totalFloors,
  totalFacilities,
  totalClassrooms,
  totalLabs,
}) {
  return (
                    <div className="relative bg-forest-teal pt-10 pb-16 md:py-20">
                        <div className="hero-blobs">
                            <div className="blob blob-1"></div>
                            <div className="blob blob-2"></div>
                            <div className="blob blob-3"></div>
                        </div>
                        <div className="hero-pattern absolute inset-0 opacity-40"></div>
                        
                        <div className="max-w-6xl mx-auto px-4 relative text-center">
                            <Reveal>
                                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs px-3.5 py-1 rounded-full mb-5 font-normal">
                                    <span className="live-pulse w-2 h-2 rounded-full bg-electric-gold"></span>
                                    Live campus companion — built by students, for students
                                </span>
                            </Reveal>
                            <Reveal delay={80}>
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
                                    Never get lost on campus.<br className="hidden md:block" /> Never miss what's happening.
                                </h2>
                            </Reveal>
                            <Reveal delay={160}>
                                <p className="text-blue-100/90 text-sm md:text-base max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
                                    Search any classroom, lab or office across all 13 floors, see live activities happening right now, and connect with fellow students.
                                </p>
                            </Reveal>

                            {/* SEARCH BAR CONTAINER */}
                            <Reveal delay={220} style={{ position: 'relative', zIndex: 60 }}>
                                <div className="max-w-2xl mx-auto relative">
                                    <div className="relative z-50">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <i className="fas fa-search text-base"></i>
                                        </span>
                                        <input
                                            ref={searchRef}
                                            type="text"
                                            placeholder="Search for a classroom, room, floor, or campus facility…"
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                                handleSearch(e.target.value);
                                            }}
                                            onKeyDown={handleSearchKeyDown}
                                            onFocus={() => { if(searchQuery) setShowResults(true); }}
                                            className="search-input w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-white/40 focus:border-electric-gold text-gray-800 text-sm md:text-base shadow-[0_12px_30px_-5px_rgba(0,0,0,0.25)] transition-all"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setSearchResults([]);
                                                    setShowResults(false);
                                                }}
                                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
                                            >
                                                <i className="fas fa-times text-xs"></i>
                                            </button>
                                        )}
                                    </div>

                                    {/* SEARCH RESULTS DROPDOWN */}
                                    {showResults && searchQuery && (
                                        <div className="absolute top-full left-0 right-0 mt-2.5 bg-white rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] border border-gray-100 max-h-80 overflow-y-auto z-100 text-left opacity-100 min-w-full">
                                            {searchResults.length === 0 ? (
                                                <div className="p-6 text-center text-gray-500">
                                                    <i className="fas fa-search text-2xl block text-gray-300 mb-1.5"></i>
                                                    <p className="font-medium text-xs text-gray-700">No facilities found for "{searchQuery}"</p>
                                                </div>
                                            ) : (
                                                <div className="p-2 space-y-1">
                                                    <div className="px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-gray-400 border-b border-gray-100">
                                                        Found {searchResults.length} Match{searchResults.length > 1 ? 'es' : ''}
                                                    </div>
                                                    {searchResults.map((result, index) => (
                                                        <div
                                                            key={index}
                                                            className={`search-result-card p-2.5 rounded-xl border border-transparent flex items-center gap-3 ${index === activeIndex ? 'kbd-active' : ''}`}
                                                            onClick={() => handleResultClick(result)}
                                                            onMouseEnter={() => setActiveIndex(index)}
                                                        >
                                                            <div className="w-8 h-8 rounded-lg bg-forest-teal/10 flex items-center justify-center text-forest-teal text-xs font-semibold shrink-0">
                                                                <i className={`fas ${result.icon || 'fa-building'}`}></i>
                                                            </div>
                                                            <div className="flex-1 text-left min-w-0">
                                                                <div className="font-semibold text-gray-800 text-xs md:text-sm truncate">{result.name}</div>
                                                                <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5 font-normal">
                                                                    <span className="font-medium text-forest-teal bg-teal-50 px-1.5 py-0.5 rounded text-[10px]">{result.floor} Floor</span>
                                                                    <span>•</span>
                                                                    <span>{result.type}</span>
                                                                </div>
                                                            </div>
                                                            <i className="fas fa-arrow-right text-gray-300 text-xs"></i>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* RECENT SEARCHES */}
                                    {recentSearches.length > 0 && !searchQuery && (
                                        <div className="mt-3 text-left">
                                            <div className="flex items-center justify-between mb-1.5 px-1">
                                                <span className="text-[11px] font-medium uppercase tracking-wider text-blue-200">Recent Searches</span>
                                                <button onClick={clearRecentSearches} className="text-[11px] text-blue-300 hover:text-white transition">Clear All</button>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {recentSearches.map((search, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => { setSearchQuery(search); handleSearch(search); }}
                                                        className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs text-white transition flex items-center gap-1"
                                                    >
                                                        <i className="fas fa-history text-electric-gold text-[10px]"></i> {search}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* POPULAR SEARCH SUGGESTIONS */}
                                    {recentSearches.length === 0 && !searchQuery && (
                                        <div className="mt-3 flex flex-wrap justify-center items-center gap-1.5">
                                            <span className="text-xs text-blue-200 font-normal mr-1">Popular:</span>
                                            {popularSearches.map((s, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => { setSearchQuery(s); handleSearch(s); }}
                                                    className="px-2.5 py-0.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full text-xs text-blue-100 transition font-normal"
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Reveal>

                            {/* LIVE STAT COUNTERS */}
                            <Reveal delay={280} style={{ position: 'relative', zIndex: 10 }}>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mt-10 md:mt-14">
                                    <div className="stat-card py-3 px-3">
                                        <div className="text-xl md:text-2xl font-bold text-electric-gold"><CountUp end={totalFloors} /></div>
                                        <div className="text-xs text-blue-100/90 font-normal mt-0.5">Floors Mapped</div>
                                    </div>
                                    <div className="stat-card py-3 px-3">
                                        <div className="text-xl md:text-2xl font-bold text-electric-gold"><CountUp end={totalFacilities} /></div>
                                        <div className="text-xs text-blue-100/90 font-normal mt-0.5">Total Facilities</div>
                                    </div>
                                    <div className="stat-card py-3 px-3">
                                        <div className="text-xl md:text-2xl font-bold text-electric-gold"><CountUp end={totalClassrooms} /></div>
                                        <div className="text-xs text-blue-100/90 font-normal mt-0.5">Classrooms</div>
                                    </div>
                                    <div className="stat-card py-3 px-3">
                                        <div className="text-xl md:text-2xl font-bold text-electric-gold"><CountUp end={totalLabs} /></div>
                                        <div className="text-xs text-blue-100/90 font-normal mt-0.5">Labs &amp; Offices</div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
  );
}
