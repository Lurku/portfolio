// First Page Typing Animation

const textDisplay = document.getElementById('intrest')
const phrases = ['Full Stack Developer.', 'Autodidactic.', 'Tech Enthusiast.', 'Team Player.', 'Solution provider.', 'Eighteen.', 'Indian.']
let i = 0
let j = 0
let currentPhrase = []
let isDeleting = false


let blinking_text = document.getElementById('cursor');

function loop() {
    isEnd = false
    textDisplay.innerHTML = currentPhrase.join('')
    if (i < phrases.length) {


        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j])
            j++
            textDisplay.innerHTML = currentPhrase.join('')
        }

        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop(phrases[i][j])
            j--
            textDisplay.innerHTML = currentPhrase.join('')
        }

        if (j == phrases[i].length) {

            isDeleting = true
            isEnd = true
        }

        if (isDeleting && j === 0) {
            currentPhrase = []
            isDeleting = false
            i++

            
            if (i == phrases.length) {
                i = 0
            }
        }
    }
    const spedUp = Math.random() * (80 - 50) + 50
    const normalSpeed = Math.random() * (280 - 250) + 150
    const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed
    setTimeout(loop, time)
}

loop()


const carousel = document.querySelector('.carousel');
let items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

let currentIndex = 2; // Start with the third item focused
let isTransitioning = false;

// Clone items for infinite scrolling
const firstClone = items[0].cloneNode(true);
const lastClone = items[totalItems - 1].cloneNode(true);

carousel.appendChild(firstClone); // Clone first item to the end
carousel.insertBefore(lastClone, items[0]); // Clone last item to the beginning

// Update items after cloning
items = document.querySelectorAll('.carousel-item');

function updateCarousel() {
    if (isTransitioning) return;

    isTransitioning = true;
    items.forEach((item, index) => {
        item.classList.remove('focused');
        if (index === currentIndex) {
            item.classList.add('focused');
        }
    });

    const offset = -currentIndex * (items[0].offsetWidth + 20); // 20 is the gap
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(${offset}px)`;

    // Handle seamless looping
    setTimeout(() => {
        if (currentIndex === 0) {
            carousel.style.transition = 'none'; // Remove animation for seamless jump
            currentIndex = totalItems;
            const offset = -currentIndex * (items[0].offsetWidth + 20);
            carousel.style.transform = `translateX(${offset}px)`;
        } else if (currentIndex === items.length - 1) {
            carousel.style.transition = 'none';
            currentIndex = 1;
            const offset = -currentIndex * (items[0].offsetWidth + 20);
            carousel.style.transform = `translateX(${offset}px)`;
        }
        isTransitioning = false;
    }, 500);
}

// Auto-cycle through items
setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}, 3000);

// Initial setup
currentIndex = 1; // Adjust index for cloning
carousel.style.transform = `translateX(-${currentIndex * (items[0].offsetWidth + 20)}px)`;

// Center first image on load
window.addEventListener('load', () => {
    centerFirstImage();
    updateActiveImage();
});

function centerFirstImage() {
    const carousel = document.querySelector('.carousel');
    const firstBox = document.querySelector('.box');
    if (!carousel || !firstBox) return;

    const offset = (carousel.offsetWidth - firstBox.offsetWidth) / 2;
    carousel.scrollTo({
        left: offset,
        behavior: 'smooth'
    });
}

function scrollCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const scrollAmount = 200;
    carousel.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });

    setTimeout(updateActiveImage, 300);
}

function updateActiveImage() {
    const carousel = document.querySelector('.carousel');
    const boxes = document.querySelectorAll('.box');
    const center = carousel.getBoundingClientRect().left + carousel.offsetWidth / 2;

    let closestBox = null;
    let minDistance = Infinity;

    boxes.forEach((box) => {
        const boxCenter = box.getBoundingClientRect().left + box.offsetWidth / 2;
        const distance = Math.abs(center - boxCenter);
        if (distance < minDistance) {
            minDistance = distance;
            closestBox = box;
        }
    });

    boxes.forEach((box) => box.classList.remove('active'));
    if (closestBox) closestBox.classList.add('active');
}
