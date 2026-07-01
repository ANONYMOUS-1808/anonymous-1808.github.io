$(document).ready(function () {
  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  $(".comparison-slider").each(function () {
    var slider = this;
    var range = slider.querySelector(".comparison-range");
    if (!range) return;

    if (!slider.querySelector(".comparison-label-before")) {
      var beforeLabel = document.createElement("span");
      var beforeText = document.createElement("span");
      beforeLabel.className = "comparison-label comparison-label-before";
      beforeText.className = "comparison-label-text";
      beforeText.textContent = slider.dataset.beforeLabel || "";
      beforeLabel.appendChild(beforeText);
      slider.appendChild(beforeLabel);
    }

    if (!slider.querySelector(".comparison-label-after")) {
      var afterLabel = document.createElement("span");
      var afterText = document.createElement("span");
      afterLabel.className = "comparison-label comparison-label-after";
      afterText.className = "comparison-label-text";
      afterText.textContent = slider.dataset.afterLabel || "";
      afterLabel.appendChild(afterText);
      slider.appendChild(afterLabel);
    }

    function updateComparison() {
      var position = Number(range.value);
      var sliderWidth = slider.clientWidth;
      var beforeLabel = slider.querySelector(".comparison-label-before");
      var afterLabel = slider.querySelector(".comparison-label-after");
      var edgeGap = 12;
      var labelGap = 10;
      var dividerX = (sliderWidth * position) / 100;

      slider.style.setProperty("--position", position + "%");

      if (beforeLabel) {
        slider.style.setProperty("--before-label-width", "max-content");
        var beforeText = beforeLabel.querySelector(".comparison-label-text");
        var beforeNaturalWidth = beforeText ? beforeText.offsetWidth : beforeLabel.offsetWidth;
        var beforeRight = dividerX - labelGap;
        var beforeWidth = Math.max(0, Math.min(beforeNaturalWidth, beforeRight - edgeGap));
        var beforeLeft = beforeRight - beforeWidth;
        slider.style.setProperty("--before-label-left", beforeLeft + "px");
        slider.style.setProperty("--before-label-width", beforeWidth + "px");
      }

      if (afterLabel) {
        slider.style.setProperty("--after-label-width", "max-content");
        var afterText = afterLabel.querySelector(".comparison-label-text");
        var afterNaturalWidth = afterText ? afterText.offsetWidth : afterLabel.offsetWidth;
        var afterLeft = dividerX + labelGap;
        var afterWidth = sliderWidth - edgeGap - afterLeft;
        afterWidth = Math.max(0, Math.min(afterNaturalWidth, afterWidth));
        slider.style.setProperty("--after-label-left", afterLeft + "px");
        slider.style.setProperty("--after-label-width", afterWidth + "px");
      }
    }

    range.addEventListener("input", updateComparison);
    window.addEventListener("resize", updateComparison);
    updateComparison();
  });

  var lightbox = document.getElementById("image-lightbox");
  var lightboxImage = document.getElementById("image-lightbox-image");
  var lightboxClose = lightbox ? lightbox.querySelector(".image-lightbox-close") : null;

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.classList.remove("is-active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-fullscreen-image]").forEach(function (image) {
    image.addEventListener("click", function () {
      if (!lightbox || !lightboxImage) return;

      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || "";
      lightbox.classList.add("is-active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox || event.target === lightboxImage) {
        closeLightbox();
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
});

function selectScene(scene, model) {
  var image = document.getElementById(scene + "-image");
  if (!image) return;

  var imagePaths = {
    qualitative: {
      lego: "static/image/qualitative_results/lego.png",
      hotdog: "static/image/qualitative_results/hotdog.png",
      chair: "static/image/qualitative_results/chair.png",
      ficus: "static/image/qualitative_results/ficus.png",
      armadillo: "static/image/qualitative_results/armadillo.png",
      airballoons: "static/image/qualitative_results/airballoons.png",
      jugs: "static/image/qualitative_results/jugs.png",
    },
    indirect: {
      hotdog: "static/image/indirect/hotdog1.png",
      lego: "static/image/indirect/lego2.png",
      chair: "static/image/indirect/chair3.png",
      airbaloons: "static/image/indirect/airbaloons4.png",
    },
  };
  var sceneLabels = {
    lego: "Lego",
    hotdog: "Hotdog",
    chair: "Chair",
    ficus: "Ficus",
    armadillo: "Armadillo",
    airballoons: "Air Balloons",
    jugs: "Jugs",
    airbaloons: "Air Balloons",
  };

  image.src =
    imagePaths[scene] && imagePaths[scene][model]
      ? imagePaths[scene][model]
      : "static/image/" + scene + "_" + model + ".png";
  if (scene === "qualitative") {
    image.alt = (sceneLabels[model] || model) + " qualitative results";
  }

  var buttons = document.querySelectorAll("." + scene + "-button");
  buttons.forEach(function (btn) {
    btn.classList.remove("is-dark");
    btn.classList.remove("is-active");
  });

  var activeButton = document.getElementById(scene + "-" + model + "-button");
  if (activeButton) {
    activeButton.classList.add("is-dark");
    activeButton.classList.add("is-active");
  }
}
