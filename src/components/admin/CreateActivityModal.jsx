import { CATEGORY_LOCATIONS, CAMPUS_HOURS } from '../../utils/scheduleHelpers';

export default function CreateActivityModal({
  show,
  onClose,
  newActivity,
  setNewActivity,
  handleCategoryChange,
  handleStartHourChange,
  handleEndHourChange,
  formError,
  handleCreateActivity,
}) {
  if (!show) return null;
  return (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => onClose()}>
                            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 md:p-6 shadow-xl create-activity-modal" onClick={e => e.stopPropagation()}>
                                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                                    <h3 className="text-lg font-bold text-gray-800">📝 Create Activity</h3>
                                    <button onClick={() => onClose()} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Category</label>
                                        <div className="flex gap-2">
                                            {['sport', 'project', 'hangout'].map(cat => (
                                                <button key={cat} onClick={() => handleCategoryChange(cat)}
                                                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${newActivity.category === cat ? 'bg-forest-teal text-white font-semibold shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Title *</label>
                                        <input type="text" value={newActivity.title} onChange={e => setNewActivity({...newActivity, title: e.target.value})}
                                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition text-xs md:text-sm font-normal" placeholder="e.g. Official Futsal Tournament" />
                                    </div>

                                    <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-200/80 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-[11px] font-semibold text-forest-teal uppercase tracking-wider">
                                                <i className="fas fa-location-dot text-electric-gold mr-1"></i> Campus Location *
                                            </label>
                                            <span className="text-[10px] text-gray-400 font-normal">Pre-filtered for {newActivity.category}</span>
                                        </div>
                                        <select 
                                            value={newActivity.location} 
                                            onChange={e => setNewActivity({...newActivity, location: e.target.value})}
                                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition text-xs md:text-sm bg-white font-normal text-gray-800"
                                        >
                                            {(CATEGORY_LOCATIONS[newActivity.category] || CATEGORY_LOCATIONS.sport).map((locObj, idx) => (
                                                <option key={idx} value={locObj.value}>{locObj.label}</option>
                                            ))}
                                        </select>
                                        {newActivity.location === 'Custom / Other Location...' && (
                                            <input 
                                                type="text" 
                                                value={newActivity.customLocation} 
                                                onChange={e => setNewActivity({...newActivity, customLocation: e.target.value})}
                                                className="w-full mt-2 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition text-xs md:text-sm font-normal bg-white" 
                                                placeholder="Type custom location name..." 
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                                        <textarea value={newActivity.description} onChange={e => setNewActivity({...newActivity, description: e.target.value})}
                                            className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition text-xs md:text-sm font-normal" rows="2" placeholder="Activity details..." />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Date *</label>
                                        <input type="date" value={newActivity.date} onChange={e => setNewActivity({...newActivity, date: e.target.value})}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition text-xs md:text-sm font-normal" />
                                    </div>

                                    <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-200/80 space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-[11px] font-semibold text-forest-teal uppercase tracking-wider">
                                                <i className="fas fa-clock text-electric-gold mr-1"></i> Time (Campus Hours: 7 AM - 6 PM)
                                            </label>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[10px] font-medium text-gray-400 uppercase mb-1">Start Time</label>
                                                <div className="flex gap-1 items-center">
                                                    <select value={newActivity.startHour} onChange={e => handleStartHourChange(e.target.value)} className="time-select flex-1 text-xs bg-white font-medium">
                                                        {CAMPUS_HOURS.map(h => (
                                                            <option key={h.hour} value={h.hour}>{h.display}</option>
                                                        ))}
                                                    </select>
                                                    <select value={newActivity.startMinute} onChange={e => setNewActivity({...newActivity, startMinute: e.target.value})} className="time-select text-xs bg-white">
                                                        {['00','15','30','45'].map(m => (
                                                            <option key={m} value={m}>:{m}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-medium text-gray-400 uppercase mb-1">End Time</label>
                                                <div className="flex gap-1 items-center">
                                                    <select value={newActivity.endHour} onChange={e => handleEndHourChange(e.target.value)} className="time-select flex-1 text-xs bg-white font-medium">
                                                        {CAMPUS_HOURS.map(h => (
                                                            <option key={h.hour} value={h.hour}>{h.display}</option>
                                                        ))}
                                                    </select>
                                                    <select value={newActivity.endMinute} onChange={e => setNewActivity({...newActivity, endMinute: e.target.value})} className="time-select text-xs bg-white">
                                                        {['00','15','30','45'].map(m => (
                                                            <option key={m} value={m}>:{m}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Spots (including poster)</label>
                                        <input type="number" min="2" max="30" value={newActivity.spots} onChange={e => setNewActivity({...newActivity, spots: parseInt(e.target.value) || 4})}
                                            className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition text-xs md:text-sm font-normal" />
                                    </div>

                                    {formError && <div className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-xl px-3 py-1.5 font-normal">{formError}</div>}

                                    <button onClick={handleCreateActivity} className="btn-gold w-full py-2.5 rounded-xl font-semibold text-xs shadow-xs mt-2 text-forest-teal">
                                        Publish Activity
                                    </button>
                                </div>
                            </div>
                        </div>
  );
}
