import { useState, useEffect, useMemo } from 'react';
import { FLOOR_DATA_RAW, FLOOR_ORDER, getAllRooms } from '../data/floorNavData';
import useToasts from '../hooks/useToasts';
import Toasts from '../components/shared/Toasts';
import FloorNavHeader from '../components/floornav/FloorNavHeader';
import FloorSelector from '../components/floornav/FloorSelector';
import FloorBanner from '../components/floornav/FloorBanner';
import FloorSearchBar from '../components/floornav/FloorSearchBar';
import FloorMedia from '../components/floornav/FloorMedia';
import RoomDirectory from '../components/floornav/RoomDirectory';
import StatsAndLegend from '../components/floornav/StatsAndLegend';

const ICON_BG_MAP = {
  Classroom: 'bg-facility-sport',
  Sports: 'bg-facility-sport',
  Food: 'bg-facility-food',
  Office: 'bg-facility-office',
  Lab: 'bg-facility-lab',
  Parking: 'bg-facility-parking',
  Library: 'bg-facility-library',
  Lecture: 'bg-facility-lecture',
  Medical: 'bg-facility-medical',
};
const getIconBg = (type) => ICON_BG_MAP[type] || 'bg-facility-office';

export default function FloorNavigation() {
  const [selectedFloor, setSelectedFloor] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { toasts, pushToast } = useToasts();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && FLOOR_ORDER.includes(hash)) {
        setSelectedFloor(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    const onScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const getCurrentFloorData = () => {
    if (selectedFloor === 'All') {
      return { label: '🏛️ All Floors', theme: 'Complete Campus Directory', rooms: getAllRooms() };
    }
    return FLOOR_DATA_RAW[selectedFloor] || { label: selectedFloor, theme: '', rooms: [] };
  };

  const currentFloorData = getCurrentFloorData();
  const currentRooms = currentFloorData.rooms || [];
  const floorIndex = FLOOR_ORDER.indexOf(selectedFloor);

  const filteredRooms = useMemo(() => {
    if (!searchQuery.trim()) return currentRooms;
    const q = searchQuery.toLowerCase();
    return currentRooms.filter(
      (r) => r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || (r.floor && r.floor.toLowerCase().includes(q))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRooms, searchQuery]);

  const goToFloor = (floor) => {
    if (FLOOR_ORDER.includes(floor)) {
      setSelectedFloor(floor);
      setSearchQuery('');
      window.location.hash = floor === 'All' ? '' : floor;
    }
  };

  const nextFloor = () => {
    if (floorIndex < FLOOR_ORDER.length - 1) goToFloor(FLOOR_ORDER[floorIndex + 1]);
  };
  const prevFloor = () => {
    if (floorIndex > 0) goToFloor(FLOOR_ORDER[floorIndex - 1]);
  };

  const totalRooms = Object.values(FLOOR_DATA_RAW).reduce((acc, f) => acc + (f.rooms?.length || 0), 0);
  const totalFloors = Object.keys(FLOOR_DATA_RAW).length;

  return (
    <div className="min-h-screen bg-light-mint">
      <Toasts toasts={toasts} />
      <FloorNavHeader totalFloors={totalFloors} />

      <div className="max-w-7xl mx-auto px-4 py-5">
        <FloorSelector
          selectedFloor={selectedFloor}
          currentFloorData={currentFloorData}
          currentRooms={currentRooms}
          floorIndex={floorIndex}
          goToFloor={goToFloor}
          prevFloor={prevFloor}
          nextFloor={nextFloor}
        />

        <FloorBanner
          selectedFloor={selectedFloor}
          currentFloorData={currentFloorData}
          totalFloors={totalFloors}
          filteredRooms={filteredRooms}
          currentRooms={currentRooms}
          searchQuery={searchQuery}
        />

        <FloorSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedFloor={selectedFloor} filteredRooms={filteredRooms} />

        {selectedFloor !== 'All' && (
          <FloorMedia
            floor={selectedFloor}
            onLocked={() => pushToast('360° Tour coming soon', `We're preparing the panorama for ${selectedFloor}. Floor plan is available now.`, 'fa-street-view')}
          />
        )}

        <div className="animate-fadeUp">
          <RoomDirectory filteredRooms={filteredRooms} searchQuery={searchQuery} selectedFloor={selectedFloor} getIconBg={getIconBg} />
        </div>

        <StatsAndLegend totalFloors={totalFloors} totalRooms={totalRooms} filteredRooms={filteredRooms} selectedFloor={selectedFloor} floorIndex={floorIndex} />
      </div>

      {showTopBtn && (
        <div className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Back to Top">
          <i className="fas fa-arrow-up text-xs"></i>
        </div>
      )}

      <div className="footer-cta mt-10">
        <div className="art-animation">
          <img src="https://ing.edu.np/images/art-animation.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <p className="text-xs text-blue-200/80 font-normal">© 2026 ING College of Innovation and Leadership. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
