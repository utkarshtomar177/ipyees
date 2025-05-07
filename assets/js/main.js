/*  ========= js documentation ==============

 * theme name: Memeco
 * version: 1.0
 * description: Memeco - Meme coin ICO & Crypto Tailwindcss Template 
 * author: Pixelaxis
 * author-url: https://themeforest.net/user/pixelaxis
 * 

   
    -------------------------------------------------
     01. Scroll top
     -------------------------------------------------
     02. Menu
     -------------------------------------------------
     03. Swiper Sliders
     -------------------------------------------------
     04. FAQ accordion
     -------------------------------------------------
     05.  Animation
     -------------------------------------------------
     
    ================================================== */

("use strict");
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1500,
  });

  /**
   * ======================================
   * 01. scroll top
   * ======================================
   */

  let scrollHeight;
  const scrollTopButton = document.querySelector(".scroll-top");

  const handleProgressClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", () => {
    scrollHeight = window.scrollY;
    if (scrollHeight > 100) {
      scrollTopButton?.classList.add("translate-y-0");
      scrollTopButton?.classList.add("opacity-100");
      scrollTopButton?.classList.remove("translate-y-20");
      scrollTopButton?.classList.remove("opacity-0");
    } else {
      scrollTopButton?.classList.remove("opacity-100");
      scrollTopButton?.classList.remove("translate-y-0");
      scrollTopButton?.classList.add("translate-y-20");
      scrollTopButton?.classList.add("opacity-0");
    }
  });

  scrollTopButton && scrollTopButton.addEventListener("click", handleProgressClick);

  const bgImages = document.querySelectorAll("[data-bg]");
  if (bgImages.length) {
    bgImages.forEach((image) => {
      const bgList = image
        .getAttribute("data-bg")
        .split(",")
        .map((bg) => `url(${bg.trim()})`);
      image.style.backgroundImage = bgList.join(", ");
    });
  }

  /**
   * ======================================
   * 02. Menu
   * ======================================
   */

  window.addEventListener("scroll", function () {
    scrollHeight = window.scrollY;
    const desktopNav = document.querySelector(".desktop-nav-container");
    const desktopNav2 = document.querySelector(".desktop-nav-container-2");

    if (scrollHeight > 100) {
      desktopNav?.classList.remove("bg-transparent");
      desktopNav?.classList.add("fixed", "left-0", "top-0", "w-full", "bg-[#005308]", "duration-300");
      desktopNav2?.classList.remove("bg-transparent");
      desktopNav2?.classList.add("fixed", "left-0", "top-0", "w-full", "bg-[#FEF200]", "duration-300");
    } else {
      desktopNav?.classList.remove("fixed", "left-0", "top-0", "w-full", "bg-[#005308]", "duration-300");
      desktopNav?.classList.add("fixed", "left-0", "top-0", "w-full", "bg-transparent", "duration-300");
      desktopNav2?.classList.remove("fixed", "left-0", "top-0", "w-full", "bg-[#FEF200]", "duration-300");
      desktopNav2?.classList.add("fixed", "left-0", "top-0", "w-full", "bg-transparent", "duration-300");
    }
  });

  // Mobile menu functionality
  const menuToggle = document.getElementById("menuToggle");
  const closeMenu = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");

  function toggleMenu() {
    mobileMenu.classList.toggle("-translate-x-[120%]");
    overlay.classList.toggle("invisible");
    overlay.classList.toggle("w-0");
    overlay.classList.toggle("w-full");
  }

  menuToggle?.addEventListener("click", toggleMenu);
  closeMenu?.addEventListener("click", toggleMenu);
  overlay?.addEventListener("click", toggleMenu);

  // Mobile submenu functionality
  const mobileSubmenuButtons = document.querySelectorAll("#mobileMenu .w-full > button");
  mobileSubmenuButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const submenu = this.nextElementSibling;
      const icon = this.querySelector("i");
      submenu.style.display = submenu.style.display === "none" ? "block" : "none";
      icon.classList.toggle("ti-plus");
      icon.classList.toggle("ti-minus");
    });
  });

  /**
   * ======================================
   * 03. Swiper Sliders
   * ======================================
   */

  var swiper = new Swiper(".home-2-brands", {
    slidesPerView: "auto",
    speed: 18000,
    freeMode: true,
    autoplay: {
      delay: 0,
    },
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 6,
      },
    },
  });

  /**
   * ======================================
   * 04. FAQ accordion
   * ======================================
   */
  let accordion = document.querySelectorAll(".faq-accordion");

  accordion.forEach((item, index) => {
    accordion[index].addEventListener("click", function () {
      let faqAnswer = this.nextElementSibling;
      let parent = accordion[index].parentElement;

      // Close all other accordions
      accordion.forEach((otherAccordion, otherIndex) => {
        if (otherIndex !== index) {
          let otherFaqAnswer = otherAccordion.nextElementSibling;
          otherFaqAnswer.style.height = null;
          otherAccordion.classList.remove("text-primary");
          otherAccordion.classList.remove("pb-6");
          otherAccordion.querySelector("i").classList.remove("-rotate-180");
          otherAccordion.querySelector("div").classList.remove("border-h1Primary2");
          otherAccordion.querySelector("div").classList.add("border-transparent");
          otherAccordion.parentElement.classList.remove("!border-h1Primary2");
        }
      });

      // Toggle open/close for the clicked accordion
      if (faqAnswer.style.height) {
        faqAnswer.style.height = null;
      } else {
        faqAnswer.style.height = faqAnswer.scrollHeight + "px";
      }

      // Toggle classes for the clicked accordion
      accordion[index].querySelector("i").classList.toggle("-rotate-180");
      accordion[index].parentElement.classList.toggle("!border-h1Primary2");
    });
  });

  let accordion2 = document.querySelectorAll(".faq-accordion-2");

  accordion2.forEach((item, index) => {
    accordion2[index].addEventListener("click", function () {
      let faqAnswer = accordion2[index].nextElementSibling;
      let parent = accordion2[index].parentElement;

      // Close all other accordions
      accordion2.forEach((otherAccordion, otherIndex) => {
        if (otherIndex !== index) {
          let otherFaqAnswer = otherAccordion.nextElementSibling;
          otherFaqAnswer.style.height = null;
          otherAccordion.classList.remove("text-primary");
          otherAccordion.classList.remove("pb-6");
          otherAccordion.querySelector("i").classList.remove("-rotate-180");
          otherAccordion.querySelector("div").classList.remove("border-h1Primary2");
          otherAccordion.querySelector("div").classList.add("border-transparent");
          otherAccordion.parentElement.classList.remove("!border-h1Primary2");
          otherAccordion.parentElement.classList.remove("!bg-[#E7FF53]");
          otherAccordion.classList.remove("!text-black");
          otherFaqAnswer.classList.remove("!text-black");
        } else {
          accordion2[index].parentElement.classList.add("!border-black", "!bg-[#E7FF53]");
          accordion2[index].classList.add("!text-black");
          faqAnswer.classList.add("!text-black");
        }
      });

      // Toggle open/close for the clicked accordion
      if (faqAnswer.style.height) {
        faqAnswer.style.height = null;
      } else {
        faqAnswer.style.height = faqAnswer.scrollHeight + "px";
      }

      // Toggle classes for the clicked accordion
      accordion2[index].querySelector("i").classList.toggle("-rotate-180");
    });
  });

  let accordion3 = document.querySelectorAll(".faq-accordion-3");

  accordion3.forEach((item, index) => {
    accordion3[index].addEventListener("click", function () {
      let faqAnswer = accordion3[index].nextElementSibling;
      let parent = accordion3[index].parentElement;

      // Close all other accordions
      accordion3.forEach((otherAccordion, otherIndex) => {
        if (otherIndex !== index) {
          let otherFaqAnswer = otherAccordion.nextElementSibling;
          otherFaqAnswer.style.height = null;
          otherAccordion.classList.remove("text-primary");
          otherAccordion.classList.remove("pb-6");
          otherAccordion.querySelector("i").classList.remove("-rotate-180");
          otherAccordion.querySelector("div").classList.remove("border-h1Primary2");
          otherAccordion.querySelector("div").classList.add("border-transparent");
          otherAccordion.parentElement.classList.remove("!border-h1Primary2");
          otherAccordion.parentElement.classList.remove("!bg-[#E7FF53]");
          otherAccordion.parentElement.classList.remove("!border-[#7130c3]");
        } else {
          accordion3[index].parentElement.classList.add("!border-[#7130c3]");
        }
      });

      // Toggle open/close for the clicked accordion
      if (faqAnswer.style.height) {
        faqAnswer.style.height = null;
      } else {
        faqAnswer.style.height = faqAnswer.scrollHeight + "px";
      }

      // Toggle classes for the clicked accordion
      accordion3[index].querySelector("i").classList.toggle("-rotate-180");
    });
  });
});

