import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from './BackToTop.module.css';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / docHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed right-6 bottom-6 z-50 ${styles.container}`}>
      <div className={styles.progressRing} style={{ '--progress': `${scrollProgress}%` }}></div>
      <button
        onClick={scrollToTop}
        className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary shadow-lg text-white hover:shadow-2xl active:scale-90 transition-all duration-300 border-2 border-white/80 backdrop-blur-sm relative z-10 ${styles.button}`}
        aria-label="Back to top"
      >
        <FaArrowUp className={`w-5 h-5 ${styles.arrow}`} />
      </button>
      <div className={styles.pulse}></div>
    </div>
  );
};

export default BackToTop; 