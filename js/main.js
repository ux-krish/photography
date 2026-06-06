/* ============================================
   KRISHNENDU DUTTA — NATURE PHOTOGRAPHY PORTFOLIO
   Advanced GSAP Animation Orchestrator
   ============================================ */

(() => {
    'use strict';

    /* ====== Wait for libraries ====== */
    const libsReady = () => {
        return typeof gsap !== 'undefined'
            && typeof ScrollTrigger !== 'undefined'
            && typeof Lenis !== 'undefined';
    };

    const waitForLibs = (cb, attempts = 0) => {
        if (libsReady()) { cb(); return; }
        if (attempts > 80) { console.warn('Libraries failed to load'); return; }
        setTimeout(() => waitForLibs(cb, attempts + 1), 50);
    };

    /* ====== Register GSAP plugins ====== */
    const initPlugins = () => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        gsap.config({ nullTargetWarn: false });
    };

    /* ============================================
       1. SMOOTH SCROLL (LENIS)
       ============================================ */
    const initSmoothScroll = () => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Anchor smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href');
                if (href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        lenis.scrollTo(target, { offset: -60, duration: 1.4 });
                    }
                }
            });
        });

        return lenis;
    };

    /* ============================================
       2. PRELOADER
       ============================================ */
    const initLoader = () => {
        const loader = document.getElementById('loader');
        const counter = document.getElementById('loaderCount');
        const bar = document.getElementById('loaderBar');
        if (!loader) return;

        let progress = 0;
        const target = 100;
        const duration = 1600;
        const start = performance.now();

        const update = (now) => {
            const elapsed = now - start;
            const eased = Math.min(1, elapsed / duration);
            // easeOutCubic
            const value = 1 - Math.pow(1 - eased, 3);
            progress = Math.round(value * target);
            if (counter) counter.textContent = progress;
            if (bar) bar.style.width = progress + '%';
            if (eased < 1) {
                requestAnimationFrame(update);
            } else {
                revealSite();
            }
        };

        const revealSite = () => {
            const tl = gsap.timeline({
                onComplete: () => {
                    loader.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                    playHeroIntro();
                }
            });
            tl.to('.loader__count', { scale: 0.85, opacity: 0.4, duration: 0.4, ease: 'power2.in' })
              .to('.loader__bar', { scaleX: 0, transformOrigin: 'right', duration: 0.5, ease: 'power3.in' }, '<0.1')
              .to('.loader__caption', { opacity: 0, y: 20, duration: 0.3 }, '<')
              .to(loader, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '<0.1')
              .to(loader, { autoAlpha: 0, duration: 0 }, '>-0.1');
        };

        // Preload hero image roughly
        const heroImg = new Image();
        heroImg.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=2400&q=85&auto=format&fit=crop';

        // Start animation regardless
        requestAnimationFrame(update);

        // safety fallback
        setTimeout(() => {
            if (loader.style.display !== 'none') {
                progress = 100;
                if (counter) counter.textContent = 100;
                if (bar) bar.style.width = '100%';
                setTimeout(revealSite, 200);
            }
        }, 3500);
    };

    /* ============================================
       3. CUSTOM CURSOR
       ============================================ */
    const initCursor = () => {
        if (window.innerWidth < 1025) return;
        const cursor = document.getElementById('cursor');
        const label = document.getElementById('cursorLabel');
        if (!cursor) return;

        const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3' });
        const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3' });

        window.addEventListener('mousemove', (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        });

        // Cursor label support
        const updateLabel = (text) => {
            if (!label) return;
            label.textContent = text;
        };

        // Hoverable targets
        document.querySelectorAll('[data-cursor="hover"]').forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('is-hover');
                updateLabel('');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('is-hover');
                updateLabel('');
            });
        });

        document.querySelectorAll('[data-cursor="view"]').forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('is-view');
                updateLabel('View');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('is-view');
                updateLabel('');
            });
        });

        // Hide when leaving window
        document.addEventListener('mouseleave', () => {
            gsap.to(cursor, { autoAlpha: 0, duration: 0.3 });
        });
        document.addEventListener('mouseenter', () => {
            gsap.to(cursor, { autoAlpha: 1, duration: 0.3 });
        });
    };

    /* ============================================
       4. NAVIGATION
       ============================================ */
    const initNav = () => {
        const nav = document.getElementById('nav');
        const toggle = document.getElementById('navToggle');
        const mobileMenu = document.getElementById('mobileMenu');

        // Scroll state
        ScrollTrigger.create({
            start: 'top -50',
            onUpdate: (self) => {
                if (self.direction === 1) nav.classList.add('is-scrolled');
                else if (self.scroll() < 100) nav.classList.remove('is-scrolled');
            },
        });

        // Mobile menu
        if (toggle && mobileMenu) {
            const closeMenu = () => {
                toggle.classList.remove('is-active');
                mobileMenu.classList.remove('is-open');
                document.body.classList.remove('no-scroll');
            };
            const openMenu = () => {
                toggle.classList.add('is-active');
                mobileMenu.classList.add('is-open');
                document.body.classList.add('no-scroll');
            };
            toggle.addEventListener('click', () => {
                if (mobileMenu.classList.contains('is-open')) closeMenu();
                else openMenu();
            });
            mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
        }
    };

    /* ============================================
       5. SCROLL PROGRESS
       ============================================ */
    const initProgress = () => {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;
        ScrollTrigger.create({
            start: 'top top',
            end: 'max',
            onUpdate: (self) => {
                bar.style.width = (self.progress * 100) + '%';
            },
        });
    };

    /* ============================================
       6. HERO
       ============================================ */
    let heroPlayed = false;
    const playHeroIntro = () => {
        if (heroPlayed) return;
        heroPlayed = true;

        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        tl.to('.hero__title-word', {
            y: 0,
            duration: 1.4,
            stagger: 0.08,
        })
        .from('.hero__eyebrow', { y: 30, opacity: 0, duration: 1 }, '-=1')
        .from('.hero__meta', { y: 30, opacity: 0, duration: 1 }, '-=0.9')
        .from('.hero__bottom', { y: 40, opacity: 0, duration: 1 }, '-=0.8')
        .from('.hero__floating', {
            scale: 0.85,
            opacity: 0,
            duration: 1.4,
            stagger: 0.15,
            ease: 'power3.out',
        }, '-=1.2');

        // Hero parallax (background + floaters)
        gsap.to('#heroBg img', {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        gsap.to('#heroFloat1', {
            yPercent: -25,
            rotation: -3,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
        gsap.to('#heroFloat2', {
            yPercent: -45,
            rotation: 4,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        gsap.to('.hero__container', {
            yPercent: -10,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    };

    /* ============================================
       7. GENERIC REVEAL HELPERS
       ============================================ */
    const initReveals = () => {
        // Reveal up
        gsap.utils.toArray('[data-reveal="up"]').forEach((el) => {
            gsap.from(el, {
                y: 50,
                opacity: 0,
                duration: 1.1,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse',
                },
            });
        });

        // Reveal left
        gsap.utils.toArray('[data-reveal="left"]').forEach((el) => {
            gsap.from(el, {
                x: -50,
                opacity: 0,
                duration: 1.1,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse',
                },
            });
        });

        // Reveal scale
        gsap.utils.toArray('[data-reveal="scale"]').forEach((el) => {
            gsap.from(el, {
                scale: 0.6,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse',
                },
            });
        });

        // Reveal stagger
        gsap.utils.toArray('[data-reveal-stagger]').forEach((el) => {
            const children = el.children;
            gsap.from(children, {
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: 'expo.out',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            });
        });

        // Reveal text — word by word using template mark
        document.querySelectorAll('[data-reveal-text]').forEach((el) => {
            // Convert text into wrapped spans preserving <em>
            wrapTextNodes(el);
            const words = el.querySelectorAll('.reveal-word__inner');
            gsap.from(words, {
                yPercent: 110,
                duration: 1.1,
                ease: 'expo.out',
                stagger: 0.05,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            });
        });

        // Card reveal (gallery items + horizontal cards)
        gsap.utils.toArray('[data-reveal-card]').forEach((el) => {
            const img = el.querySelector('img');
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse',
                },
            });
            tl.from(el, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'expo.out',
            });
            if (img) {
                tl.from(img, {
                    scale: 1.25,
                    duration: 1.6,
                    ease: 'expo.out',
                }, '<');
            }
        });
    };

    /* Wrap text nodes while preserving inline styled elements (<em>, <i>, <b>, <strong>, <a>) */
    const wrapTextNodes = (root) => {
        const PRESERVE = ['EM', 'I', 'B', 'STRONG', 'A', 'SPAN'];
        const wrap = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                if (!text.trim()) return;
                const frag = document.createDocumentFragment();
                const words = text.split(/(\s+)/);
                words.forEach((w) => {
                    if (/^\s+$/.test(w)) {
                        frag.appendChild(document.createTextNode(w));
                    } else {
                        const outer = document.createElement('span');
                        outer.className = 'reveal-word';
                        const inner = document.createElement('span');
                        inner.className = 'reveal-word__inner';
                        inner.textContent = w;
                        outer.appendChild(inner);
                        frag.appendChild(outer);
                    }
                });
                node.replaceWith(frag);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Don't descend into <br> or already-wrapped reveal-words
                if (node.tagName === 'BR' || node.classList.contains('reveal-word')) return;
                // Descend into styled inline children to wrap their text too
                if (PRESERVE.includes(node.tagName)) {
                    Array.from(node.childNodes).forEach(wrap);
                } else {
                    Array.from(node.childNodes).forEach(wrap);
                }
            }
        };
        Array.from(root.childNodes).forEach(wrap);
    };

    /* ============================================
       8. ABOUT IMAGE PARALLAX
       ============================================ */
    const initAboutParallax = () => {
        const main = document.querySelector('.about__image--main img');
        if (main) {
            gsap.to(main, {
                yPercent: -10,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.about__media',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
    };

    /* ============================================
       9. HORIZONTAL SCROLL SECTION
       ============================================ */
    const initHorizontal = () => {
        const pin = document.getElementById('horizontalPin');
        const track = document.getElementById('horizontalTrack');
        if (!pin || !track) return;

        const isMobile = window.innerWidth < 901;

        if (isMobile) return;

        const getDistance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
            x: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
                trigger: pin,
                start: 'top top',
                end: () => '+=' + getDistance(),
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            },
        });
    };

    /* ============================================
       11. STATS COUNTER
       ============================================ */
    const initCounters = () => {
        document.querySelectorAll('[data-count]').forEach((el) => {
            const target = parseFloat(el.dataset.count);
            const obj = { v: 0 };
            gsap.to(obj, {
                v: target,
                duration: 2.4,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                onUpdate: () => {
                    const v = obj.v;
                    el.textContent = target >= 1000
                        ? Math.round(v).toLocaleString()
                        : Math.round(v);
                },
            });
        });
    };

    /* ============================================
       12. MARQUEE SPEED CONTROL
       ============================================ */
    const initMarquee = () => {
        const track = document.getElementById('marqueeTrack');
        if (!track) return;
        gsap.to(track, {
            xPercent: -50,
            ease: 'none',
            duration: 35,
            repeat: -1,
        });
    };

    /* ============================================
       13. FOOTER REVEAL
       ============================================ */
    const initFooter = () => {
        const big = document.querySelector('.footer__big');
        if (big) {
            wrapTextNodes(big);
            const words = big.querySelectorAll('.reveal-word__inner');
            if (!words.length) return;
            gsap.from(words, {
                yPercent: 110,
                duration: 1.4,
                ease: 'expo.out',
                stagger: 0.04,
                scrollTrigger: {
                    trigger: big,
                    start: 'top 90%',
                },
            });
        }
    };

    /* ============================================
       14. MAGNETIC EFFECT ON BUTTONS
       ============================================ */
    const initMagnetic = () => {
        if (window.innerWidth < 1025) return;
        document.querySelectorAll('.nav__cta, .btn--primary').forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power3.out' });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
            });
        });
    };

    /* ============================================
       15. FORM SUBMIT (DEMO)
       ============================================ */
    const initForm = () => {
        const form = document.getElementById('contactForm');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const span = btn.querySelector('span');
            const original = span.textContent;
            span.textContent = 'Sending...';
            setTimeout(() => {
                span.textContent = 'Message sent ✓';
                form.reset();
                setTimeout(() => { span.textContent = original; }, 2400);
            }, 1200);
        });
    };

    /* ============================================
       16. IMAGE TILT (gallery)
       ============================================ */
    const initTilt = () => {
        if (window.innerWidth < 1025) return;
        document.querySelectorAll('.gallery__item').forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                gsap.to(el, {
                    rotationY: x * 4,
                    rotationX: -y * 4,
                    transformPerspective: 800,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.8, ease: 'power3.out' });
            });
        });
    };

    /* ============================================
       REFRESH ON RESIZE
       ============================================ */
    const initResize = () => {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        });
    };

    /* ============================================
       BOOT
       ============================================ */
    const boot = () => {
        initPlugins();
        initSmoothScroll();
        initCursor();
        initNav();
        initProgress();
        initReveals();
        initAboutParallax();
        initHorizontal();
        initCounters();
        initMarquee();
        initFooter();
        initMagnetic();
        initForm();
        initResize();

        // Start preloader
        document.body.classList.add('no-scroll');
        initLoader();

        // Refresh after fonts/images settle
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });
    };

    waitForLibs(boot);
})();
