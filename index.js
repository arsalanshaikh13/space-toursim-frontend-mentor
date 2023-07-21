const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".primary-navigation");

//  menu/hamburger button clicked
navToggle.addEventListener("click", () => {
  //   primaryNav.classList.toggle("open");
  //   navToggle.classList.toggle("open");
  // if nav is closed, open it
  const visibility = nav.getAttribute("data-visible");
  // HTML attributes always returns string values instead of boolean or any other types like int
  if (visibility === "false") {
    nav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", "true");
  } else {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", "false");
  }
  //   console.log(visibility, navToggle.getAttribute("aria-expanded"));
  // if  nav is open, close it

  // check close svg is on background
});
