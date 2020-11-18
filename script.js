document.addEventListener("scroll", onScroll);
var blocks = document.querySelectorAll(
  "#home, #services, #portfolio, #about, #contact"
);
var headerHeight = document.querySelector(".header").offsetHeight;

function onScroll(event) {
  const curPos = window.scrollY;
  blocks.forEach((element) => {
    if (
      element.offsetTop <= curPos + headerHeight + 1 &&
      element.offsetTop + element.offsetHeight > curPos
    ) {
      document
        .querySelector(".navmenu-item-link-selected")
        .classList.remove("navmenu-item-link-selected");
      document
        .querySelector(`a[href="#${element.getAttribute("id")}"]`)
        .classList.add("navmenu-item-link-selected");
    }
  });
}

var portfolioContent = document.querySelectorAll(".portfolio-img-item");
var portfolioButtons = document.querySelectorAll(
  ".portfolio-menu-item:not(.portfolio-menu-item-selected)"
);

portfolioButtons.forEach((element) => {
  element.addEventListener("click", onPortfolioClick);
});

function onPortfolioClick(event) {
  document
    .querySelector(".portfolio-menu-item-selected")
    .classList.remove("portfolio-menu-item-selected");
  let currentOption = document.querySelector(".portfolio-menu-item:hover");
  currentOption.classList.add("portfolio-menu-item-selected");
  portfolioButtons = document.querySelectorAll(
    ".portfolio-menu-item:not(.portfolio-menu-item-selected)"
  );
  portfolioButtons.forEach((element) => {
    element.addEventListener("click", onPortfolioClick);
  });
  document.querySelector(".portfolio-img-container").innerHTML = "";
  portfolioContent.forEach((element) => {
    if (
      currentOption.getAttribute("data-type") === "all" ||
      element.getAttribute("data-type") ===
        currentOption.getAttribute("data-type")
    ) {
      document.querySelector(".portfolio-img-container").append(element);
    }
  });
}
