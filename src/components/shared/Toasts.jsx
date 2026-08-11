export default function Toasts({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          <div className="font-semibold text-forest-teal text-sm flex items-center gap-2">
            <i className={`fas ${t.icon || 'fa-circle-check'} text-electric-gold`}></i>
            {t.title}
          </div>
          {t.message && <div className="text-gray-500 text-xs mt-1">{t.message}</div>}
        </div>
      ))}
    </div>
  );
}
