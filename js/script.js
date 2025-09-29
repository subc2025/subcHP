// Modern Step Up Badminton Club - JavaScript

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const mobileTabButtons = document.querySelectorAll('.mobile-tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const mobileToggle = document.getElementById('mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');
const contactForm = document.getElementById('contactForm');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initTabNavigation();
    initMobileNavigation();
    initContactForm();
    initScrollAnimations();
    initHeaderScrollEffect();
});

// Tab Navigation System
function initTabNavigation() {
    // Desktop tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            switchTab(targetTab);
            
            // Update button states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Mobile tab buttons
    mobileTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            switchTab(targetTab);
            
            // Update mobile button states
            mobileTabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update desktop button states
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.tab === targetTab) {
                    btn.classList.add('active');
                }
            });
            
            // Close mobile menu
            closeMobileNav();
        });
    });

    // Handle buttons that switch to tabs (like hero buttons)
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-tab]') || e.target.closest('[data-tab]')) {
            const element = e.target.matches('[data-tab]') ? e.target : e.target.closest('[data-tab]');
            const targetTab = element.dataset.tab;
            
            if (targetTab) {
                e.preventDefault();
                switchTab(targetTab);
                
                // Update all button states
                updateTabButtonStates(targetTab);
            }
        }
    });
}

function switchTab(tabName) {
    // Hide all tab contents
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Show target tab content
    const targetContent = document.getElementById(tabName);
    if (targetContent) {
        targetContent.classList.add('active');
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Trigger animations for the new tab
        triggerTabAnimations(targetContent);
    }
}

function updateTabButtonStates(activeTab) {
    // Update desktop buttons
    tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === activeTab);
    });
    
    // Update mobile buttons
    mobileTabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === activeTab);
    });
}

function triggerTabAnimations(tabElement) {
    // Add fade-in animation to cards and sections
    const animationTargets = tabElement.querySelectorAll(`
        .feature-card,
        .info-card,
        .schedule-card,
        .coach-card,
        .audience-item
    `);

    animationTargets.forEach((target, index) => {
        target.style.opacity = '0';
        target.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Mobile Navigation
function initMobileNavigation() {
    mobileToggle.addEventListener('click', function() {
        toggleMobileNav();
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMobileNav();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
}

function toggleMobileNav() {
    mobileToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileNav() {
    mobileToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', throttle(function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollY = currentScrollY;
    }, 16));
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Add staggered animation for grouped elements
                const siblings = entry.target.parentElement.children;
                let delay = 0;
                
                Array.from(siblings).forEach((sibling, index) => {
                    if (sibling === entry.target) {
                        setTimeout(() => {
                            sibling.style.opacity = '1';
                            sibling.style.transform = 'translateY(0)';
                        }, delay);
                    }
                    delay += 100;
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe animation targets
    const animationTargets = document.querySelectorAll(`
        .feature-card,
        .info-card,
        .schedule-card,
        .audience-item,
        .hero-image,
        .about-visual
    `);

    animationTargets.forEach(target => {
        target.style.opacity = '0';
        target.style.transform = 'translateY(30px)';
        target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(target);
    });
}

// Contact Form Management
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Real-time validation
    const requiredFields = contactForm.querySelectorAll('input[required], select[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });

        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required field check
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'この項目は必須です。';
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = '有効なメールアドレスを入力してください。';
        }
    }

    // Phone validation (optional)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = '有効な電話番号を入力してください。';
        }
    }

    toggleFieldError(field, isValid, errorMessage);
    return isValid;
}

function toggleFieldError(field, isValid, errorMessage) {
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }
}

function validateForm() {
    const requiredFields = contactForm.querySelectorAll('input[required], select[required]');
    let isFormValid = true;

    requiredFields.forEach(field => {
        const isFieldValid = validateField(field);
        if (!isFieldValid) {
            isFormValid = false;
        }
    });

    return isFormValid;
}

