"use strict";
const bookMarkEl = document.getElementById("BookMark");
const overlayEl = document.getElementById("overlay&Form");
const saveBtn = document.getElementById("save");
const bookmarksContainerEl = document.getElementById("bookmarksContainer");
const urlName = document.getElementById("websiteName");
const urlInput = document.getElementById("url");
const closeModalEl = document.getElementById("closeModal");
const starIcon = document.getElementById("star");

let bookmarks = [];

// show modal function
function displayForm() {
  overlayEl.classList.remove("hidden");
  starIcon.classList.remove("star");
  // remove input after saved
  urlName.value = "";
  urlInput.value = "";
  urlName.focus();
}
// hide modal function
function hideForm() {
  overlayEl.classList.add("hidden");
  starIcon.classList.add("star");
}
// to hide modal if click to overlay
window.addEventListener("click", (e) => {
  if (e.target === overlayEl) hideForm();
});
// modal event listeners
bookMarkEl.addEventListener("click", displayForm);
closeModalEl.addEventListener("click", hideForm);

function validUrl(urlName, urlInput) {
  const expression =
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regExpression = new RegExp(expression);
  //if one of or both of input was empty
  if (!urlName || !urlInput) {
    alert("please fill both fields");
    return false;
  }

  if (!urlInput.match(regExpression)) {
    alert("please provide a valid adress");
    return false;
  }
  // valid
  return true;
}

// fetch bookmarks from local storage
function fetchBookmarks() {
  // convert Json string to objects
  if (localStorage.getItem("myBookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("myBookmarks"));
  } else {
    bookmarks = [
      {
        webName: "Hi",
        webUrl: "https://hi.com",
      },
    ];
    localStorage.setItem("myBookmarks", JSON.stringify(bookmarks));
  }
  creatBookmarks();
}

function storeBookmark() {
  const name = urlName.value;
  let url = urlInput.value;
  if (!url.includes("http", "https")) {
    url = `https://${url}`;
  }
  if (!validUrl(name, url)) {
    return false;
  }

  // bookmark object
  const bookmark = {
    webName: name,
    webUrl: url,
  };
  bookmarks.push(bookmark);
  // to save bookmarks in string in local storage
  localStorage.setItem("myBookmarks", JSON.stringify(bookmarks));
  // load
  fetchBookmarks();
}

// event listener for save button
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  storeBookmark();
  hideForm();
});

// load
fetchBookmarks();

// creat book mark function
function creatBookmarks() {
  // *remove all bookmarks elements
  bookmarksContainerEl.textContent = "";
  bookmarks.forEach((bookmark) => {
    const { webName, webUrl } = bookmark;
    // console.log(webName, webUrl);

    // creating elements for link
    const child = document.createElement("div");
    const remove = document.createElement("div");
    const removeIcon = document.createElement("span");
    const linkContainer = document.createElement("div");
    // const favIcon = document.createElement("img");
    const link = document.createElement("a");

    // adding style for all of them

    child.classList.add(
      "rounded-sm",
      "padding", // costom padding
      "bg-zinc-50",
      "bg-opacity-70",
      "opacity", // costom opacity
      "hover:bg-opacity-40",
      "flex",
      "flex-col"
    );
    remove.classList.add("flex", "justify-end", "mb-4");
    remove.setAttribute("title", "Delet Bookmark");
    removeIcon.setAttribute("onclick", `deletBookmark('${webUrl}')`);
    removeIcon.classList.add(
      "rotate-45",
      "text-4xl",
      "hover:cursor-pointer",
      "hover:text-rose-700"
    );
    // linkContainer.append(favIcon, link);
    // linkContainer.classList.add("flex", "space-x-4", "items-center");
    // favIcon.setAttribute(
    //   "src",
    //   `https://s2.googleusercontent.com/s2/favicon?domain=${webUrl}`
    // );

    link.classList.add("uppercase");
    link.setAttribute("href", `${webUrl}`);
    link.setAttribute("target", `_blank`);
    link.textContent = webName;
    // append
    removeIcon.innerHTML = "+";
    bookmarksContainerEl.appendChild(child);
    child.append(remove, link);
    remove.appendChild(removeIcon);
    //
  });
}

function deletBookmark(webUrl) {
  bookmarks.forEach((bookmark, index) => {
    if (bookmark.webUrl === webUrl) {
      bookmarks.splice(index, 1);
    }
  });
  // update bookmarks array in local storage
  localStorage.setItem("myBookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}
