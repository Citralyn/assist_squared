document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(track.children);
    const leftButton = document.querySelector('.nav-arrow.left');
    const rightButton = document.querySelector('.nav-arrow.right');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.className = 'card';
            let newIndex = (index - currentIndex + cards.length) % cards.length;
            if (newIndex === 0) card.classList.add('center');
            else if (newIndex === 1) card.classList.add('right-1');
            else if (newIndex === 2) card.classList.add('right-2');
            else if (newIndex === cards.length - 2) card.classList.add('left-2');
            else if (newIndex === cards.length - 1) card.classList.add('left-1');
        });

        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function moveLeft() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    function moveRight() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    function moveTo(index) {
        currentIndex = index;
        updateCarousel();
    }

    leftButton.addEventListener('click', moveLeft);
    rightButton.addEventListener('click', moveRight);

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => moveTo(index));
    });

    // Initialize the carousel
    updateCarousel();
});