document.addEventListener("scroll", onScroll);
var blocks = document.querySelectorAll("#home, #services, #portfolio, #about, #contact");
var headerHeight = document.querySelector(".header").offsetHeight;

function onScroll(event) {
  const curPos = window.scrollY;
  blocks.forEach((element) => {
    if (element.offsetTop <= curPos + headerHeight + 1 && element.offsetTop + element.offsetHeight > curPos) {
      document.querySelectorAll(".navmenu-item-link-selected").forEach((menuItem) => menuItem.classList.remove("navmenu-item-link-selected"));
      document.querySelectorAll(`a[href="#${element.getAttribute("id")}"]`).forEach((menuItem) => menuItem.classList.add("navmenu-item-link-selected"));
    }
  });
}

document.querySelector(".burger-menu-icon").addEventListener("click", onBurgerMenuIconClick);
document.querySelector(".burger-menu-background").addEventListener("click", onBurgerMenuHideRequest);
document.querySelector(".burger-menu > .header-text").addEventListener("click", onBurgerMenuHideRequest);
document.querySelectorAll(".navmenu-item-burger > .navmenu-item-link").forEach((menuItem) => menuItem.addEventListener("click", onBurgerMenuHideRequest));
window.addEventListener("resize", onBurgerMenuHideRequest);

function onBurgerMenuHideRequest() {
  document.querySelector(".burger-menu-icon").style.transform = "rotate(0deg)";
  document.querySelector(".burger-menu-background").style.display = "none";
  document.querySelector(".burger-menu").style.left = `-${window.getComputedStyle(document.querySelector(".burger-menu")).width}`;
}

function onBurgerMenuIconClick(event) {
  if (event.target.style.transform === "rotate(90deg)") {
    onBurgerMenuHideRequest();
  } else {
    event.target.style.transform = "rotate(90deg)";
    document.querySelector(".burger-menu-background").style.display = "block";
    document.querySelector(".burger-menu").style.left = "0px";
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

var portfolioContent = document.querySelectorAll(".portfolio-img-item");
var portfolioButtons = document.querySelectorAll(".portfolio-menu-item:not(.portfolio-menu-item-selected)");

portfolioButtons.forEach((element) => {
  element.addEventListener("click", onPortfolioClick);
});

function onPortfolioClick(event) {
  document.querySelector(".portfolio-menu-item-selected").classList.remove("portfolio-menu-item-selected");
  let currentOption = document.querySelector(".portfolio-menu-item:hover");
  currentOption.classList.add("portfolio-menu-item-selected");
  portfolioButtons = document.querySelectorAll(".portfolio-menu-item:not(.portfolio-menu-item-selected)");
  portfolioButtons.forEach((element) => {
    element.addEventListener("click", onPortfolioClick);
  });
  document.querySelector(".portfolio-img-container").innerHTML = "";
  portfolioContent.forEach((element) => {
    if (currentOption.getAttribute("data-type") === "all" || element.getAttribute("data-type") === currentOption.getAttribute("data-type")) {
      document.querySelector(".portfolio-img-container").append(element);
    }
  });
}
