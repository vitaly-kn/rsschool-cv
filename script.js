document.addEventListener("scroll", onScroll);
var blocks = document.querySelectorAll("#home, #services, #portfolio, #about, #contact");

function onScroll(event) {
  const curPos = window.scrollY;
  const headerHeight = document.querySelector(".header").offsetHeight;
  blocks.forEach((element) => {
    if (element.offsetTop <= curPos + headerHeight + 1 && element.offsetTop + element.offsetHeight > curPos) {
      document.querySelectorAll(".navmenu-item-link-selected").forEach((menuItem) => menuItem.classList.remove("navmenu-item-link-selected"));
      document.querySelectorAll(`a[href="#${element.getAttribute("id")}"]`).forEach((menuItem) => menuItem.classList.add("navmenu-item-link-selected"));
    }
  });
}

const burgerMenu = document.querySelector(".burger-menu");
const burgerMenuIcon = document.querySelector(".burger-menu-icon");
const burgerMenuBackground = document.querySelector(".burger-menu-background");

burgerMenuIcon.addEventListener("click", onBurgerMenuIconClick);
burgerMenuBackground.addEventListener("click", onBurgerMenuHideRequest);
document.querySelector(".burger-menu > .logo").addEventListener("click", onBurgerMenuHideRequest);
document.querySelectorAll(".navmenu-item-burger > .navmenu-item-link").forEach((menuItem) => menuItem.addEventListener("click", onBurgerMenuHideRequest));
window.addEventListener("resize", onResizeWindow);

function onBurgerMenuHideRequest() {
  burgerMenuIcon.classList.remove("rotated");
  burgerMenuBackground.classList.add("invisible");
  burgerMenu.classList.add("hidden");
}

function onBurgerMenuIconClick(event) {
  if (burgerMenuIcon.classList.contains("rotated")) {
    onBurgerMenuHideRequest();
  } else {
    burgerMenuIcon.classList.add("rotated");
    burgerMenuBackground.classList.remove("invisible");
    burgerMenu.classList.remove("hidden");
  }
}

const sliderParams = {
  sliderClass: ".slider",
  sliderContentClass: ".slider-container",
  sliderContentListClass: ".slides-list",
  slideClass: ".slide",
  sliderArrowClass: ".slider-arrow",
};
const slides = document.querySelectorAll(sliderParams.slideClass);
const arrows = document.querySelectorAll(sliderParams.sliderArrowClass);
const slider = document.querySelector(sliderParams.sliderClass);
const sliderContentList = document.querySelector(sliderParams.sliderContentListClass);
const sliderContent = document.querySelector(sliderParams.sliderContentClass);

var sliderWidth = sliderContent.offsetWidth;
arrows.forEach((arrow) => arrow.addEventListener("click", moveSlide));

var [currentSlide, nextSlide] = [0, 1];

var direction;

slides.forEach((element, index) => {
  element.style.width = sliderWidth + "px";
});

slides[currentSlide].style.left = "0px";
slides[nextSlide].style.left = sliderWidth + "px";

function moveSlide(event) {
  const arrow = event.target;
  direction = +arrow.getAttribute("data-direction");
  let next = sliderContentList.removeChild(slides[nextSlide]);
  sliderWidth = sliderContent.offsetWidth;
  next.style.left = direction * sliderWidth + "px";
  slides[currentSlide].style.left = -1 * direction * sliderWidth + "px";
  setTimeout(() => {
    next.style.left = "0px";
  });
  sliderContentList.appendChild(next);
  [currentSlide, nextSlide] = [nextSlide, currentSlide];
}

function onResizeWindow() {
  onBurgerMenuHideRequest;
  sliderWidth = sliderContent.offsetWidth;
  slides.forEach((element, index) => {
    element.style.width = `${sliderWidth}px`;
  });
  slides[nextSlide].style.left = `${sliderWidth}px`;
}

const portfolioImageContainer = document.querySelector(".portfolio-img-container");
const portfolioContent = document.querySelectorAll(".portfolio-img-item");
const portfolioButtons = document.querySelectorAll(".portfolio-menu-item");

portfolioButtons.forEach((element) => {
  element.addEventListener("click", onPortfolioClick);
});

function onPortfolioClick(event) {
  if (!event.target.classList.contains("portfolio-menu-item-selected")) {
    document.querySelector(".portfolio-menu-item-selected").classList.remove("portfolio-menu-item-selected");
    event.target.classList.add("portfolio-menu-item-selected");
    portfolioImageContainer.innerHTML = "";
    portfolioContent.forEach((element) => {
      if (event.target.getAttribute("data-type") === "all" || element.getAttribute("data-type") === event.target.getAttribute("data-type")) {
        portfolioImageContainer.append(element);
      }
    });
  }
}
