import { addRipple } from '../../utils/ripple';

export default function StudentProfileView({
  user,
  imagePreview,
  isEditing,
  setIsEditing,
  setShowChangePassword,
  editForm,
  setEditForm,
  handleImageUpload,
  removeImage,
  updateProfile,
  getAvatarColor,
}) {
  const avatarClass = getAvatarColor(user.name);
  return (
                    <div className="fade-in">
                        <div className="bg-white rounded-2xl shadow-xs p-6 border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                {/* FIX: Perfectly Centered Profile Avatar */}
                                <div className={`profile-avatar ${!imagePreview ? avatarClass : ''} shrink-0 overflow-hidden`}>
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-3xl font-bold uppercase leading-none flex items-center justify-center w-full h-full text-center">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                                    <p className="text-xs md:text-sm text-gray-500 font-normal">{user.email}</p>
                                    <span className="inline-block text-xs bg-teal-50 text-forest-teal font-medium px-2 py-0.5 rounded-md mt-1 border border-teal-100">
                                        ID: {user.studentId || 'N/A'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2 mb-6">
                                <button onClick={() => setIsEditing(!isEditing)} onMouseDown={addRipple} className="ripple-btn btn-forest px-5 py-1.5 rounded-full text-xs font-semibold">
                                    <i className="fas fa-edit mr-1 text-[11px]"></i> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                                </button>
                                <button onClick={() => setShowChangePassword(true)} className="border border-gray-300 px-5 py-1.5 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
                                    <i className="fas fa-key mr-1 text-[11px]"></i> Change Password
                                </button>
                            </div>

                            {isEditing ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                                        <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})}
                                            className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition text-xs md:text-sm font-normal" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase">Phone</label>
                                        <input type="text" value={editForm.phone || ''} onChange={e => setEditForm({...editForm, phone: e.target.value})}
                                            className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition text-xs md:text-sm font-normal" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-semibold text-gray-500 uppercase">Address</label>
                                        <input type="text" value={editForm.address || ''} onChange={e => setEditForm({...editForm, address: e.target.value})}
                                            className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition text-xs md:text-sm font-normal" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase">Course/Program</label>
                                        <input type="text" value={editForm.course || ''} onChange={e => setEditForm({...editForm, course: e.target.value})}
                                            className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition text-xs md:text-sm font-normal" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase">Semester/Year</label>
                                        <input type="text" value={editForm.semester || ''} onChange={e => setEditForm({...editForm, semester: e.target.value})}
                                            className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition text-xs md:text-sm font-normal" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Profile Photo</label>
                                        <div className="flex items-center gap-3">
                                            <div className="file-input-wrapper">
                                                <button className="btn-forest px-3.5 py-1.5 rounded-xl text-xs font-semibold">Upload Photo</button>
                                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                                            </div>
                                            {imagePreview && (
                                                <button onClick={removeImage} className="btn-danger px-3.5 py-1.5 rounded-xl text-xs font-semibold">Remove</button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 flex gap-2.5 pt-2">
                                        <button onClick={updateProfile} className="btn-forest px-5 py-2 rounded-xl font-semibold text-xs">Save Changes</button>
                                        <button onClick={() => setIsEditing(false)} className="border border-gray-300 px-5 py-2 rounded-xl font-medium text-xs text-gray-600 hover:bg-gray-50 transition">Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs md:text-sm">
                                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100"><p className="text-[11px] font-semibold text-gray-400 uppercase">Full Name</p><p className="font-semibold text-gray-800 mt-0.5">{user.name}</p></div>
                                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100"><p className="text-[11px] font-semibold text-gray-400 uppercase">Email Address</p><p className="font-semibold text-gray-800 mt-0.5">{user.email}</p></div>
                                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100"><p className="text-[11px] font-semibold text-gray-400 uppercase">Phone</p><p className="font-semibold text-gray-800 mt-0.5">{user.phone || 'Not set'}</p></div>
                                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100"><p className="text-[11px] font-semibold text-gray-400 uppercase">Student ID</p><p className="font-semibold text-gray-800 mt-0.5">{user.studentId || 'N/A'}</p></div>
                                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 md:col-span-2"><p className="text-[11px] font-semibold text-gray-400 uppercase">Address</p><p className="font-semibold text-gray-800 mt-0.5">{user.address || 'Not set'}</p></div>
                                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100"><p className="text-[11px] font-semibold text-gray-400 uppercase">Course/Program</p><p className="font-semibold text-gray-800 mt-0.5">{user.course || 'Not set'}</p></div>
                                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100"><p className="text-[11px] font-semibold text-gray-400 uppercase">Semester/Year</p><p className="font-semibold text-gray-800 mt-0.5">{user.semester || 'Not set'}</p></div>
                                </div>
                            )}
                        </div>
                    </div>
  );
}
