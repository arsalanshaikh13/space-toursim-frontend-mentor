// select the tablist
const tabList = document.querySelector('[role="tablist"]');
// select all the tabs in the tablist in an array
const tab = tabList.querySelectorAll('[role="tab"]');
const content = document.querySelectorAll(".destination-info");
const picture = document.querySelectorAll("picture");

// listen for keyboard even and execute the callback functionk
// tabList.addEventListener("keydown", (e) => {
//   console.log(e, e.code, e.keyCode, e.key)}
//);
// listen for keyboard even and execute the callback functionk
tabList.addEventListener("keydown", changeTabFocus);
// tab.forEach((tabindex) => {
//   //"click"(pointerevents) listens for mouse and also for spacebar keyboard event
//   tabindex.addEventListener("click", (e) => {
//     console.log(tabindex, e);
//   });
// });
tab.forEach((tabindex) => {
  //"click"(pointerevents) listens for mouse and also for spacebar and enter keyboard event

  tabindex.addEventListener("click", changeTabPanel);
});

function changeTabPanel(e) {
  console.log(e);
  //   get the selected Element(target element)
  const targetBtn = e.target;
  //   console.log(targetBtn);
  //getattributes returns a string
  const targetPanel = targetBtn.getAttribute("aria-controls");
  console.log(targetPanel);

  //my appraoch
  //   const contentPanel = document.querySelector(`#${targetPanel}`);
  //   console.log(contentPanel);
  //   //   console.log(typeof contentPanel.hasAttribute("hidden"));
  //   //   if (contentPanel.hasAttribute("hidden") === true) {
  //   //     contentPanel.removeAttribute("hidden");
  //   //   }
  //   const content = document.querySelectorAll(".destination-info");
  //   tab.forEach((tabindex) => {
  //     tabindex.setAttribute("aria-selected", false);
  //   });
  //   content.forEach((contentinfo) => {
  //     if (contentinfo.getAttribute("id") === contentPanel.getAttribute("id")) {
  //       contentinfo.removeAttribute("hidden");
  //       targetBtn.setAttribute("aria-selected", true);
  //     } else {
  //       contentinfo.setAttribute("hidden", "hidden");
  //     }
  //   });

  // kevin's approach of using aria-attributes to control elements using javascript
  // this appraoch of using parentnode and siblings of the element is robust and can be used anywhere(whereever the children are nested in the containers) and it is not limited to just this specific usecase
  // access the parent of the tabs
  const tabContainer = targetBtn.parentNode;
  //access the parent of the tabcontainer
  // since we want to change/manipulate picture and article elements which are sibling of tabcontainer
  // we can manipulate article and pictures element from maincontainer
  const MainContainer = tabContainer.parentNode;
  const targetImage = targetBtn.getAttribute("data-image");
  console.log(tabContainer, MainContainer);

  //set aria-selected for all tab buttons to false
  // tabContainer.querySelectorAll("button").forEach((button) => {
  //   button.setAttribute("aria-selected", false);
  // });
  // instead of using loop to set aria-selected false as above there is another way to avoid using loops completely
  // querySelector goes through all the elements and selects the first match of aria-selected=true whereas queryselectorALL would select every match of aria-selected=true
  //since we have already set aria-selected to false in the html for other elements we just have to find the specific element which has aria-selected=true and set it to false
  tabContainer
    .querySelector("[aria-selected='true']")
    .setAttribute("aria-selected", false);

  //set selected aria-selected to true to highlight that specific tab
  targetBtn.setAttribute("aria-selected", true);

  //hide all the article elements
  //role attribute makes this code usable for any element where the role attribute is set
  //role attribute makes sense in different context and for differen elements like section/div/article
  // MainContainer.querySelectorAll("[role='tabpanel']").forEach((panel) => {
  //   panel.setAttribute("hidden", "true");
  // });
  hideContent(MainContainer, "[role='tabpanel']");

  // since getattribute of targetpanel is string we need to use template literals to access the specific id  to get the specific element
  //only show the article selected by the target tab button as targetpanel
  // MainContainer.querySelector(`#${targetPanel}`).removeAttribute("hidden");
  // write the exact literal which needs to be passed on the showcontent function
  showContent(MainContainer, `#${targetPanel}`);

  //hide all the picture element
  // MainContainer.querySelectorAll("picture").forEach((picture) => {
  //   picture.setAttribute("hidden", true);
  // });
  hideContent(MainContainer, "picture");
  // MainContainer.querySelector(`#${targetImage}`).removeAttribute("hidden");
  // we can either pass exact template literal as above or put the literal inside a list as below and both works
  showContent(MainContainer, [`#${targetImage}`]);
}

