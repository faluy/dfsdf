// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка к якорям
    document.querySelectorAll('nav a, .hero .btn').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню если оно открыто
                const nav = document.querySelector('nav ul');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Обработка формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Валидация формы
            if (!name || !phone) {
                alert('Пожалуйста, заполните обязательные поля: имя и телефон');
                return;
            }
            
            // В реальном приложении здесь был бы код для отправки данных на сервер
            alert(`Спасибо, ${name}! Ваша заявка на услугу "${getServiceName(service)}" принята. Мы свяжемся с вами по номеру ${phone} в ближайшее время.`);
            
            // Очистка формы
            this.reset();
        });
    }
    
    function getServiceName(serviceValue) {
        const services = {
            'dry': 'Сухая чистка ковров',
            'wet': 'Влажная химчистка',
            'stain': 'Удаление сложных пятен',
            'antibac': 'Антибактериальная обработка',
            'carpet': 'Чистка ковровых покрытий',
            'protection': 'Защитная пропитка ковров'
        };
        
        return services[serviceValue] || 'Услуга';
    }
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками услуг и преимуществ
    document.querySelectorAll('.service-card, .advantage, .step').forEach(el => {
        observer.observe(el);
    });
    
    // Подсветка активного пункта меню при скролле
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    function highlightMenu() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightMenu);
    
    // Анимация для кнопки "Заказать чистку"
    const orderBtn = document.querySelector('.hero .btn');
    if (orderBtn) {
        orderBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        orderBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    // Динамическое обновление года в футере
    const yearElement = document.querySelector('.copyright p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
    
    // Добавляем маску для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 1) {
                    value = '+7 (' + value;
                } else if (value.length <= 4) {
                    value = '+7 (' + value.substring(1, 4);
                } else if (value.length <= 7) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7);
                } else if (value.length <= 9) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9);
                } else {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Показ/скрытие дополнительной информации при клике на услуги
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
    
    // Анимация для фигур на фоне
    function animateShapes() {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.animation = `float ${speed}s ease-in-out infinite alternate`;
        });
    }
    
    // Добавляем CSS для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-20px) rotate(5deg); }
        }
        
        nav a.active {
            color: var(--primary) !important;
            font-weight: bold;
        }
        
        nav a.active::after {
            width: 100% !important;
        }
        
        .service-card.expanded {
            transform: scale(1.02) !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
        
        @media (max-width: 768px) {
            nav ul {
                display: none;
            }
            
            nav ul.active {
                display: flex !important;
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Запускаем анимацию фигур
    animateShapes();
    
    // Обработка загрузки изображений
    document.querySelectorAll('.service-img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(135deg, var(--primary-light), var(--accent))';
            this.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 24px;">🧼</div>';
        });
    });
    
    console.log('Сайт "Чистый ковер!" успешно загружен!');
});