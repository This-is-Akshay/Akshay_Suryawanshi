/**
 * Portfolio Website - JavaScript
 * Handles all interactivity: theme toggle, navigation, project filters,
 * accordion expand/collapse, copy-to-clipboard, toast notifications,
 * reveal-on-scroll animations, and back-to-top functionality.
 */

// ===================================
// Resume Download Function (Global)
// ===================================
function downloadResume() {
    if (typeof resumeBase64 === 'undefined') {
        console.error('Resume data not loaded');
        return;
    }
    
    // Convert base64 to blob
    const byteCharacters = atob(resumeBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Akshay_Suryawanshi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ===================================
// PII Protection Functions (Global)
// ===================================
// Obfuscated email parts (split to prevent scraping)
const _e1 = 'akshay.suryawanshi';
const _e2 = 'hotmail';
const _e3 = 'com';

function getEmail() {
    return _e1 + '@' + _e2 + '.' + _e3;
}

function revealAndCopyEmail(btn) {
    const emailEl = document.getElementById('protected-email');
    const email = getEmail();
    
    if (emailEl.textContent.includes('[')) {
        // First click - reveal email
        emailEl.textContent = email;
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Email`;
    } else {
        // Second click - copy email
        navigator.clipboard.writeText(email).then(() => {
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
            setTimeout(() => {
                btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Email`;
            }, 2000);
        });
    }
}

// Obfuscated phone parts
const _p1 = '+91 ';
const _p2 = '97028';
const _p3 = '91380';

function revealPhone(btn) {
    const phone = _p1 + _p2 + _p3;
    btn.outerHTML = `<p>${phone}</p>`;
}