// abstracting away repeated code into a function which can be called many times
function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}
function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}

let tabFocus = 0;
function changeTabFocus(e) {
  const keyLeft = 37;
  const keyRight = 39;

  //change the tabindex of the current tab to -1
  //   using forEach
  //   tab.forEach((tabindex) => {
  //     console.log(tabindex);
  //     console.log(tabindex.getAttribute("tabindex"));
  //     if (tabindex.getAttribute("tabindex") === "0") {
  //       tabindex.setAttribute("tabindex", "-1");
  //     }
  //     if (e.keyCode === keyRight) {
  //       //   console.log(e.keyCode, typeof(e.keyCode));
  //     }
  //   });
  //   using for loop
  //   for (let i = 0; i < tab.length; i++) {
  //     // console.log(tab[i]);
  //     if (tab[i].getAttribute("tabindex") === "0") {
  //       tab[i].setAttribute("tabindex", -1);
  //     }
  //     if (e.keyCode === keyRight) {
  //       console.log(tab[i + 1]);
  //       tab[i + 1].setAttribute("tabindex", "0");

  //       break;
  //     } else if (e.keyCode === keyLeft) {
  //       tab[i - 1].setAttribute("tabindex", "0");
  //       break;
  //     }
  //   }

  //   check if left or right arrow key pressed
  if (e.keyCode === keyLeft || e.keyCode === keyRight) {
    tab[tabFocus].setAttribute("tabindex", -1);
    if (e.keyCode === keyRight) {
      //if the right key is pushed, move to the next tab on the right of current tab

      // making sure the tabfocus values range starts from 0 and goes till 2(less than 3 because ++ will make 2 to 3 and 3 is the last element of the nodelist)
      // if tabfocus value goes beyond the range the elements won't be able to be accessed and modified/manipulated be cause length of nodelist will be exceeded
      // if (tabFocus >= 0 && tabFocus < tab.length - 1) {
      //   tabFocus++;
      // }

      // kevin's approach
      tabFocus++;
      // if tabfocus value exceeds range value cycle back to the starting element of the nodelist ie starting tab
      //recycling appraoch is better for accessiblity reasons as well because screenreader will always know which element right now is in focus among the tabs
      // using tab.length for range value allows for extensibility if tabs increase this condition will account for those extended tablist
      // and this is always better than hardcoding the number in the range
      if (tabFocus >= tab.length) {
        // reset tabFocus
        tabFocus = 0;
      }

      // console.log(content);

      // tab[tabFocus].focus();
      // tab[tabFocus].setAttribute("tabindex", 0);
      // content[tabFocus - 1].setAttribute("hidden", "hidden");
      // content[tabFocus].removeAttribute("hidden");
      // picture[tabFocus - 1].setAttribute("hidden", "hidden");
      // picture[tabFocus].removeAttribute("hidden");
      // console.log(tabFocus, tab.length);
    } else if (e.keyCode === keyLeft) {
      // if the left key is pushed, move to the next tab on the left of the current tab

      //making tabfocus value range starts from 1(tabfocus-- will make 1 to 0 and 0 is first element of the node list) and goes till the maximum of 3(3 being the last element of the nodelist)
      // if (tabFocus > 0 && tabFocus < tab.length) {
      //   tabFocus--;
      // }

      //kevin's appraoch
      tabFocus--;
      // if tabfocus values goes below 0 then cycle back the tabfocus value to the last element of the node list ie last tab
      //recycling appraoch is better for accessiblity reasons as well because screenreader will always know which element right now is in focus among the tabs

      if (tabFocus < 0) {
        // tab node list ranges from 0 to tab.length-1(3 in this case), tab.length value does not exist in tab node list
        tabFocus = tab.length - 1;
      }
      // tab[tabFocus].focus();
      // tab[tabFocus].setAttribute("tabindex", 0);
      // console.log(content);
      // content[tabFocus + 1].setAttribute("hidden", "hidden");
      // content[tabFocus].removeAttribute("hidden");
      // picture[tabFocus + 1].setAttribute("hidden", "hidden");
      // picture[tabFocus].removeAttribute("hidden");

      // console.log(tabFocus);
    }
    tab[tabFocus].focus();
    tab[tabFocus].setAttribute("tabindex", 0);
  }
}
