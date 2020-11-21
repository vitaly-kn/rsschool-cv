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
window.addEventListener("resize", onBurgerMenuHideRequest);

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

var sliderArrows = document.querySelectorAll(".slider-arrow");
sliderArrows.forEach((element) => {
  element.addEventListener("click", onArrowClick);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function onArrowClick(event) {
  let element;
  switch (event.target.getAttribute("alt")) {
    case "left":
      element = document.querySelectorAll(".slide")[0];
      document.querySelectorAll(".slide")[0].style.left = "-1021px";
      document.querySelectorAll(".slide")[0].style.minWidth = "0px";
      await sleep(500);
      document.querySelector(".slider").style.backgroundColor = window.getComputedStyle(document.querySelectorAll(".slide")[1]).backgroundColor;
      document.querySelectorAll(".slide")[0].remove();
      element.style.minWidth = "100%";
      element.style.left = "";
      document.querySelector(".slider-container").append(element);
      break;
    case "right":
      element = document.querySelectorAll(".slide")[document.querySelectorAll(".slide").length - 1];
      document.querySelectorAll(".slide")[document.querySelectorAll(".slide").length - 1].remove();
      element.style.left = "-1021px";
      element.style.minWidth = "0px";
      document.querySelector(".slider-container").prepend(element);
      document.querySelectorAll(".slide")[0].style.left = "";
      document.querySelectorAll(".slide")[0].style.minWidth = window.getComputedStyle(document.querySelector(".slider-container")).width;
      await sleep(500);
      document.querySelectorAll(".slide")[0].style.minWidth = "100%";
      document.querySelector(".slider").style.backgroundColor = window.getComputedStyle(document.querySelectorAll(".slide")[0]).backgroundColor;
  }
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
        /*element.classList.remove("invisible");
      } else {
        element.classList.add("invisible");*/
      }
    });
  }
}
