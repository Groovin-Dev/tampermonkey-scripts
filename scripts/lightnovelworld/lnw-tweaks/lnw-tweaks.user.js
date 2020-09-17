// ==UserScript==
// @name         LNW Tweaks
// @namespace    https://www.lightnovelworld.com/
// @version      0.1
// @description  Small tweaks to LNW to make the reading experience better
// @author       Meliodas#0001
// @match        https://www.lightnovelworld.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

(function () {
  "use strict";

  /***** Delete Ads *****/
  $("div.ad-sticky").remove();
  $("div.adsbox").remove();
  $("div.vl-ad").remove();
  $("div.ad-container").remove();

  /***** Allow Selecting Text *****/
  $("div.chapter-content").css({
    "user-select": "auto",
  });

  /***** Change Update Bell *****/
  $("span.notify-bell").css({
    animation: "none",
    "-webkit-animation": "none",
    "-moz-animation": "none",
    color: "#B21634",
  });

  /***** Remove Top Banner *****/
  $("main > div").first().remove();

  /***** Change Icon *****/
  $(() => {
    if ($("head > style.darkreader").length < 1) {
      // Darkmode disabled
      $("div.nav-logo > a > img").attr(
        "src",
        "https://i.imgur.com/z8WIMZI.png"
      );
      $("div.wrapper > div.logo > img").attr(
        "src",
        "https://i.imgur.com/z8WIMZI.png"
      );
    } else {
      // Darkmode enabled
      $("div.nav-logo > a > img").attr(
        "src",
        "https://i.imgur.com/uf3Q4yE.png"
      );
      $("div.wrapper > div.logo > img").attr(
        "src",
        "https://i.imgur.com/uf3Q4yE.png"
      );
    }
  });

  const observeDOM = (() => {
    const MutationObserver =
      window.MutationObserver || window.WebKitMutationObserver;

    return (obj, callback) => {
      if (!obj || obj.nodeType !== 1) return;

      if (MutationObserver) {
        const obs = new MutationObserver(function (mutations, observer) {
          callback(mutations);
        });
        obs.observe(obj, {
          childList: true,
          subtree: true,
        });
      } else if (window.addEventListener) {
        obj.addEventListener("DOMNodeInserted", callback, false);
        obj.addEventListener("DOMNodeRemoved", callback, false);
      }
    };
  })();

  observeDOM(document.head, (m) => {
    if (m.length == 18) {
      $("div.nav-logo > a > img").attr(
        "src",
        "https://i.imgur.com/z8WIMZI.png"
      );
      $("div.wrapper > div.logo > img").attr(
        "src",
        "https://i.imgur.com/z8WIMZI.png"
      );
    } else if (m.length == 11) {
      $("div.nav-logo > a > img").attr(
        "src",
        "https://i.imgur.com/uf3Q4yE.png"
      );
      $("div.wrapper > div.logo > img").attr(
        "src",
        "https://i.imgur.com/uf3Q4yE.png"
      );
    }
  });

  /***** In Text Ads *****/
  const inTextAds = [
    "Find authorized novels in ReadNovelFull，faster updates, better experience，Please click for visiting.",
    "Find authorized novels in ReadNovelFull，faster updates, better experience，Please click www.ReadNovelFull.com for visiting.",
  ];

  const containsAd = (str, substrs) => {
    for (let i = 0; i != substrs.length; i++) {
      let subStr = substrs[i];

      if (str.includes(subStr)) {
        return subStr;
      }
    }
    return null;
  };

  $("div.chapter-content")
    .children()
    .each((i, v) => {
      let para = $(v);
      let text = para.text();
      if (text.trim().length > 1) {
        let hasAd = containsAd(text, inTextAds);

        if (hasAd) {
          para.text(text.replace(hasAd, ""));
        }
      }
    });

  /***** Testing *****/
  $("span.ljkmoi").remove();
  $("div.chapter-content > br").remove();
})();
