export default function EditStudentModal({ show, editingStudent, setEditingStudent, onSave, onClose }) {
  if (!show || !editingStudent) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-lg font-bold text-gray-800">Edit Student</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>
        <div className="space-y-3 text-xs md:text-sm font-normal">
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase">Full Name</label>
            <input
              type="text"
              value={editingStudent.name}
              onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
              className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-teal focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase">Email</label>
            <input
              type="email"
              value={editingStudent.email}
              onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
              className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-teal focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase">Course</label>
            <input
              type="text"
              value={editingStudent.course || ''}
              onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })}
              className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-teal focus:border-transparent transition"
            />
          </div>
          <button onClick={onSave} className="btn-forest w-full py-2.5 rounded-xl font-semibold text-xs mt-2">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
