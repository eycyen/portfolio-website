/**
 * =====================================
 * PORTFOLYO WEB SİTESİ - JAVASCRIPT
 * =====================================
 * Fonksiyonlar:
 * 1. Mobil Hamburger Menü
 * 2. Form Doğrulama
 * 3. Smooth Scroll
 * 4. Sayfa Yüklenme Animasyonu
 * =====================================
 */

// DOM yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', function() {
    initHamburgerMenu();
    initContactForm();
    initSmoothScroll();
    initPageTransition();
    initSkillBarsAnimation();
});

/* ==================== 1. HAMBURGER MENÜ ==================== */
/**
 * Mobil görünümde hamburger menüyü açıp kapatır
 */
function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (!hamburgerBtn || !navMenu) return;

    // Hamburger tıklama olayı
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Body scroll'unu kapat (menü açıkken)
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Menü linklerine tıklanınca menüyü kapat
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Ekran boyutu değiştiğinde menüyü sıfırla
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ==================== 2. FORM DOĞRULAMA ==================== */
/**
 * İletişim formunu doğrular ve gönderim işlemini yönetir
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    // Form elemanları
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = form.querySelector('.btn-submit');

    // Form gönderimi
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hataları temizle
        clearErrors();
        
        // Doğrulama
        let isValid = true;
        
        // Ad kontrolü
        if (!nameInput.value.trim()) {
            showError(nameInput, nameError, 'Lütfen adınızı girin.');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, nameError, 'Ad en az 2 karakter olmalıdır.');
            isValid = false;
        }
        
        // E-posta kontrolü
        if (!emailInput.value.trim()) {
            showError(emailInput, emailError, 'Lütfen e-posta adresinizi girin.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Geçerli bir e-posta adresi girin.');
            isValid = false;
        }
        
        // Mesaj kontrolü
        if (!messageInput.value.trim()) {
            showError(messageInput, messageError, 'Lütfen mesajınızı yazın.');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, messageError, 'Mesaj en az 10 karakter olmalıdır.');
            isValid = false;
        }
        
        // Form geçerliyse gönder
        if (isValid) {
            // Gönderim animasyonu
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simüle edilmiş gönderim (gerçek uygulamada API çağrısı yapılır)
            setTimeout(function() {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Başarı mesajını göster
                formSuccess.classList.add('show');
                
                // Formu sıfırla
                form.reset();
                
                // 5 saniye sonra başarı mesajını gizle
                setTimeout(function() {
                    formSuccess.classList.remove('show');
                }, 5000);
            }, 1500);
        }
    });

    // Input'larda hata durumunu kaldır (yazarken)
    [nameInput, emailInput, messageInput].forEach(function(input) {
        if (input) {
            input.addEventListener('input', function() {
                input.classList.remove('error');
                const errorSpan = input.nextElementSibling;
                if (errorSpan && errorSpan.classList.contains('form-error')) {
                    errorSpan.textContent = '';
                }
            });
        }
    });

    /**
     * Hata mesajını gösterir
     */
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }

    /**
     * Tüm hataları temizler
     */
    function clearErrors() {
        const inputs = form.querySelectorAll('.form-input');
        const errors = form.querySelectorAll('.form-error');
        
        inputs.forEach(function(input) {
            input.classList.remove('error');
        });
        
        errors.forEach(function(error) {
            error.textContent = '';
        });
    }

    /**
     * E-posta formatını doğrular
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

/* ==================== 3. SMOOTH SCROLL ==================== */
/**
 * Sayfa içi bağlantılar için yumuşak kaydırma
 */
function initSmoothScroll() {
    // Sayfa içi bağlantıları bul (# ile başlayanlar)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Sadece # değilse
            if (href !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                
                if (target) {
                    // Header yüksekliğini hesaba kat
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* ==================== 4. SAYFA GEÇİŞ ANİMASYONU ==================== */
/**
 * Sayfa yüklendiğinde fade-in animasyonu uygular
 */
function initPageTransition() {
    // Sayfa yüklendiğinde fade-in class'ı ekle
    document.body.classList.add('fade-in');
    
    // Sayfa içi linkler için geçiş efekti
    const pageLinks = document.querySelectorAll('a[href$=".html"]');
    
    pageLinks.forEach(function(link) {
        // Sadece aynı site içi linkler için
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // # içeren linkler için geçiş yapma
                if (!href.includes('#')) {
                    e.preventDefault();
                    
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(function() {
                        window.location.href = href;
                    }, 300);
                }
            });
        }
    });
}

/* ==================== 5. YETENEK ÇUBUKLARI ANİMASYONU ==================== */
/**
 * Skill barlarının görünüm alanına girdiğinde animasyon başlatır
 */
function initSkillBarsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) return;

    // Intersection Observer oluştur
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Element görünüm alanında, animasyonu başlat
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Önce sıfırla
                progressBar.style.width = '0%';
                
                // Kısa bir gecikme ile hedef genişliğe animasyonla geç
                setTimeout(function() {
                    progressBar.style.width = width;
                }, 100);
                
                // Bu element için gözlemlemeyi durdur
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5 // %50 görünür olduğunda tetikle
    });

    // Her skill bar'ı gözlemle
    skillBars.forEach(function(bar) {
        observer.observe(bar);
    });
}

/* ==================== 6. SCROLL OLAYINDA HEADER STİLİ ==================== */
/**
 * Sayfa kaydırıldığında header'a özel stil uygular
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 22, 40, 0.98)';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 22, 40, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
});

/* ==================== 7. PROJE KARTLARI HOVER EFEKTİ ==================== */
/**
 * Proje kartlarına ekstra hover efekti ekler (opsiyonel)
 */
document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/* ==================== 8. KLAVYE ERİŞİLEBİLİRLİĞİ ==================== */
/**
 * Klavye navigasyonu için Escape tuşu desteği
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Mobil menüyü kapat
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburgerBtn && navMenu) {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});
