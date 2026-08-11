export default function FloatingButtons({ showBackToTop, findFriendHref = 'student-dashboard.html' }) {
  return (
    <>
      <button
        className="floating-btn"
        onClick={() => (window.location.href = findFriendHref)}
        title="Find a Friend"
      >
        <span className="flex items-center justify-center text-xl">👥</span>
      </button>

      {showBackToTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Back to top">
          <i className="fas fa-arrow-up text-xs"></i>
        </button>
      )}
    </>
  );
}
