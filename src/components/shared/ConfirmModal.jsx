export default function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-10 rounded-full bg-forest-teal/10 flex items-center justify-center text-forest-teal text-lg mb-3">
          <i className="fas fa-right-from-bracket"></i>
        </div>
        <h3 className="text-base font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-5 leading-relaxed">{message}</p>
        <div className="flex gap-2.5">
          <button onClick={onCancel} className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 font-medium text-xs hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-2 rounded-xl bg-forest-teal text-white font-medium text-xs hover:bg-forest-teal-dark transition">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
