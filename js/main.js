/* ========================================
   MORINGA OLEÍFERA - JAVASCRIPT PRINCIPAL
   ======================================== */

// Aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MENU MOBILE
    // ========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // ========================================
    // SCROLL SUAVE
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Verificar se é um link interno (começa com #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Adicionar sombra ao header quando rolar
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // ACTIVE MENU LINK ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ========================================
    // FAQ ACCORDION
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fechar outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle item atual
            item.classList.toggle('active');
        });
    });

    // ========================================
    // ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animatedElements = document.querySelectorAll(`
        .benefit-card,
        .nutrient-card,
        .cert-card,
        .testimonial-card,
        .guarantee-item,
        .pricing-card,
        .contact-card,
        .faq-item
    `);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // ========================================
    // CONTADOR DE AVALIAÇÕES ANIMADO
    // ========================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const isDecimal = target.toString().includes('.');

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString('pt-BR');
                clearInterval(timer);
            } else {
                element.textContent = isDecimal 
                    ? start.toFixed(1) 
                    : Math.floor(start).toLocaleString('pt-BR');
            }
        }, 16);
    }

    // Observar seção de depoimentos
    const testimonialsSection = document.querySelector('.testimonials-summary');
    
    if (testimonialsSection) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const summaryNumbers = entry.target.querySelectorAll('.summary-number');
                    
                    summaryNumbers.forEach((number, index) => {
                        const text = number.textContent.trim();
                        let target;
                        
                        if (text.includes('.')) {
                            target = parseFloat(text);
                        } else if (text.includes('%')) {
                            target = parseInt(text);
                        } else {
                            target = parseInt(text.replace(/\./g, ''));
                        }
                        
                        setTimeout(() => {
                            animateCounter(number, target);
                        }, index * 200);
                    });
                    
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(testimonialsSection);
    }

    // ========================================
    // BOTÕES DE COMPRA - ADICIONAR ANALYTICS
    // ========================================
    const buyButtons = document.querySelectorAll('a[href*="comprar"], a[href*="wa.me"]');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Aqui você pode adicionar tracking do Google Analytics, Facebook Pixel, etc.
            const buttonText = this.textContent.trim();
            console.log('Botão clicado:', buttonText);
            
            // Exemplo de envio para Google Analytics (descomente se tiver GA configurado)
            // if (typeof gtag !== 'undefined') {
            //     gtag('event', 'click', {
            //         'event_category': 'Button',
            //         'event_label': buttonText
            //     });
            // }
        });
    });

    // ========================================
    // TOOLTIP PARA BADGES E CERTIFICAÇÕES
    // ========================================
    const badges = document.querySelectorAll('.badge-item, .cert-card');
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ========================================
    // LAZY LOADING DE IMAGENS
    // ========================================
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Adicionar classe quando a imagem estiver carregada
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });

    // ========================================
    // SCROLL TO TOP BUTTON (OPCIONAL)
    // ========================================
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    document.body.appendChild(scrollToTopBtn);

    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll suave ao topo
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });

    // ========================================
    // FORMULÁRIO DE CONTATO (SE HOUVER)
    // ========================================
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Aqui você pode adicionar o envio do formulário
                console.log('Formulário válido - enviar dados');
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });

    // ========================================
    // PREVENÇÃO DE COMPORTAMENTO PADRÃO EM LINKS VAZIOS
    // ========================================
    const emptyLinks = document.querySelectorAll('a[href="#"]');
    
    emptyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });

    // ========================================
    // ACESSIBILIDADE - FOCO EM ELEMENTOS
    // ========================================
    document.addEventListener('keydown', function(e) {
        // ESC para fechar menu mobile
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // ========================================
    // CONSOLE LOG - INFORMAÇÕES DO SITE
    // ========================================
    console.log('%c🌿 Moringa Oleífera em Cápsulas', 'color: #2d7a3e; font-size: 20px; font-weight: bold;');
    console.log('%cSite desenvolvido com foco em conversão e experiência do usuário', 'color: #5fba7d; font-size: 12px;');
    console.log('%c✨ Recursos carregados com sucesso!', 'color: #7ed957; font-size: 12px;');

    // ========================================
    // PERFORMANCE MONITORING
    // ========================================
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Tempo de carregamento da página: ${(pageLoadTime / 1000).toFixed(2)}s`);
        }
    });
});

// ========================================
// FUNÇÕES GLOBAIS AUXILIARES
// ========================================

// Função para validar e-mail
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para validar telefone brasileiro
function validatePhone(phone) {
    const re = /^(\+55\s?)?(\(?\d{2}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/;
    return re.test(phone);
}

// Função para formatar preço
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// Função para detectar dispositivo mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Log se for dispositivo mobile
if (isMobile()) {
    console.log('📱 Dispositivo mobile detectado');
} else {
    console.log('💻 Dispositivo desktop detectado');
}
