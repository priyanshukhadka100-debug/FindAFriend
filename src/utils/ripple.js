// Material-style ripple effect used on ripple-btn elements across the app.
export function addRipple(e) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const circle = document.createElement('span');
  const size = Math.max(rect.width, rect.height);
  circle.style.width = circle.style.height = `${size}px`;
  circle.style.left = `${e.clientX - rect.left - size / 2}px`;
  circle.style.top = `${e.clientY - rect.top - size / 2}px`;
  circle.className = 'ripple-el';
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}
