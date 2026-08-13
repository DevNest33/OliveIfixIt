import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  ShieldCheck,
  Zap,
  Star,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import screwdriverImg from '../assets/screwdriver.png';


export default function HeroSection({ onOpenBooking }) {

  const sectionRef = useRef(null);

  const targetRef = useRef({
    x: 0.5,
    y: 0.5,
    active: false,
  });

  const currentRef = useRef({
    x: 0.5,
    y: 0.5,
    opacity: 0,
  });

  const [, forceRender] = useState(0);


  /* =========================================================
     CURSOR TRACKING
     ========================================================= */

  useEffect(() => {

    const section = sectionRef.current;

    if (!section) return;


    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;


    const isTouch =
      typeof window !== 'undefined' &&
      (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );


    const handleMouseMove = (event) => {

      const rect =
        section.getBoundingClientRect();


      targetRef.current.x =
        (event.clientX - rect.left) /
        rect.width;


      targetRef.current.y =
        (event.clientY - rect.top) /
        rect.height;


      targetRef.current.active = true;
    };


    const handleMouseLeave = () => {

      targetRef.current.active = false;

    };


    if (!reducedMotion && !isTouch) {

      section.addEventListener(
        'mousemove',
        handleMouseMove
      );

      section.addEventListener(
        'mouseleave',
        handleMouseLeave
      );

    }


    let raf = 0;


    const animate = () => {

      const target =
        targetRef.current;

      const current =
        currentRef.current;

      // Mobile: auto-sweep glow since hover/cursor tracking isn't available
      if (isTouch && !reducedMotion) {
        const t = Date.now() / 1000;
        target.x = 0.5 + Math.sin(t * 0.5) * 0.3;
        target.y = 0.5 + Math.cos(t * 0.4) * 0.15;
        target.active = true;
      }


      const ease =
        reducedMotion
          ? 1
          : isTouch
            ? 0.06
            : 0.085;


      current.x +=
        (target.x - current.x) *
        ease;


      current.y +=
        (target.y - current.y) *
        ease;


      const targetOpacity =
        target.active
          ? isTouch
            ? 0.75
            : 1
          : 0;


      current.opacity +=
        (targetOpacity -
          current.opacity) *
        0.075;


      forceRender(
        (value) =>
          (value + 1) % 1000000
      );


      raf =
        requestAnimationFrame(
          animate
        );

    };


    raf =
      requestAnimationFrame(
        animate
      );


    return () => {

      cancelAnimationFrame(raf);


      if (!reducedMotion && !isTouch) {

        section.removeEventListener(
          'mousemove',
          handleMouseMove
        );

        section.removeEventListener(
          'mouseleave',
          handleMouseLeave
        );

      }

    };

  }, []);


  /* =========================================================
     CURRENT CURSOR STATE
     ========================================================= */

  const current =
    currentRef.current;


  const mouseX =
    current.x * 100;


  const mouseY =
    current.y * 100;


  const glowOpacity =
    current.opacity;


  /* =========================================================
     COMPONENT
     ========================================================= */

  return (

    <section
      ref={sectionRef}
      className="
        relative
        min-h-[720px]
        lg:min-h-[780px]
        bg-black
        overflow-hidden
        flex
        items-center
      "
    >


      {/* =====================================================
          GIANT REPAIR BACKGROUND
          ===================================================== */}

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


        {/* ===================================================
            BASE REPAIR

            IMPORTANT:

            This is ONLY the faint resting outline.

            It does NOT glow.
            It does NOT blur.
            It does NOT contain a second stroke.
            =================================================== */}

        <div
  className="
    absolute
    whitespace-nowrap
    font-black
    leading-none
  "
  style={{
    fontFamily: 'Arial Black, Arial, sans-serif',

    fontSize:
      'clamp(150px, 22vw, 420px)',

    letterSpacing:
      '0em',

    fontKerning:
      'none',

    fontVariantLigatures:
      'none',

    fontFeatureSettings:
      '"kern" 0, "liga" 0',

    fontSynthesis:
      'none',

    top: '50%',
    left: '50%',

    transform:
      'translate(-50%, -50%)',

    color:
      'transparent',

    WebkitTextStroke:
      '1px rgba(212, 175, 55, 0.035)',

    opacity: 1,

    filter: 'none',

    textShadow: 'none',
  }}
>
  REPAIR
</div>


        {/* ===================================================
            INTERACTIVE REPAIR

            The cursor reveals this layer.

            IMPORTANT:

            The glow is attached to the OUTLINE.
            The letter interior remains transparent.
            =================================================== */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
          style={{

            zIndex: 1,


            opacity:
              glowOpacity,


            /*
             * SMALL cursor vicinity.

             * The old mask was too large and made
             * the entire word visible.
             */
            WebkitMaskImage: `
              radial-gradient(
                ellipse 12% 16%
                at ${mouseX}% ${mouseY}%,

                black 0%,

                rgba(0,0,0,0.95) 18%,

                rgba(0,0,0,0.62) 35%,

                rgba(0,0,0,0.25) 55%,

                rgba(0,0,0,0.06) 75%,

                transparent 100%
              )
            `,


            maskImage: `
              radial-gradient(
                ellipse 12% 16%
                at ${mouseX}% ${mouseY}%,

                black 0%,

                rgba(0,0,0,0.95) 18%,

                rgba(0,0,0,0.62) 35%,

                rgba(0,0,0,0.25) 55%,

                rgba(0,0,0,0.06) 75%,

                transparent 100%
              )
            `,


            WebkitMaskRepeat:
              'no-repeat',


            maskRepeat:
              'no-repeat',


            WebkitMaskSize:
              '100% 100%',


            maskSize:
              '100% 100%',
          }}
        >

          <div
  className="
    absolute
    whitespace-nowrap
    font-black
    leading-none
  "
  style={{
    fontFamily: 'Arial Black, Arial, sans-serif',

    fontSize:
      'clamp(150px, 22vw, 420px)',

    letterSpacing:
      '0em',

    fontKerning:
      'none',

    fontVariantLigatures:
      'none',

    fontFeatureSettings:
      '"kern" 0, "liga" 0',

    fontSynthesis:
      'none',

    top: '50%',
    left: '50%',

    transform:
      'translate(-50%, -50%)',

    color:
      'transparent',

    WebkitTextStroke:
      '0.9px rgba(255, 202, 28, 0.95)',

    textShadow:
      'none',

    filter:
      'drop-shadow(0 0 4px rgba(255, 202, 28, 0.72)) drop-shadow(0 0 10px rgba(255, 202, 28, 0.28))',
  }}
>
  REPAIR
</div>
        </div>

      </div>


      {/* =====================================================
          HERO CONTENT
          ===================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >

        <div
          className="
            flex
            justify-center
          "
        >

          <div
            className="
              w-full
              max-w-4xl
              text-center
              space-y-6
            "
          >


            {/* =================================================
                BADGE
                ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                inline-flex
                items-center
                gap-2
                px-3.5
                py-1.5
                rounded-full
                bg-brand-gold/10
                border
                border-brand-gold/20
                text-brand-gold
                text-xs
                font-extrabold
                uppercase
                tracking-wider
              "
            >

              <Sparkles
                className="
                  w-3.5
                  h-3.5
                "
              />

              #1 Express Mobile &amp;
              Electronics Repair

            </motion.div>


            {/* =================================================
                HEADLINE
                ================================================= */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="
                text-5xl
                sm:text-6xl
                lg:text-7xl
                font-extrabold
                text-white
                tracking-tight
                leading-[1.05]
              "
            >

              Broken screen?

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-brand-gold
                  via-brand-gold-light
                  to-brand-gold
                  bg-clip-text
                  text-transparent
                  inline-flex
                  items-center
                  justify-center
                  gap-0.5
                "
              >

                Just if

                <img
                  src={screwdriverImg}
                  alt="screwdriver icon"
                  className="
                    inline-block
                    w-5
                    sm:w-6
                    h-11
                    sm:h-14
                    object-contain
                    align-middle
                    translate-y-1
                  "
                />

                xit

              </span>

            </motion.h1>


            {/* =================================================
                DESCRIPTION
                ================================================= */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="
                text-gray-400
                text-base
                sm:text-lg
                max-w-2xl
                mx-auto
                leading-relaxed
                font-medium
              "
            >

              Screen replacements, battery replacements,
              water damage recovery, charging issues and
              more for smartphones, tablets &amp; laptops.

            </motion.p>


            {/* =================================================
                BUTTON
                ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="
                flex
                justify-center
                pt-2
              "
            >

              <button
                onClick={() =>
                  onOpenBooking()
                }
                className="
                  gold-gradient-btn
                  px-8
                  py-4
                  rounded-xl
                  font-bold
                  text-base
                  flex
                  items-center
                  justify-center
                  gap-3
                  group
                  shadow-gold-glow
                  cursor-pointer
                "
              >

                <Calendar
                  className="
                    w-5
                    h-5
                    group-hover:scale-110
                    transition-transform
                  "
                />

                Book Repair

                <ArrowRight
                  className="
                    w-4
                    h-4
                    group-hover:translate-x-1
                    transition-transform
                  "
                />

              </button>

            </motion.div>


            {/* =================================================
                TRUST ROW
                ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.4,
              }}
              className="
                max-w-3xl
                mx-auto
                pt-6
                border-t
                border-gray-800
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-10
                gap-y-4
                text-xs
                text-gray-400
                font-semibold
              "
            >


              {/* Rating */}

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                "
              >

                <Star
                  className="
                    w-4
                    h-4
                    fill-amber-400
                    text-amber-400
                  "
                />

                <span>

                  <strong
                    className="text-white"
                  >
                    4.9/5
                  </strong>{' '}

                  (1,800+ Reviews)

                </span>

              </div>


              {/* Express */}

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                "
              >

                <Zap
                  className="
                    w-4
                    h-4
                    text-brand-gold
                  "
                />

                <span>

                  <strong
                    className="text-white"
                  >
                    Express
                  </strong>{' '}

                  Turnaround

                </span>

              </div>


              {/* Warranty */}

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                "
              >

                <ShieldCheck
                  className="
                    w-4
                    h-4
                    text-brand-gold
                  "
                />

                <span>

                  <strong
                    className="text-white"
                  >
                    3 Months
                  </strong>{' '}

                  Warranty

                </span>

              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
}