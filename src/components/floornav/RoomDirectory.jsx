export default function RoomDirectory({ filteredRooms, searchQuery, selectedFloor, getIconBg }) {
  if (filteredRooms.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-xs">
        <span className="text-4xl block mb-2">🔍</span>
        <h3 className="text-base font-semibold text-gray-700">No facilities found</h3>
        <p className="text-xs text-gray-400 mt-1 font-normal">
          {searchQuery ? 'Try adjusting your search criteria' : 'No rooms listed for this floor yet'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
      {filteredRooms.map((room, index) => (
        <div
          key={room.id}
          className="bg-white rounded-xl p-3.5 border border-gray-100 room-card card-hover shadow-xs animate-fadeUp"
          style={{ animationDelay: `${Math.min(index * 30, 350)}ms` }}
        >
          <div className="flex items-start gap-3">
            <div className={`facility-icon ${getIconBg(room.type)}`}>
              <i className={`fas ${room.icon || 'fa-building'}`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-800 text-xs md:text-sm truncate">{room.name}</h4>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 font-medium text-gray-600">{room.type}</span>
                {selectedFloor === 'All' && room.floor && (
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-teal-50 text-forest-teal font-semibold">
                    <i className="fas fa-location-dot mr-1 text-electric-gold text-[10px]"></i>
                    {room.floor}
                  </span>
                )}
                {selectedFloor !== 'All' && (
                  <span className="text-[11px] text-gray-400 font-normal">
                    <i className="fas fa-location-dot mr-1 text-[10px]"></i>
                    {selectedFloor}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
