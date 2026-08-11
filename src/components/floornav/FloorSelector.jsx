import { FLOOR_ORDER } from '../../data/floorNavData';

export default function FloorSelector({ selectedFloor, currentFloorData, currentRooms, floorIndex, goToFloor, prevFloor, nextFloor }) {
  return (
    <div className="bg-white rounded-2xl shadow-xs p-3.5 border border-gray-100 mb-5 animate-slideIn">
      <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">Active Floor:</span>
          <span className="text-xs md:text-sm font-semibold text-forest-teal bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">{currentFloorData.label}</span>
          {selectedFloor === 'All' && (
            <span className="text-[11px] bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full">
              {currentRooms.length} rooms total
            </span>
          )}
        </div>
        <div className="flex gap-1.5">
          <button onClick={prevFloor} className="px-2.5 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-xs font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed" disabled={floorIndex <= 0}>
            <i className="fas fa-chevron-left mr-1 text-[10px]"></i> Prev
          </button>
          <button onClick={nextFloor} className="px-2.5 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-xs font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed" disabled={floorIndex >= FLOOR_ORDER.length - 1}>
            Next <i className="fas fa-chevron-right ml-1 text-[10px]"></i>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pt-1 pb-1">
        {FLOOR_ORDER.map((floor) => (
          <button
            key={floor}
            onClick={() => goToFloor(floor)}
            className={`floor-btn px-3 py-1 rounded-lg text-xs transition-all ${selectedFloor === floor ? 'active' : floor === 'All' ? 'all-btn' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {floor === 'All' ? '🌟 All Floors' : floor}
          </button>
        ))}
      </div>
      <div className="floor-indicator mt-1.5" style={{ width: `${((floorIndex + 1) / FLOOR_ORDER.length) * 100}%` }}></div>
    </div>
  );
}
