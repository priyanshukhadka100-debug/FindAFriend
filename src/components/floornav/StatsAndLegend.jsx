export default function StatsAndLegend({ totalFloors, totalRooms, filteredRooms, selectedFloor, floorIndex }) {
  return (
    <>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 animate-slideIn">
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-gray-100 text-center card-hover">
          <div className="text-xl font-bold text-forest-teal">{totalFloors}</div>
          <div className="text-xs text-gray-500 font-normal mt-0.5">Total Floors</div>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-gray-100 text-center card-hover">
          <div className="text-xl font-bold text-forest-teal">{totalRooms}</div>
          <div className="text-xs text-gray-500 font-normal mt-0.5">Total Facilities</div>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-gray-100 text-center card-hover">
          <div className="text-xl font-bold text-forest-teal">{filteredRooms.length}</div>
          <div className="text-xs text-gray-500 font-normal mt-0.5">{selectedFloor === 'All' ? 'Matching Results' : 'Floor Facilities'}</div>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-xs border border-gray-100 text-center card-hover">
          <div className="text-xl font-bold text-forest-teal">{selectedFloor === 'All' ? '🌟' : floorIndex}</div>
          <div className="text-xs text-gray-500 font-normal mt-0.5">{selectedFloor === 'All' ? 'All Selected' : 'Floor Index'}</div>
        </div>
      </div>

      <div className="mt-5 bg-white rounded-xl p-3.5 border border-gray-100 animate-slideIn">
        <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Category Legend</h4>
        <div className="flex flex-wrap gap-3">
          <span className="flex items-center gap-1.5 text-xs font-normal text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-facility-sport"></span> Classroom/Sports</span>
          <span className="flex items-center gap-1.5 text-xs font-normal text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-facility-food"></span> Cafeteria/Food</span>
          <span className="flex items-center gap-1.5 text-xs font-normal text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-facility-office"></span> Administration/Office</span>
          <span className="flex items-center gap-1.5 text-xs font-normal text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-facility-lab"></span> Laboratory</span>
          <span className="flex items-center gap-1.5 text-xs font-normal text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-facility-parking"></span> Parking</span>
          <span className="flex items-center gap-1.5 text-xs font-normal text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-facility-library"></span> Library</span>
          <span className="flex items-center gap-1.5 text-xs font-normal text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-facility-lecture"></span> Lecture Hall</span>
        </div>
      </div>
    </>
  );
}
