// select the elements
const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".primary-navigation");

//add event listener to listen for the events when the menu hamburger is clicked
navToggle.addEventListener("click", () => {
  // get the attribute status to check in the condition
  const visibility = nav.getAttribute("data-visible");
  // if navbar is open, close it
  if (visibility === "true") {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  } else {
    nav.setAttribute("data-visible", "true");
    navToggle.setAttribute("aria-expanded", "true");
  }

  // if navbar is close, open it
});

// need to find if the page is open/loaded
// this code won't work because when nav-link is pressed the whole page loads even if it is same page
// const navLink = document.querySelector(".nav-link");
// navLink.addEventListener("click", () => {
//   const ariaPressed = navLink.getAttribute("aria-pressed");
//   if (ariaPressed === "true") {
//     navLink.setAttribute("aria-pressed", false);
//   } else {
//     navLink.setAttribute("aria-pressed", true);
//   }
// });
