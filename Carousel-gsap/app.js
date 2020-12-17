const numberOfSlides = document.querySelector(".carousel__slides").children
  .length;
console.log(numberOfSlides);
const arrowLeft = document.querySelector(".slide__arrow--left");
const arrowRight = document.querySelector(".slide__arrow--right");
let index = 0;
let isTransforming = false;

const transformNextSlide = (slide) => {
  if (slide.classList.contains("hidden")) {
    slide.classList.remove("hidden");
  }
  slide.classList.add("show");
  gsap.fromTo(
    slide,
    { x: 1000, duration: 0 },
    { x: 0, duration: 1, ease: "Expo.easeInOut" }
  );
};

const transformPrevSlide = (slide) => {
  if (slide.classList.contains("hidden")) {
    slide.classList.remove("hidden");
  }
  slide.classList.add("show");
  gsap.fromTo(
    slide,
    { x: -1000, duration: 0 },
    { x: 0, duration: 1, ease: "Expo.easeInOut" }
  );
};

const removeEffectsAndClass = (slide, nextSlide) => {
  slide.classList.add("hidden");
  nextSlide.classList.add("slide__active");
  slide.classList.remove("slide__active");
  slide.classList.remove("show");
  isTransforming = false;
  arrowRight.style.userSelect = "all";
  arrowLeft.style.userSelect = "all";
};

const transformToLeft = () => {
  const activeSlide = document.querySelector(".slide__active");
  let prevSlide = activeSlide.previousElementSibling;
  if (!prevSlide) {
    prevSlide = document.querySelectorAll(".slide")[4];
  }

  if (prevSlide && !isTransforming) {
    transformPrevSlide(prevSlide);
    isTransforming = true;
    arrowLeft.style.userSelect = "none";
    setTimeout(() => {
      removeEffectsAndClass(activeSlide, prevSlide);
    }, 1000);
  }
};

const transformToRight = () => {
  const activeSlide = document.querySelector(".slide__active");
  let nextSlide = activeSlide.nextElementSibling;
  if (!nextSlide) {
    nextSlide = document.querySelectorAll(".slide")[0];
  }

  if (nextSlide && !isTransforming) {
    transformNextSlide(nextSlide);
    isTransforming = true;
    arrowRight.style.userSelect = "none";
    setTimeout(() => {
      removeEffectsAndClass(activeSlide, nextSlide);
    }, 1000);
  }
};

arrowLeft.addEventListener("click", transformToLeft);
arrowRight.addEventListener("click", transformToRight);
