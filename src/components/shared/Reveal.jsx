import useReveal from '../../hooks/useReveal';

export default function Reveal({ children, className = '', delay = 0, style = {} }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
