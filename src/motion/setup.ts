import { gsap } from 'gsap';
import { setTransition, setLoaderFormat, setLoaderExit, ease } from '../engine';

export function setupMotion() {
  // Format loader counter as calibration percentage: 000% -> 100%
  setLoaderFormat((p: number) => `${Math.round(p).toString().padStart(3, '0')}%`);

  // Snappy loader exit (under 0.5s)
  setLoaderExit((root: HTMLElement) => {
    const tl = gsap.timeline();
    tl.to(root.querySelectorAll('[data-loader-out]'), {
      yPercent: -120,
      duration: 0.35,
      ease: ease.inOut,
      stagger: 0.03
    })
    .to(root, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 0.45,
      ease: ease.inOut
    }, '-=0.15');
    return tl;
  });

  // Seamless curtain page transition
  setTransition({
    leave: (c: HTMLElement) => {
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: ease.inOut });
    },
    enter: (c: HTMLElement) => {
      return gsap.timeline()
        .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.55, ease: ease.inOut })
        .set(c, { autoAlpha: 0 });
    }
  });
}

