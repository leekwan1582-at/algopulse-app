import { useEffect, useState } from 'react';

export default function ScrollToBottomFab() {
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      setCanScrollDown(scrollY + innerHeight < scrollHeight - 40);
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  if (!canScrollDown) return null;

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToBottom}
      aria-label="Scroll to bottom"
      title="Scroll to bottom"
      className="btn btn-secondary rounded-circle shadow d-flex align-items-center justify-content-center"
      style={{
        position: 'fixed',
        bottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
        width: '44px',
        height: '44px',
        zIndex: 1080,
      }}
    >
      <i className="bi bi-arrow-down fs-5" aria-hidden="true" />
    </button>
  );
}
