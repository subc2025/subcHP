// ステップアップバドミントンクラブ - JavaScript

// DOM要素の取得
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // アニメーションの初期化
    initScrollAnimations();
    
    // ナビゲーションの初期化
    initNavigation();
    
    // フォームの初期化
    initContactForm();
    
    // ヘッダーのスクロール効果
    initHeaderScrollEffect();
    
    // スムーススクロールの初期化
    initSmoothScroll();
});

// モバイルナビゲーション
function initNavigation() {
    // ハンバーガーメニューのトグル
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // ボディのスクロールをロック/アンロック
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // ナビゲーションリンクのクリック処理
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // モバイルメニューを閉じる
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // アクティブなリンクの設定
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 画面サイズ変更時の処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// スムーススクロール
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 内部リンクかチェック
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ボタンのスムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target && href !== '#') {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ヘッダーのスクロール効果
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // スクロール量に応じてヘッダーの透明度を調整
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // アクティブなナビゲーションリンクの設定
        updateActiveNavLink();
        
        lastScrollY = currentScrollY;
    });
}

// アクティブなナビゲーションリンクの更新
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// スクロールアニメーション
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を観察
    const animationTargets = document.querySelectorAll(`
        .feature-card,
        .lesson-info-card,
        .schedule-item,
        .coach-card,
        .about-text,
        .contact-form-container
    `);

    animationTargets.forEach(target => {
        observer.observe(target);
    });
}

// お問い合わせフォーム
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームの検証
        if (validateForm()) {
            submitForm();
        }
    });

    // リアルタイムバリデーション
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

// フォームフィールドの検証
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // 必須チェック
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'この項目は必須です。';
    }

    // メールアドレスの形式チェック
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = '有効なメールアドレスを入力してください。';
        }
    }

    // 電話番号の形式チェック（任意）
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = '有効な電話番号を入力してください。';
        }
    }

    // エラー表示の切り替え
    toggleFieldError(field, isValid, errorMessage);

    return isValid;
}

// フィールドエラー表示の切り替え
function toggleFieldError(field, isValid, errorMessage) {
    // 既存のエラーメッセージを削除
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
        
        // エラーメッセージを追加
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }
}

// フォーム全体の検証
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

// フォーム送信処理
function submitForm() {
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // ボタンの状態を変更
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
    submitButton.disabled = true;

    // 選択されたセッションの取得
    const selectedSessions = [];
    const sessionCheckboxes = contactForm.querySelectorAll('input[name="sessions"]:checked');
    sessionCheckboxes.forEach(checkbox => {
        selectedSessions.push(checkbox.value);
    });

    // フォームデータの整理
    const formDataObject = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        experience: formData.get('experience'),
        sessions: selectedSessions,
        practice: formData.get('practice') === 'yes',
        message: formData.get('message')
    };

    // メール本文の作成
    const emailBody = createEmailBody(formDataObject);
    
    // メール送信（実際の実装では、バックエンドAPIを呼び出す）
    setTimeout(() => {
        // シミュレーション: 成功レスポンス
        showSuccessMessage(emailBody);
        resetForm();
        
        // ボタンの状態を元に戻す
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// メール本文の作成
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

// 成功メッセージの表示
function showSuccessMessage(emailBody) {
    // モーダルまたは通知の表示
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
        <div class="modal-overlay" onclick="closeSuccessModal()"></div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // アニメーション
    setTimeout(() => {
        modal.classList.add('active');
    }, 100);
}

// 成功モーダルを閉じる
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

// フォームのリセット
function resetForm() {
    contactForm.reset();
    
    // エラーメッセージとスタイルをクリア
    const errorMessages = contactForm.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const fields = contactForm.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.classList.remove('error', 'valid');
    });
}

// ユーティリティ関数
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

// パフォーマンス最適化
window.addEventListener('scroll', throttle(function() {
    // スクロール時の処理をスロットル
}, 16)); // 約60fps

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ページの表示状態の監視
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // ページが再表示された時の処理
    }
});

// CSS for success modal (動的に追加)
const modalStyles = `
.success-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.success-modal.active {
    opacity: 1;
    visibility: visible;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.success-modal.active .modal-content {
    transform: scale(1);
}

.modal-header {
    text-align: center;
    margin-bottom: 1.5rem;
}

.modal-header h3 {
    color: var(--primary-color);
    font-size: 1.5rem;
}

.modal-header i {
    color: var(--primary-color);
    margin-right: 0.5rem;
}

.modal-body {
    text-align: center;
    margin-bottom: 1.5rem;
}

.modal-body p {
    margin-bottom: 1rem;
    color: var(--text-light);
}

.modal-body strong a {
    color: var(--primary-color);
    text-decoration: none;
}

.modal-body strong a:hover {
    text-decoration: underline;
}

.modal-footer {
    text-align: center;
}

.error-message {
    color: var(--secondary-color);
    font-size: 0.9rem;
    margin-top: 0.3rem;
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.form-group input.valid,
.form-group select.valid,
.form-group textarea.valid {
    border-color: var(--primary-color);
}
`;

// スタイルをページに追加
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);