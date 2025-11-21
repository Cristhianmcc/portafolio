document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.querySelector('.contact-form');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    portfolioItems.forEach(item => {
        item.style.transition = 'all 0.3s ease';
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const topic = contactForm.querySelectorAll('input[type="text"]')[1].value;
            const message = contactForm.querySelector('textarea').value;
            
            // Mostrar mensaje de carga
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío con un pequeño delay
            setTimeout(() => {
                // Crear notificación de éxito
                const notification = document.createElement('div');
                notification.className = 'notification-success';
                notification.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <strong>¡Mensaje enviado exitosamente!</strong>
                        <p>Gracias ${name}, me pondré en contacto contigo pronto.</p>
                    </div>
                `;
                document.body.appendChild(notification);
                
                // Mostrar notificación con animación
                setTimeout(() => notification.classList.add('show'), 100);
                
                // Ocultar y eliminar notificación después de 5 segundos
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => notification.remove(), 300);
                }, 5000);
                
                // Resetear formulario
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                console.log('Mensaje enviado:', { name, email, topic, message });
            }, 1500);
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.service-card, .review-card, .portfolio-item, .stat-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 26, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(124, 58, 237, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    const socialLinks = document.querySelectorAll('.social-link, .footer-social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });

    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        const diffX = mouseX - followerX;
        const diffY = mouseY - followerY;
        
        followerX += diffX * 0.1;
        followerY += diffY * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    const clickableElements = document.querySelectorAll('a, button, .portfolio-item');
    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            width: 10px;
            height: 10px;
            background: #7c3aed;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.2s ease;
        }
        
        .cursor-follower {
            width: 40px;
            height: 40px;
            border: 2px solid rgba(124, 58, 237, 0.5);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});
