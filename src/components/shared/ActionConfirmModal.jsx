// Generic centered confirm dialog used for destructive/state-changing
// confirmations (delete student, logout) across the dashboards.
export default function ActionConfirmModal({ show, icon, iconBg, iconColor, title, message, confirmLabel, confirmClass = 'btn-danger', onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl text-center" onClick={(e) => e.stopPropagation()}>
        <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-2 ${iconColor} text-xl`}>
          <i className={`fas ${icon}`}></i>
        </div>
        <h3 className="text-base font-bold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-500 mt-1 font-normal">{message}</p>
        <div className="flex gap-2.5 mt-4">
          <button onClick={onCancel} className="flex-1 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition text-xs font-medium">
            Cancel
          </button>
          <button onClick={onConfirm} className={`flex-1 ${confirmClass} py-2 rounded-xl font-medium text-xs`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
