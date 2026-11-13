import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Check if device is a touch/mobile device
    const isTouch = typeof window !== 'undefined' && 
      (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0);

    // Initialize Lenis with optimized settings for both Desktop and Mobile
    const lenis = new Lenis({
      duration: isTouch ? 0.8 : 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
      syncTouch: false, // Ensures native mobile touch inertia is preserved at 60-120fps without lag
      allowNestedScroll: true,
      prevent: (node) => {
        if (!node || !(node instanceof HTMLElement)) return false;
        if (node.tagName === 'TEXTAREA' || node.hasAttribute('data-lenis-prevent')) return true;
        const style = window.getComputedStyle(node);
        const isScrollableY =
          (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
          node.scrollHeight > node.clientHeight;
        return isScrollableY;
      },
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    // Standard lagSmoothing ensures frames are smoothed instead of skipping during micro-spikes
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return children;
}
