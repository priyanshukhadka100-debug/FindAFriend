export default function FloorSearchBar({ searchQuery, setSearchQuery, selectedFloor, filteredRooms }) {
  return (
    <div className="mb-5 animate-slideIn">
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          <i className="fas fa-search text-xs"></i>
        </span>
        <input
          type="text"
          placeholder={selectedFloor === 'All' ? 'Search all floors for room, lab, cafeteria...' : `Search rooms or facilities on ${selectedFloor} floor...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-9 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-forest-teal focus:border-transparent transition bg-white shadow-xs text-xs md:text-sm font-normal"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <i className="fas fa-times text-xs"></i>
          </button>
        )}
      </div>
      {selectedFloor === 'All' && searchQuery && (
        <div className="mt-1.5 text-xs text-gray-500 pl-1 font-normal">
          Found {filteredRooms.length} result{filteredRooms.length !== 1 ? 's' : ''}
          {filteredRooms.length > 0 && ` across ${new Set(filteredRooms.map((r) => r.floor)).size} floor(s)`}
        </div>
      )}
    </div>
  );
}
