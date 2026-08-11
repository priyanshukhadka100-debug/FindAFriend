import { useState, useEffect, useRef } from 'react';
import { FLOOR_PLANS, PANORAMA_360 } from '../../data/floorNavData';

export default function FloorMedia({ floor, onLocked }) {
  const [tab, setTab] = useState('plan');
  const [imgLoaded, setImgLoaded] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const panoramaRef = useRef(null);

  const plan = FLOOR_PLANS[floor];
  const panoramaUrl = PANORAMA_360[floor];

  useEffect(() => {
    setTab('plan');
    setImgLoaded(false);
  }, [floor]);

  useEffect(() => {
    if (tab === '360' && panoramaUrl && panoramaRef.current) {
      // eslint-disable-next-line no-undef
      const viewer = pannellum.viewer(panoramaRef.current, {
        type: 'equirectangular',
        panorama: panoramaUrl,
        autoLoad: true,
        compass: false,
      });
      return () => viewer.destroy();
    }
  }, [tab, panoramaUrl]);

  return (
    <div className="my-5 animate-fadeUp">
      <div className="flex items-center gap-2 mb-3">
        <button className={`media-tab ${tab === 'plan' ? 'active' : 'inactive'}`} onClick={() => setTab('plan')}>
          <i className="fas fa-drafting-compass mr-1.5"></i>Floor Plan
        </button>
        <button
          className={`media-tab ${panoramaUrl ? (tab === '360' ? 'active' : 'inactive') : 'locked'}`}
          onClick={() => {
            if (panoramaUrl) setTab('360');
            else onLocked && onLocked();
          }}
        >
          <i className="fas fa-street-view mr-1.5"></i>360° Tour
          {!panoramaUrl && <span className="soon-pill">SOON</span>}
        </button>
      </div>

      {tab === 'plan' && plan && (
        <div className="plan-frame group">
          {!imgLoaded && <div className="plan-skeleton w-full" style={{ height: 400 }}></div>}
          <img
            src={plan.url}
            alt={`${floor} floor plan`}
            onLoad={() => setImgLoaded(true)}
            onClick={() => setLightbox(true)}
            className={`w-full max-h-[80vh] object-contain cursor-zoom-in ${imgLoaded ? '' : 'hidden'}`}
          />
        </div>
      )}

      {tab === 'plan' && !plan && (
        <div className="no-media-box">
          <i className="fas fa-drafting-compass text-3xl text-gray-300 mb-2 animate-pulse"></i>
          <h4 className="font-semibold text-gray-700 text-sm">Floor plan map coming soon</h4>
          <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto font-normal">
            We are preparing the architectural diagram for floor {floor}. The room directory below is updated &amp; accurate.
          </p>
        </div>
      )}

      {tab === 'plan' && plan && imgLoaded && (
        <p className="text-xs text-gray-500 mt-2 text-center flex items-center justify-center gap-2 font-normal">
          <span>{plan.caption}</span>
          <span className="text-gray-300">•</span>
          <button className="text-forest-teal font-medium hover:underline flex items-center gap-1" onClick={() => setLightbox(true)}>
            Zoom Map <i className="fas fa-magnifying-glass-plus text-[10px]"></i>
          </button>
        </p>
      )}

      {tab === '360' && panoramaUrl && <div ref={panoramaRef} className="panorama-shell"></div>}

      {lightbox && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(false)}>
          <span className="lightbox-close" onClick={() => setLightbox(false)}>
            <i className="fas fa-xmark"></i>
          </span>
          <img src={plan.url} alt={`${floor} floor plan enlarged`} className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
