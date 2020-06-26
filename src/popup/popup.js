"use strict";
document.addEventListener("DOMContentLoaded", (event) => {
  const searchMsg = document.getElementById("searchMsg"),
    searchBar = document.getElementById("urlInput"),
    searchBtn = document.getElementById("searchBtn");
  searchMsg.style.visibility = "hidden";

  const URLpattern = /^((?:https|http):\/\/(?:www\.|)youtube\.com\/watch\?v=(.+))/;

  searchBar.addEventListener("input", (e) => {
    const urlBool = searchBar.value.match(URLpattern);
    if (urlBool || searchBar.value === "")
      return (searchMsg.style.visibility = "hidden");
    return (searchMsg.style.visibility = "visible");
  });

  searchBar.addEventListener("keypress", (e) => {
    if (e.keyCode !== 13) return;
    const urlBool = searchBar.value.match(URLpattern);
    if (urlBool) {
      chrome.runtime.sendMessage({ action: "newWindow", url: urlBool[2] });
    }
  });

  searchBtn.addEventListener("click", () => {
    const urlBool = searchBar.value.match(URLpattern);
    if (urlBool) {
      chrome.runtime.sendMessage({ action: "newWindow", url: urlBool[2] });
    }
  });
});
