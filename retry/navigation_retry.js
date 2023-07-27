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

const button = document.querySelector(".large-button");
const homeContent = document.querySelector(".home-content");
const picture = document.querySelector("picture");
const article = document.querySelector("article");
const slideRight = document.querySelector(".slide-right");
const slideLeft = document.querySelector(".slide-left");
// what i want to do is to select the specific components of individual page
// when that page loads the components for that specific page only fade in
// and javascript code only selects and adds .slide-in class to those specific page components only
// instead of always adding .slide-in class to every components for every page

window.addEventListener("load", (e) => {
  // button.style.animation = "slide-in 700ms ease forwards ";
  // homeContent.style.animation = "slide-in 400ms ease forwards";
  console.log(e, e.target, slideLeft, slideRight);
  const LocationPath = e.target.location.pathname;
  console.log(LocationPath);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  const regex = new RegExp("index_retry");
  console.log(regex.test(LocationPath));

  // testing location path using regular expressions
  if (regex.test(LocationPath)) {
    // button.classList.remove("slide-right");
    // homeContent.classList.remove("slide-left");
    // button.classList.add("slide_in");
    // homeContent.classList.add("slide_in");
    slideRemove(button, "slide-right");
    slideRemove(homeContent, "slide-left");
    slideAdd(button, "slide_in");
    slideAdd(homeContent, "slide_in");
    // slideLeft.classList.remove("slide-left");
    // slideRight.classList.remove("slide-right");
    // slideRight.classList.add("slide_in");

    // slideLeft.classList.add("slide_in");
  } else {
    //right now the slide_in class after being added persist due to which we can't see further animation when user navigates to different pages on the site and comes back on home page
    // trying to reset the slide-right nd slide left class on button and homecontent of the home page
    // in order to keep the animation effect intact when home page is loaded again by again removing slideright/slideleft class and addign back slidein class
    // button.classList.add("slide-right");
    // homeContent.classList.remove("slide-left");
    // slideAdd(button, "slide-right");
    // slideAdd(homeContent, "slide-left");
    // slideRemove(button, "slide_in");
    // slideRemove(homeContent, "slide_in");

    // adding animonation for destination and other pages as well
    // picture.classList.remove("slide-left");
    // article.classList.remove("slide-right");
    // picture.classList.add("slide_in");

    // article.classList.add("slide_in");
    // slideLeft.classList.remove("slide-left");
    // slideRight.classList.remove("slide-right");
    // slideRight.classList.add("slide_in");

    // slideLeft.classList.add("slide_in");
    console.log("slide ing");
  }

  // if (
  //   LocationPath.test(
  //     "/CS50p_project/project_aFinal/website/kevintutorial/space-tourism-FM/retry/index_retry.html"
  //   ) ===
  // ) {
  //   console.log("true");
  // }
});

function slideAdd(component, classSelector) {
  component.classList.add(classSelector);
}
function slideRemove(component, classSelector) {
  component.classList.add(classSelector);
}

// // trying to fade out the image and remove from the layout of the page
// // https://www.impressivewebs.com/animate-display-block-none/
// // https://codepen.io/arsalan13/pen/vYQVpvL
// const landscapeImg = document.querySelector(".landscape-image");
// window.onload = (e) => {
//   console.log(e, "onload");
//   // first fade out the existing landscape image with opacity going to 0 as mentioned in the animation style inside .zero_opacity class

//   landscapeImg.classList.add("zero_opacity");
//   //as the animtion of opacity fading out is 400ms so just as the image fades out in 400ms
//   // set the timeOut of 400ms that means after 400ms of window load javascript will add the class dNone which has display none style in it
//   // so the landscape img which got first fade out from .zero-opacity class now is removed from the layout of the page by the dNone class which has display none class style in it
//   // setTimeout(() => {
//   //   landscapeImg.classList.add("dNone");
//   // }, 400);

//   // instead of putting timer as above we can watch for fade out animation to end to apply display none class
//   landscapeImg.addEventListener("animationend", () => {
//     // setTimeout(() => {
//     //   landscapeImg.classList.add("dNone");
//     // }, 1);
//     landscapeImg.classList.add("dNone");
//   });
// };