function submitForm() {
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Update button state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
    submitButton.disabled = true;

    // Collect selected sessions
    const selectedSessions = [];
    const sessionCheckboxes = contactForm.querySelectorAll('input[name="sessions"]:checked');
    sessionCheckboxes.forEach(checkbox => {
        selectedSessions.push(checkbox.value);
    });

    // Prepare form data
    const formDataObject = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        experience: formData.get('experience'),
        sessions: selectedSessions,
        practice: formData.get('practice') === 'yes',
        message: formData.get('message')
    };

    // Create email body
    const emailBody = createEmailBody(formDataObject);
    
    // Simulate form submission
    setTimeout(() => {
        showSuccessMessage(emailBody);
        resetForm();
        
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function createEmailBody(data) {
    let body = `ステップアップバドミントンクラブへの参加申し込み\n\n`;
    body += `お名前: ${data.name}\n`;
    body += `メールアドレス: ${data.email}\n`;
    
    if (data.phone) {
        body += `電話番号: ${data.phone}\n`;
    }
    
    if (data.experience) {
        const experienceMap = {
            'beginner': '初心者（ほとんど経験なし）',
            'elementary': '初級者（少し経験あり）',
            'returning': '経験者（ブランクあり）',
            'intermediate': '中級者'
        };
        body += `バドミントン経験: ${experienceMap[data.experience]}\n`;
    }
    
    if (data.sessions.length > 0) {
        body += `\n参加希望回:\n`;
        data.sessions.forEach(session => {
            const dateMap = {
                '2025-10-25': '第1回（10月25日）',
                '2025-11-29': '第2回（11月29日）',
                '2025-12-20': '第3回（12月20日）',
                '2025-01-25': '第4回（1月25日）'
            };
            body += `- ${dateMap[session]}\n`;
        });
    }
    
    if (data.practice) {
        body += `\nプラクティス: 参加希望\n`;
    }
    
    if (data.message) {
        body += `\nメッセージ・質問等:\n${data.message}\n`;
    }
    
    return body;
}

function showSuccessMessage(emailBody) {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-check-circle"></i> お申し込みありがとうございます！</h3>
            </div>
            <div class="modal-body">
                <p>以下の内容でお申し込みを受け付けました。</p>
                <p>確認のため、以下のメールアドレスにご連絡ください：</p>
                <p><strong><a href="mailto:subc202510@gmail.com?subject=バドミントン教室参加申込&body=${encodeURIComponent(emailBody)}">subc202510@gmail.com</a></strong></p>
                <p>※上記リンクをクリックすると、メールアプリが自動的に開きます。</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeSuccessModal()">
                    <i class="fas fa-times"></i> 閉じる
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 100);

    // Close modal when clicking overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeSuccessModal();
        }
    });
}

function closeSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function resetForm() {
    contactForm.reset();
    
    // Clear error messages and styles
    const errorMessages = contactForm.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const fields = contactForm.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.classList.remove('error', 'valid');
    });
}

// Utility Functions
function scrollToForm() {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
        // First switch to lessons tab if not already active
        switchTab('lessons');
        updateTabButtonStates('lessons');
        
        // Wait for tab switch animation, then scroll to form
        setTimeout(() => {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 300);
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Enhanced Interaction Effects
function initEnhancedEffects() {
    // Add parallax effect to hero elements
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 16));

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .info-card, .schedule-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Tab navigation with keyboard
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    switchTab('home');
                    updateTabButtonStates('home');
                    break;
                case '2':
                    e.preventDefault();
                    switchTab('about');
                    updateTabButtonStates('about');
                    break;
                case '3':
                    e.preventDefault();
                    switchTab('lessons');
                    updateTabButtonStates('lessons');
                    break;
            }
        }
        
        // Escape key to close mobile nav
        if (e.key === 'Escape') {
            closeMobileNav();
            closeSuccessModal();
        }
    });
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Show user-friendly error message for critical errors
    if (e.error && e.error.message.includes('fetch')) {
        showErrorMessage('接続エラーが発生しました。しばらく時間をおいてから再度お試しください。');
    }
});

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b9d;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initEnhancedEffects();
    initKeyboardNavigation();
    initPerformanceMonitoring();
});

// Make scrollToForm globally available
window.scrollToForm = scrollToForm;
window.closeSuccessModal = closeSuccessModal;