/**
 * ======================================
 * 05. Animation
 * ======================================
 */

gsap.registerPlugin(ScrollTrigger);
// text split animation
function splitTextAnimation(selector) {
  document.querySelectorAll(selector).forEach((item) => {
    const delay = parseFloat(item.getAttribute("data-delay")) || 0; // Default: 0s
    const duration = parseFloat(item.getAttribute("data-duration")) || 0.5; // Default: 1s
    // Preserve spaces while wrapping each letter in a span
    let text = item.innerText;
    item.innerHTML = text
      .split("")
      .map((letter) => {
        return letter === " "
          ? "&nbsp;" // Keep space intact
          : `<span style="display: inline-block; opacity: 0;">${letter}</span>`;
      })
      .join("");
    const letters = item.querySelectorAll("span");
    gsap.to(letters, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: duration,
      delay: delay,
      ease: "back.out(1.7)",
      stagger: 0.05, // Stagger effect for each letter
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
    // Initial hidden state for animation
    gsap.set(letters, { opacity: 0, y: 50, rotationX: 90 });
  });
}

function slidingBlurTextReveal(selector) {
  document.querySelectorAll(selector).forEach((item) => {
    const delay = parseFloat(item.getAttribute("data-delay")) || 0; // Default delay
    const duration = parseFloat(item.getAttribute("data-duration")) || 0.8; // Default duration
    // Preserve spaces while wrapping each letter in a span
    let text = item.innerText;
    item.innerHTML = text
      .split("")
      .map((letter) => {
        return letter === " "
          ? "&nbsp;" // Keeps spaces intact
          : `<span style="display: inline-block; opacity: 0; filter: blur(10px);">${letter}</span>`;
      })
      .join("");
    const letters = item.querySelectorAll("span");
    gsap.to(letters, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: duration,
      delay: delay,
      ease: "power3.out",
      stagger: 0.05, // Adds a smooth delay between each letter
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
    // Set initial hidden state
    gsap.set(letters, { opacity: 0, filter: "blur(10px)" });
  });
}

// reveal animation
function revealAnim(selector) {
  document.querySelectorAll(selector).forEach((item) => {
    const direction = item.getAttribute("data-reveal-from") || "left"; // Default: bottom
    const delay = parseFloat(item.getAttribute("data-delay")) || 0; // Default: 0s
    const duration = parseFloat(item.getAttribute("data-duration")) || 1.2; // Default: 1.2s

    // Define animation properties based on direction
    let fromVars = {
      opacity: 0,
      clipPath: "inset(0 0 0 0)", // Default, changes dynamically
      ease: "power3.out",
      duration: duration,
      delay: delay,
    };

    switch (direction) {
      case "top":
        fromVars.clipPath = "inset(100% 0% 0% 0%)";
        break;
      case "right":
        fromVars.clipPath = "inset(0% 0% 0% 100%)";
        break;
      case "bottom":
        fromVars.clipPath = "inset(0% 0% 100% 0%)";
        break;
      case "left":
        fromVars.clipPath = "inset(0% 100% 0% 0%)";
        break;
    }

    gsap.fromTo(item, fromVars, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: duration,
      delay: delay,
      ease: "power3.inOut",
      clipPath: "inset(0% 0% 0% 0%)",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });
}

slidingBlurTextReveal(".blur_anim");

splitTextAnimation(".split_anim");

revealAnim(".reveal_anim");
