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
      const youtubeUrl = "#&" + urlBool[2];
      reloadWindow(youtubeUrl);
    }
  });

  searchBtn.addEventListener("click", () => {
    const urlBool = searchBar.value.match(URLpattern);
    if (urlBool) {
      const youtubeUrl = "#&" + urlBool[2];
      reloadWindow(youtubeUrl);
    }
  });

  const reloadWindow = (youtubeURL) => {
    async function reload() {
      try {
        await history.replaceState("", "", `index.html/${youtubeURL}`);
        const youtubeWrapper = await document.getElementById("youtubeWrap");
        youtubeWrapper.innerHTML = await `<div id="inputYoutube" class="contents__player"></div>`;
        await inplementUrl();
      } catch (e) {
        console.log(e);
      }
    }
    reload();
  };
});
