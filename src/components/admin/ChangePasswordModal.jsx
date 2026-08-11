export default function ChangePasswordModal({ show, onClose, passwordData, setPasswordData, passwordError, passwordSuccess, showPassword, setShowPassword, onSubmit }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-gray-800">Change Admin Password</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>
        {passwordSuccess && <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-lg mb-3 text-xs font-medium">{passwordSuccess}</div>}
        {passwordError && <div className="text-red-600 text-xs mb-3 font-normal">{passwordError}</div>}
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase">New Password (min 8 chars)</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordData.new}
              onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
              className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-teal focus:border-transparent transition text-xs md:text-sm font-normal"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase">Confirm New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordData.confirm}
              onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              className="w-full mt-1 px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-teal focus:border-transparent transition text-xs md:text-sm font-normal"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="showPwdAdmin" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="w-3.5 h-3.5 rounded text-forest-teal focus:ring-0" />
            <label htmlFor="showPwdAdmin" className="text-xs font-normal text-gray-600">Show Password</label>
          </div>
          <button onClick={onSubmit} className="btn-forest w-full py-2.5 rounded-xl font-semibold text-xs mt-1">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
