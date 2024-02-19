"use strict";
const bookMarkEl = document.getElementById("BookMark");
const overlayEl = document.getElementById("overlay&Form");
const saveBookmark = document.getElementById("save");
const bookmarksContainerEl = document.getElementById("bookmarksContainer");
const websiteNameInput = document.getElementById("websiteName");
const urlInput = document.getElementById("url");
const closeModalEl = document.getElementById("closeModal");
const starIcon = document.getElementById("star");

let bookmarks = [];

// show modal function
function displayForm() {
  overlayEl.classList.remove("hidden");
  starIcon.classList.remove("star");
  websiteNameInput.focus();
  // remove input after saved
  websiteNameInput.value = "";
  urlInput.value = "";
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
bookMarkEl.addEventListener("click", displayForm);
closeModalEl.addEventListener("click", hideForm);

// TODO to fetch bookmarks if avilaible //BUG
function fetchBookmarks() {
  // to restore bookmarks
  if (localStorage.getItem("myBookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("myBookmarks"));
    // }
    //  else {
    //   // creat book mark
    //   bookmarks = [
    //     {
    //       webname: "google",
    //       url: "https://google.com",
    //     },
    //   ];
    //   localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    // }
    console.log(bookmarks);
  }

  saveBookmark.addEventListener("click", (e) => {
    e.preventDefault();
    hideForm();
    if (websiteNameInput.value === "" || InputEvent.value === "") {
      // TODO avoid to creat empty div.
      alert("please fill the inputs");
    } else {
      createElements();
    }
  });

  // * the process of creating url div and it's childern.
  function createElements() {
    websiteNameInput.focus();
    // creat a div inside bookmark container
    const child = document.createElement("div");
    const remove = document.createElement("div");
    const removeIcon = document.createElement("span");
    const link = document.createElement("a");

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
    removeIcon.classList.add(
      "rotate-45",
      "text-4xl",
      "hover:cursor-pointer",
      "hover:text-rose-700"
    );

    // removeIcon.setAttribute("title");
    link.classList.add("uppercase", "visited:text-rose-700");
    // TODO set href attribute to link
    removeIcon.innerHTML = "+";

    bookmarksContainerEl.appendChild(child);

    child.append(remove, link);
    remove.appendChild(removeIcon);
    // child.appendChild(link);

    const url = urlInput.value;
    link.innerHTML = websiteNameInput.value;
    if (!url.includes("https", "http")) {
      link.setAttribute("href", `https://${url}`);
    } else {
      // console.log(url);
      link.setAttribute("href", url);
      link.setAttribute("target", "_blank");
    }

    // * to save bookmarksin local storage
    const bookmark = {
      webname: websiteNameInput.value,
      url: url,
    };
    bookmarks.push(bookmark);
    fetchBookmarks();
    localStorage.setItem("myBookmarks", JSON.stringify(bookmarks));
  }
}

fetchBookmarks();

// TODO enable to remove each bookmark

// bookmarks.forEach((bookmark) => {
//   const { webname, url } = bookmark;
//   removeIcon.setAttribute("onclick", `removeBookmark('${url}')`);
// });