(function () {
    'use strict';

    // ===================================
    // DOM Elements
    // ===================================
    const elements = {
        // Navigation
        header: document.getElementById('header'),
        navMenu: document.getElementById('nav-menu'),
        navToggle: document.getElementById('nav-toggle'),
        navClose: document.getElementById('nav-close'),
        navLinks: document.querySelectorAll('.nav__link'),

        // Theme
        themeToggle: document.getElementById('theme-toggle'),

        // Back to top
        backToTop: document.getElementById('back-to-top'),

        // Toast
        toast: document.getElementById('toast'),

        // Project filters
        filterBtns: document.querySelectorAll('.filter-btn'),
        projectCards: document.querySelectorAll('.project-card'),

        // Project toggles
        projectToggles: document.querySelectorAll('.project-card__toggle'),

        // Copy email buttons
        copyEmailBtns: document.querySelectorAll('.copy-email'),

        // Reveal elements
        revealElements: document.querySelectorAll('.reveal'),

        // Sections for scroll spy
        sections: document.querySelectorAll('section[id]')
    };

    // ===================================
    // Theme Management
    // ===================================
    const ThemeManager = {
        STORAGE_KEY: 'portfolio-theme',
        DARK: 'dark',
        LIGHT: 'light',

        init() {
            const savedTheme = localStorage.getItem(this.STORAGE_KEY);
            
            if (savedTheme) {
                this.setTheme(savedTheme);
            } else {
                // Check system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.setTheme(prefersDark ? this.DARK : this.LIGHT);
            }

            // Listen for system preference changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(this.STORAGE_KEY)) {
                    this.setTheme(e.matches ? this.DARK : this.LIGHT);
                }
            });

            // Toggle button event
            elements.themeToggle?.addEventListener('click', () => this.toggle());
        },

        setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem(this.STORAGE_KEY, theme);
        },

        toggle() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === this.DARK ? this.LIGHT : this.DARK;
            this.setTheme(newTheme);
        }
    };

    // ===================================
    // Navigation
    // ===================================
    const Navigation = {
        init() {
            // Mobile menu toggle
            elements.navToggle?.addEventListener('click', () => this.openMenu());
            elements.navClose?.addEventListener('click', () => this.closeMenu());

            // Close menu when clicking a link
            elements.navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (elements.navMenu?.classList.contains('show') &&
                    !elements.navMenu.contains(e.target) &&
                    !elements.navToggle?.contains(e.target)) {
                    this.closeMenu();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && elements.navMenu?.classList.contains('show')) {
                    this.closeMenu();
                    elements.navToggle?.focus();
                }
            });

            // Header scroll effect
            window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

            // Smooth scroll for anchor links
            this.initSmoothScroll();

            // Scroll spy
            this.initScrollSpy();
        },

        openMenu() {
            elements.navMenu?.classList.add('show');
            elements.navToggle?.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        },

        closeMenu() {
            elements.navMenu?.classList.remove('show');
            elements.navToggle?.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        },

        handleScroll() {
            const scrollY = window.scrollY;

            // Header shadow on scroll
            if (scrollY > 50) {
                elements.header?.classList.add('scrolled');
            } else {
                elements.header?.classList.remove('scrolled');
            }

            // Back to top visibility
            if (scrollY > 500) {
                elements.backToTop?.removeAttribute('hidden');
            } else {
                elements.backToTop?.setAttribute('hidden', '');
            }
        },

        initSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });

                        // Update URL without triggering scroll
                        history.pushState(null, '', href);
                    }
                });
            });
        },

        initScrollSpy() {
            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -80% 0px',
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        this.setActiveLink(id);
                    }
                });
            }, observerOptions);

            elements.sections.forEach(section => observer.observe(section));
        },

        setActiveLink(sectionId) {
            elements.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    // ===================================
    // Back to Top
    // ===================================
    const BackToTop = {
        init() {
            elements.backToTop?.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // ===================================
    // Project Filters
    // ===================================
    const ProjectFilters = {
        init() {
            elements.filterBtns.forEach(btn => {
                btn.addEventListener('click', () => this.filter(btn));
            });
        },

        filter(activeBtn) {
            const filterValue = activeBtn.dataset.filter;

            // Update active button
            elements.filterBtns.forEach(btn => btn.classList.remove('active'));
            activeBtn.classList.add('active');

            // Get category headers
            const categoryHeaders = document.querySelectorAll('.projects__category');

            // Filter projects
            elements.projectCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    // Re-trigger animation
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = '';
                } else {
                    card.classList.add('hidden');
                }
            });

            // Show/hide category headers based on filter
            categoryHeaders.forEach(header => {
                const title = header.querySelector('.projects__category-title').textContent.toLowerCase();
                
                if (filterValue === 'all') {
                    header.style.display = '';
                } else if (filterValue === 'infrastructure' && title.includes('infrastructure')) {
                    header.style.display = '';
                } else if (filterValue === 'security' && title.includes('information security')) {
                    header.style.display = '';
                } else if (filterValue === 'leadership' && title.includes('leadership')) {
                    header.style.display = '';
                } else {
                    header.style.display = 'none';
                }
            });
        }
    };

    // ===================================
    // Project Accordion
    // ===================================
    const ProjectAccordion = {
        init() {
            elements.projectToggles.forEach(toggle => {
                toggle.addEventListener('click', () => this.toggle(toggle));
            });
        },

        toggle(button) {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const detailsId = button.getAttribute('aria-controls');
            const details = document.getElementById(detailsId);

            if (isExpanded) {
                button.setAttribute('aria-expanded', 'false');
                details?.setAttribute('hidden', '');
                button.querySelector('span').textContent = 'View Details';
            } else {
                button.setAttribute('aria-expanded', 'true');
                details?.removeAttribute('hidden');
                button.querySelector('span').textContent = 'Hide Details';
            }
        }
    };

    // ===================================
    // Toast Notifications
    // ===================================
    const Toast = {
        timeout: null,

        show(message = 'Email copied to clipboard!') {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            const messageEl = elements.toast?.querySelector('.toast__message');
            if (messageEl) {
                messageEl.textContent = message;
            }

            elements.toast?.removeAttribute('hidden');

            this.timeout = setTimeout(() => {
                elements.toast?.setAttribute('hidden', '');
            }, 3000);
        }
    };

    // ===================================
    // Copy to Clipboard
    // ===================================
    const CopyToClipboard = {
        init() {
            elements.copyEmailBtns.forEach(btn => {
                btn.addEventListener('click', () => this.copy(btn));
            });
        },

        async copy(button) {
            const email = button.dataset.email;
            
            try {
                await navigator.clipboard.writeText(email);
                Toast.show('Email copied to clipboard!');
                
                // Visual feedback
                const originalText = button.innerHTML;
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Copied!
                `;
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                this.fallbackCopy(email);
            }
        },

        fallbackCopy(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                Toast.show('Email copied to clipboard!');
            } catch (err) {
                Toast.show('Failed to copy email');
            }
            
            document.body.removeChild(textArea);
        }
    };

    // ===================================
    // Reveal on Scroll
    // ===================================
    const RevealOnScroll = {
        init() {
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Optionally unobserve after reveal
                        // observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            elements.revealElements.forEach(el => observer.observe(el));
        }
    };

    // ===================================
    // Keyboard Navigation
    // ===================================
    const KeyboardNav = {
        init() {
            // Handle keyboard navigation for filter buttons
            const filterContainer = document.querySelector('.projects__filters');
            if (filterContainer) {
                filterContainer.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                        const buttons = Array.from(elements.filterBtns);
                        const currentIndex = buttons.indexOf(document.activeElement);
                        
                        if (currentIndex !== -1) {
                            let newIndex;
                            if (e.key === 'ArrowRight') {
                                newIndex = (currentIndex + 1) % buttons.length;
                            } else {
                                newIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                            }
                            buttons[newIndex].focus();
                        }
                    }
                });
            }
        }
    };

    // ===================================
    // Performance Optimizations
    // ===================================
    const Performance = {
        init() {
            // Debounce scroll events
            let scrollTimeout;
            const originalScroll = Navigation.handleScroll.bind(Navigation);
            
            window.removeEventListener('scroll', originalScroll);
            window.addEventListener('scroll', () => {
                if (scrollTimeout) {
                    cancelAnimationFrame(scrollTimeout);
                }
                scrollTimeout = requestAnimationFrame(() => {
                    Navigation.handleScroll();
                });
            }, { passive: true });
        }
    };

    // ===================================
    // Initialize Everything
    // ===================================
    function init() {
        ThemeManager.init();
        Navigation.init();
        BackToTop.init();
        ProjectFilters.init();
        ProjectAccordion.init();
        CopyToClipboard.init();
        RevealOnScroll.init();
        KeyboardNav.init();
        Performance.init();

        // Initial reveal for elements above the fold
        setTimeout(() => {
            document.querySelectorAll('.hero .reveal').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
