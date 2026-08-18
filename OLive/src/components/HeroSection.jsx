import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import screwdriverImg from '../assets/screwdriver.png';

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function buildRevealMask(mouseX, mouseY) {
  return `
    radial-gradient(
      ellipse 18% 22%
      at ${mouseX}% ${mouseY}%,
      black 0%,
      rgba(0,0,0,0.95) 18%,
      rgba(0,0,0,0.65) 38%,
      rgba(0,0,0,0.28) 58%,
      rgba(0,0,0,0.06) 78%,
      transparent 100%
    )
  `;
}

const TIMING = {
  hook: 0.4,
  hookDuration: 0.6,
  pauseAfterHook: 0.75,
  ifixit: 0.4 + 0.6 + 0.75,
  ifixitDuration: 0.65,
  revealAll: 0.4 + 0.6 + 0.75 + 0.65 + 0.35,
  revealDuration: 0.8,
};

export default function HeroSection({ onIntroComplete }) {
  const sectionRef = useRef(null);
  const introStartRef = useRef(Date.now());
  const reduceMotion = useReducedMotion();

  const targetRef = useRef({
    x: 0.5,
    y: 0.5,
    active: true,
    manual: false,
  });

  const currentRef = useRef({
    x: 0.5,
    y: 0.5,
    opacity: 0,
  });

  const [, forceRender] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      onIntroComplete?.();
      return undefined;
    }

    const timer = setTimeout(() => onIntroComplete?.(), TIMING.revealAll * 1000);
    return () => clearTimeout(timer);
  }, [reduceMotion, onIntroComplete]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion =
      reduceMotion ||
      (typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    if (reducedMotion) {
      currentRef.current.opacity = 0.7;
    }

    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const handleMouseMove = (event) => {
      const rect = section.getBoundingClientRect();
      targetRef.current.x = (event.clientX - rect.left) / rect.width;
      targetRef.current.y = (event.clientY - rect.top) / rect.height;
      targetRef.current.active = true;
      targetRef.current.manual = true;
    };

    const handleMouseLeave = () => {
      targetRef.current.manual = false;
    };

    if (!reducedMotion && !isTouch) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    let raf = 0;

    const animate = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      if (!reducedMotion && !target.manual) {
        const t = Date.now() / 1000;
        target.x = 0.5 + Math.sin(t * 0.45) * 0.34;
        target.y = 0.48 + Math.cos(t * 0.35) * 0.12;
      }

      target.active = true;

      const ease = reducedMotion ? 1 : target.manual ? 0.085 : 0.045;

      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;

      const elapsed = (Date.now() - introStartRef.current) / 1000;
      const watermarkReady = reducedMotion || elapsed >= TIMING.revealAll;
      const targetOpacity = watermarkReady ? (reducedMotion ? 0.7 : 1) : 0;
      current.opacity += (targetOpacity - current.opacity) * 0.075;

      forceRender((value) => (value + 1) % 1000000);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      if (!reducedMotion && !isTouch) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [reduceMotion]);

  const current = currentRef.current;
  const mouseX = current.x * 100;
  const mouseY = current.y * 100;
  const glowOpacity = current.opacity;

  const goldBlend = clamp01((current.x - 0.28) / 0.52);

  const strokeR = Math.round(lerp(212, 255, goldBlend));
  const strokeG = Math.round(lerp(175, 255, goldBlend));
  const strokeB = Math.round(lerp(55, 255, goldBlend));
  const strokeA = lerp(0.85, 1, goldBlend);

  const strokeColor = `rgba(${strokeR}, ${strokeG}, ${strokeB}, ${strokeA})`;

  const hookDelay = reduceMotion ? 0 : TIMING.hook;
  const ifixitDelay = reduceMotion ? 0 : TIMING.ifixit;
  const revealDelay = reduceMotion ? 0 : TIMING.revealAll;

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-dvh
        bg-brand-bg
        overflow-hidden
        flex
        items-center
      "
    >
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          select-none
          overflow-hidden
        "
        aria-hidden="true"
      >
        <div
          className="absolute whitespace-nowrap font-black leading-none"
          style={{
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontSize: 'clamp(80px, 22vw, 420px)',
            letterSpacing: '0em',
            fontKerning: 'none',
            fontVariantLigatures: 'none',
            fontFeatureSettings: '"kern" 0, "liga" 0',
            fontSynthesis: 'none',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'transparent',
            WebkitTextStroke: '0.022em rgba(212, 175, 55, 0.12)',
            opacity: glowOpacity > 0.1 ? 1 : 0,
            filter: 'none',
            textShadow: 'none',
            transition: 'opacity 0.6s ease',
          }}
        >
          REPAIR
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            opacity: glowOpacity,
            WebkitMaskImage: buildRevealMask(mouseX, mouseY),
            maskImage: buildRevealMask(mouseX, mouseY),
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskComposite: 'source-over',
            maskComposite: 'add',
          }}
        >
          <div
            className="absolute whitespace-nowrap font-black leading-none"
            style={{
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontSize: 'clamp(80px, 22vw, 420px)',
              letterSpacing: '0em',
              fontKerning: 'none',
              fontVariantLigatures: 'none',
              fontFeatureSettings: '"kern" 0, "liga" 0',
              fontSynthesis: 'none',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'transparent',
              WebkitTextStroke: `0.028em ${strokeColor}`,
              textShadow: 'none',
              filter: 'none',
            }}
          >
            REPAIR
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl text-center font-display">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: TIMING.hookDuration, delay: hookDelay }}
              className="
                text-[2.6rem]
                sm:text-6xl
                lg:text-[4.75rem]
                font-light
                text-white
                tracking-[-0.02em]
                leading-[1.08]
              "
            >
              <span className="inline-block">Broken phone?</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: TIMING.ifixitDuration, delay: ifixitDelay }}
              className="
                mt-2
                sm:mt-3
                text-[2.6rem]
                sm:text-6xl
                lg:text-[4.75rem]
                font-light
                tracking-[-0.02em]
                leading-[1.08]
                inline-flex
                items-center
                justify-center
                gap-2
                sm:gap-3
              "
            >
              <span className="font-light text-white">Just</span>
              <span className="font-semibold inline-flex items-center">
                <span className="text-brand-gold-light">i</span>
                <span className="text-brand-gold">fix</span>
                {/* <span className="text-brand-gold"></span> */}
                <span className="text-white inline-flex items-center">
                  <img
                    src={screwdriverImg}
                    alt=""
                    className="
                      inline-block
                      w-[0.38em]
                      sm:w-[0.4em]
                      h-[0.95em]
                      sm:h-[1.05em]
                      lg:h-[1.1em]
                      object-contain
                      mx-[0.02em]
                      translate-y-[-0.05em]
                    "
                  />
                  <span>t</span>
                </span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: TIMING.revealDuration, delay: revealDelay }}
              className="mt-8 sm:mt-10 flex flex-col items-center gap-5"
            >
              <span className="block w-8 h-px bg-brand-gold/60" />

              <p
                className="
                  text-[10px]
                  sm:text-[11px]
                  uppercase
                  tracking-[0.22em]
                  sm:tracking-[0.32em]
                  text-brand-gold
                  font-medium
                  max-w-lg
                  mx-auto
                  leading-[1.9]
                "
              >
                Screen replacements · Battery replacements · Water
                damage recovery · Charging issues for smartphones,
                tablets &amp; laptops
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
