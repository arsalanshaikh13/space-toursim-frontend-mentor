// select the tablist wrapper
const tabList = document.querySelector("[role='tablist']");
// select all the elements with role tab
const tabs = document.querySelectorAll("[role='tab']");

// listen for keydown event on tablist wrapper
// change the focus of the tab when right or left key is pressed
tabList.addEventListener("keydown", changeTabFocus);

// tabs.forEach(function (tab) {
//   tab.addEventListener("click", function (e) {
//     console.log(e.key, e.target, e.keyCode, e, "sdfsdfsd");
//   });
// });
// tabs.forEach((tab) => {
//   tab.addEventListener("click", (e) => {
//     console.log(e, e.target, e.keyCode, e.key);

//   });
// });
tabs.forEach((tab) => {
  tab.addEventListener("click", selectTab);
});

function selectTab(e) {
  const targetTab = e.target;
  // const tabindex = targetTab.getAttribute("tabindex")
  console.log(e, targetTab);
  //   select the tablist element ie parent of all the tabs
  const tabContainer = targetTab.parentNode;
  //   select the main element the parent of tablist
  // through main element we can select the sibilings of tablist to manipulate content and the picuture through article and picture elements respectively
  // this solution of selectign parent and then through selecting different sibling we can use this solution in any different setting usecase as well making this function generally available to different use cases
  const MainContainer = tabContainer.parentNode;

  //   make the previosuly arai-selected true tab to false
  //   since the querySelector finds the first match and stops we need to just find the first element with aria-selected to true and set it to false because rest of the elements already have aria-selected=false on them
  // queryselectorall will match every element and store in nodelist where aria-selected =true
  document
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);
  targetTab.setAttribute("aria-selected", true);
  // console.log(document.querySelector('[tabindex="0"]'));
  // document.querySelector('[tabindex="0"]').setAttribute("tabindex", "-1");
  // set tabindex for all tabs to -1 to remove tabfocus from each tab
  // tabs.forEach((tab) => {
  //   tab.setAttribute("tabindex", -1);
  // });
  // // only set the tabindex for the selected to 0 to allow for tab key access
  // targetTab.setAttribute("tabindex", 0);
  const targetPanel = targetTab.getAttribute("aria-controls");

  // first set all the article elements having role tabpanel to hidden to hide all the panels
  // MainContainer.querySelectorAll('[role="tabpanel"]').forEach(function (panel) {
  //   panel.setAttribute("hidden", true);
  // });
  // // only make the selected panel visibile
  // MainContainer.querySelector(`#${targetPanel}`).removeAttribute("hidden");
  hideContent(MainContainer, '[role="tabpanel"]');
  showContent(MainContainer, `#${targetPanel}`);

  const targetImage = targetTab.getAttribute("data-image");
  // MainContainer.querySelectorAll("picture").forEach((picture) => {
  //   picture.setAttribute("hidden", true);
  // });
  // MainContainer.querySelector(`#${targetImage}`).removeAttribute("hidden");
  hideContent(MainContainer, "picture");
  showContent(MainContainer, `#${targetImage}`);
}

// absstracting away repeated code into a function
function hideContent(parent, content) {
  parent.querySelectorAll(content).forEach((item) => {
    // item.setAttribute("hidden", true);
    item.setAttribute("data-hidden", true);
  });
}
function showContent(parent, content) {
  // parent.querySelector(content).removeAttribute("hidden");
  parent.querySelector(content).setAttribute("data-hidden", false);
}
// tabList.addEventListener("click", (e) => {
//   console.log(e, e.target, e.keyCode, e.key);
// });
// set the counter for tabfocus to 0
// the tabfocus will be incremented/decremented on the keydown events
// let tabFocus = 0;
// since we are starting from the last tab ie titan tab of the tablist set the counter to highest values in tabs nodelist
let tabFocus = tabs.length - 1;
function changeTabFocus(e) {
  // function changes the focus of the tab when right or left key is pressed
  // define the keycode into variables
  const keyLeft = 37;
  const keyRight = 39;
  //   store the current element that e.target returns ie the element which is under focus right now when the key is pressed on it
  const targetTab = e.target;
  //   e is the event, e.keyCode gives code number for the specific key, e.target gives the element on which the key/pointer is pressed/clicked
  console.log(e.keyCode, e.target, e, "changetabfocus");
  // only proceed further if right or left key pressed
  if (e.keyCode === keyLeft || e.keyCode === keyRight) {
    // set the the previous tab to tabindex -1 to remove access of keyboard events on that tab without using foreach loop like below
    tabs[tabFocus].setAttribute("tabindex", -1);
    if (e.keyCode === keyLeft) {
      // only reduce tabfocus values if tabfocus is in the range from 1 to tabs.lenght values because tabs.length gives the total no of tabs in the tablist and we don't want to decrement to -ve value as well
      //   if tabFocus values is decrement to negative value it will throw error as element not defined because wecan't access a -ve index in the array

      // there are 2 approaches
      //1. we can take either decrement tabfocus value only when tabfocus value is in the range 0 to tabs.length values
      // but this approach won't help in recycling tabs because it will allowing for further keyleft presses when tabfocus values reaches 0 and we have to press keyright to make this logic work again of decrementing tabfocus values
      //   if (tabFocus > 0 && tabFocus < tabs.length) {
      // reduced the tabfocus value when left key is pressed since we are starting from the last element ie titan tab in the tablist
      tabFocus--;
      //   }
      // 2. we can recycle the tabs if tabfocus value goes goes negative by resetting tab value to highest index in tabs nodelist
      //this is better for accessiblity reasons as well because focus will always be there on anyone of the tabs always due to recyleing
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    } else if (e.keyCode === keyRight) {
      tabFocus++;
      // when tabfocus values reaches the maximum value ie tabs.length and if user again presses the right key then recycle back the user to the starting element/index of nodelist tabs let the user press keyright anynumber of times
      // this is better for userexperience as user predictably sees the tab focus moving right on keypress and accessibility wise also there is always focus on one tab always
      //the highest value in tabs nodelist is tabs.length -1 because nodelist starts from 0
      if (tabFocus > tabs.length - 1) {
        tabFocus = 0;
      }
    }

    // first reset aria-selected and tabindex value for all tabs
    // no need for for loop becaause we already setting the previous tab's tabindex to -1 above without using for loop
    // tabs.forEach((tab) => {
    //   //   tab.setAttribute("aria-selected", false);
    //   tab.setAttribute("tabindex", -1);
    // });
    // change aria-selected and tabindex value for the current tab
    // tabs[tabFocus].setAttribute("aria-selected", true);
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  }
}
