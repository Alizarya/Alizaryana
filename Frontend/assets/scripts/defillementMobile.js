$(document).ready(function () {
  if (window.matchMedia("(max-width: 48em)").matches) {
    $("section:not(#accueil)").addClass("hidden");

    $("nav i").click(function () {
      let index = $(this).index();
      showSection(index);
      updateNavColors(index);
    });

    let startX = 0;
    let distX = 0;

    $(document).on("touchstart", function (event) {
      startX = event.originalEvent.touches[0].clientX;
    });

    $(document).on("touchmove", function (event) {
      distX = startX - event.originalEvent.touches[0].clientX;
    });

    $(document).on("touchend", function (event) {
      if (distX < -100) {
        showNextSection();
      } else if (distX > 100) {
        showPreviousSection();
      }

      startX = 0;
      distX = 0;
    });

    function showSection(index) {
      $("section").addClass("hidden");
      $("section").eq(index).removeClass("hidden");
      updateActiveIcon(index);
    }

    function showPreviousSection() {
      let currentIndex = $("section:not(.hidden)").index();
      let prevIndex = (currentIndex + 1) % $("section").length;
      showSection(prevIndex);
    }

    function showNextSection() {
      let currentIndex = $("section:not(.hidden)").index();
      let nextIndex =
        (currentIndex - 1 + $("section").length) % $("section").length;
      showSection(nextIndex);
    }

    function updateNavColors(index) {
      let nav = $("nav");
      if (index % 2 === 1) {
        nav.css("color", "var(--bleu-clair)");
        nav.css("background-color", "var(--bleu-fonce)");
      } else {
        nav.css("color", "var(--violet-clair)");
        nav.css("background-color", "var(--violet-fonce)");
      }
    }

    function updateActiveIcon(index) {
      $("nav i").removeClass("active");
      $("nav i").eq(index).addClass("active");
    }

    let currentIndex = $("section:not(.hidden)").index();
    updateNavColors(currentIndex);
    updateActiveIcon(currentIndex);
  }
});
