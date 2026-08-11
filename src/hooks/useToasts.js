import { useCallback, useState } from 'react';

// Shared toast-notification state/behavior used across every page.
export default function useToasts() {
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((title, message, icon) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, title, message, icon }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  return { toasts, pushToast };
}
