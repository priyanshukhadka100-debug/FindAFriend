import { addRipple } from '../../utils/ripple';

export default function StudentsView({
  students,
  filteredStudents,
  searchQuery,
  setSearchQuery,
  setShowCreateStudent,
  handleEditStudent,
  resetStudentPassword,
  setShowDeleteConfirm,
  getAvatarColor,
}) {
  return (
                <div className="fade-in">
                    <div className="bg-white rounded-2xl shadow-xs p-5 md:p-6 border border-gray-100">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-800">Student Directory</h3>
                                <p className="text-xs text-gray-400 mt-0.5 font-normal">Manage registered student accounts</p>
                            </div>
                            <button onClick={() => setShowCreateStudent(true)} onMouseDown={addRipple} className="ripple-btn btn-forest px-5 py-2 rounded-full font-semibold text-xs shadow-xs flex items-center gap-1.5">
                                <i className="fas fa-plus text-xs"></i> Add Student
                            </button>
                        </div>

                        <div className="relative mb-4">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                <i className="fas fa-search text-xs"></i>
                            </span>
                            <input
                                type="text"
                                placeholder="Search students by name, email, or student ID..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0D5C53] focus:border-transparent transition text-xs md:text-sm font-normal"
                            />
                        </div>

                        {filteredStudents.length === 0 ? (
                            <div className="text-center py-10 text-gray-400">
                                <span className="text-4xl block mb-2">👤</span>
                                <p className="font-semibold text-gray-700 text-sm">No students found</p>
                                <p className="text-xs text-gray-400 mt-0.5 font-normal">{searchQuery ? 'Try a different search query' : 'Add students using the button above'}</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs md:text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-200 text-left text-gray-400 uppercase text-[11px]">
                                            <th className="pb-2.5 font-semibold">Student</th>
                                            <th className="pb-2.5 font-semibold">Email</th>
                                            <th className="pb-2.5 font-semibold hidden md:table-cell">Student ID</th>
                                            <th className="pb-2.5 font-semibold hidden lg:table-cell">Course</th>
                                            <th className="pb-2.5 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStudents.map(s => {
                                            const avatarClass = getAvatarColor(s.name);
                                            return (
                                                <tr key={s.id} className="border-b border-gray-100 table-row">
                                                    <td className="py-3">
                                                        <div className="flex items-center gap-2.5">
                                                            <div className={`avatar-sm ${avatarClass}`}>
                                                                {(s.name || 'S').charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="font-semibold text-gray-800">{s.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 text-gray-600 font-normal">{s.email}</td>
                                                    <td className="py-3 hidden md:table-cell text-gray-600 font-normal">{s.studentId || 'N/A'}</td>
                                                    <td className="py-3 hidden lg:table-cell text-gray-600 font-normal">{s.course || 'N/A'}</td>
                                                    <td className="py-3 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button onClick={() => handleEditStudent(s)} className="text-blue-600 hover:text-blue-800 p-1 transition" title="Edit Student">
                                                                <i className="fas fa-edit"></i>
                                                            </button>
                                                            <button onClick={() => resetStudentPassword(s.id)} className="text-amber-600 hover:text-amber-800 p-1 transition" title="Send Password Reset">
                                                                <i className="fas fa-key"></i>
                                                            </button>
                                                            <button onClick={() => setShowDeleteConfirm(s.id)} className="text-red-600 hover:text-red-800 p-1 transition" title="Delete Student">
                                                                <i className="fas fa-trash-can"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="mt-3 text-xs text-gray-400 font-normal">
                                    Showing {filteredStudents.length} of {students.length} student records
                                </div>
                            </div>
                        )}
                    </div>
                </div>
  );
}
