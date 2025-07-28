const slides = document.querySelectorAll(".carousel-slide img");
const slideContainer = document.querySelector(".carousel-slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;
let totalSlides = slides.length;
let slideWidth = slides[0].clientWidth;
let interval = null;

function goToSlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  slideContainer.style.transform = `translateX(-${index * slideWidth}px)`;
  currentIndex = index;
  updateDots();
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    let index = parseInt(dot.getAttribute("data-index"));
    goToSlide(index);
  });
});

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Auto-advance every 5 seconds
function startAutoSlide() {
  interval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
  clearInterval(interval);
}

slideContainer.addEventListener("mouseenter", stopAutoSlide);
slideContainer.addEventListener("mouseleave", startAutoSlide);

goToSlide(0); 
startAutoSlide();
