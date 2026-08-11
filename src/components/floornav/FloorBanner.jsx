export default function FloorBanner({ selectedFloor, currentFloorData, totalFloors, filteredRooms, currentRooms, searchQuery }) {
  return (
    <div className="bg-white rounded-2xl shadow-xs p-5 border border-gray-100 mb-5 animate-fadeUp">
      <div className="flex items-center gap-3.5 mb-1.5">
        <div className="w-11 h-11 md:w-12 md:h-12 bg-electric-gold rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-xs text-forest-teal shrink-0">
          {selectedFloor === 'All'
            ? '🏛️'
            : selectedFloor === 'Ground'
            ? '🏢'
            : selectedFloor === 'B2' || selectedFloor === 'B1'
            ? '🚗'
            : selectedFloor === '10th'
            ? '🌅'
            : '📚'}
        </div>
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 tracking-tight">{currentFloorData.label}</h2>
          {currentFloorData.theme && <p className="text-xs text-forest-teal font-medium mt-0.5">{currentFloorData.theme}</p>}
          {selectedFloor === 'All' && (
            <p className="text-xs text-gray-400 font-normal">Viewing comprehensive index across all {totalFloors} campus levels</p>
          )}
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2.5 pt-2.5 border-t border-gray-100 flex items-center gap-2 font-normal">
        <i className="fas fa-door-open text-electric-gold text-xs"></i>
        <span>{filteredRooms.length} room/facility items listed</span>
        {searchQuery && filteredRooms.length !== currentRooms.length && (
          <span className="text-xs text-forest-teal font-medium">(filtered from {currentRooms.length})</span>
        )}
      </div>
    </div>
  );
}
