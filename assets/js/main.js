(function () {
  "use strict";
/**
 * Easy selector helper function
 * @param  {[type]}  el                        [description]
 * @param  {Boolean} [all=false]               [description]
 * @return {[type]}              [description]
 */
  const select = (el, all = false) => {
    el = el.trim();

    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

/**
 * Easy event listener function
 * @param  {[type]}  type                      [description]
 * @param  {[type]}  el                        [description]
 * @param  {[type]}  listener                  [description]
 * @param  {Boolean} [all=false]               [description]
 * @return {[type]}              [description]
 */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   * @param  {[type]} el                     [description]
   * @param  {[type]} listener               [description]
   * @return {[type]}          [description]
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

/**
 * Back to top button
 * @type {[type]}
 */
  let backtotop = select(".back-to-top");

  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };

    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

/**
 * Countdown timer
 * @type {[type]}
 */
  let countdown = select(".countdown");
  const output = countdown.innerHTML;

  const countDownDate = function () {
    let timeleft =
      new Date(countdown.getAttribute("data-count")).getTime() -
      new Date().getTime();
    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    countdown.innerHTML = output
      .replace("%d", days)
      .replace("%h", hours)
      .replace("%m", minutes)
      .replace("%s", seconds);
  };

  countDownDate();
  setInterval(countDownDate, 1000);
})();
