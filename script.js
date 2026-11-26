document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Обробка звичайної форми консультації
    const form = document.querySelector('.quote-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Дякуємо! Ваша заявка прийнята. Ми зв\'яжемося з вами найближчим часом.');
            form.reset();
        });
    }

    // 2. Робота з модальним вікном (Попап)
    const modal = document.getElementById('contactModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const openModalBtns = document.querySelectorAll('.open-modal-btn'); 
    const closeBtn = document.querySelector('.close-btn');
    const modalForm = document.getElementById('modalForm');

    if(openModalBtn) {
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });
    });

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    if(modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Дякуємо! Ми зателефонуємо вам найближчим часом.');
            modalForm.reset();
            modal.classList.remove('show');
        });
    }

    // 3. Підсвічування активного пункту меню при прокрутці (Scroll Spy)
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 4. Карусель товарів
    const track = document.getElementById('productsTrack');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        const getScrollAmount = () => {
            const card = track.querySelector('.product-card');
            if (!card) return 0;
            const style = window.getComputedStyle(track);
            const gap = parseInt(style.gap) || 20; 
            return card.offsetWidth + gap;
        };

        nextBtn.addEventListener('click', () => {
            const cardWidth = getScrollAmount();
            const maxScroll = track.scrollWidth - track.clientWidth;
            
            if (currentIndex * cardWidth < maxScroll) {
                currentIndex++;
                if (currentIndex * cardWidth > maxScroll) {
                    track.style.transform = `translateX(-${maxScroll}px)`;
                } else {
                    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                }
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                const cardWidth = getScrollAmount();
                track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            }
        });
    }
});