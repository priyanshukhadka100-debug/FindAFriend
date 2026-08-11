export default function CreateStudentModal({ show, onClose, newStudent, setNewStudent, formError, onCreate }) {
  if (!show) return null;
  return (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => onClose()}>
                            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-5 shadow-xl" onClick={e => e.stopPropagation()}>
                                <div className="flex items-center justify-between mb-3.5">
                                    <h3 className="text-lg font-bold text-gray-800">Create Student Account</h3>
                                    <button onClick={() => onClose()} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                                </div>
                                {formError && <div className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-xl px-3 py-1.5 mb-3 font-normal">{formError}</div>}
                                <div className="space-y-3 text-xs md:text-sm font-normal">
                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase">Full Name *</label>
                                        <input type="text" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                                            className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase">Student ID</label>
                                        <input type="text" value={newStudent.studentId} onChange={e => setNewStudent({...newStudent, studentId: e.target.value})}
                                            className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition" placeholder="e.g. STU133718" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase">Email *</label>
                                        <input type="email" value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})}
                                            className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition" placeholder="student@ing.edu.np" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase">Course/Program</label>
                                        <input type="text" value={newStudent.course} onChange={e => setNewStudent({...newStudent, course: e.target.value})}
                                            className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition" placeholder="e.g. BSc (Hons) Computing" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold text-gray-500 uppercase">Password * (min 8 chars)</label>
                                        <input type="password" value={newStudent.password} onChange={e => setNewStudent({...newStudent, password: e.target.value})}
                                            className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition" />
                                    </div>
                                    <button onClick={onCreate} className="btn-forest w-full py-2.5 rounded-xl font-semibold text-xs mt-2">
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        </div>
  );
}
