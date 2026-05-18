/**
 * Creativity Page — Slideshow, WOD Generator, Countdown, Goal Tracker
 */
(function () {
  /* ─── Image Slideshow ─── */
  var slides = document.querySelectorAll(".slide");
  var slidePrev = document.getElementById("slidePrev");
  var slideNext = document.getElementById("slideNext");
  var dotsContainer = document.getElementById("slideshowDots");
  var currentSlide = 0;
  var autoplayInterval = null;
  var autoplayDelay = 5000;

  function showSlide(index) {
    if (!slides.length) {
      return;
    }

    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    var i = 0;
    while (i < slides.length) {
      slides[i].classList.remove("active");
      i++;
    }
    slides[currentSlide].classList.add("active");

    var dots = dotsContainer ? dotsContainer.querySelectorAll("button") : [];
    var d = 0;
    while (d < dots.length) {
      if (d === currentSlide) {
        dots[d].classList.add("active");
        dots[d].setAttribute("aria-selected", "true");
      } else {
        dots[d].classList.remove("active");
        dots[d].setAttribute("aria-selected", "false");
      }
      d++;
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function buildDots() {
    if (!dotsContainer || !slides.length) {
      return;
    }

    dotsContainer.innerHTML = "";
    var idx = 0;
    while (idx < slides.length) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Go to slide " + (idx + 1));
      dot.setAttribute("aria-selected", idx === 0 ? "true" : "false");
      if (idx === 0) {
        dot.classList.add("active");
      }

      (function (slideIndex) {
        dot.addEventListener("click", function () {
          showSlide(slideIndex);
          resetAutoplay();
        });
      })(idx);

      dotsContainer.appendChild(dot);
      idx++;
    }
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (slides.length) {
    buildDots();
    showSlide(0);

    if (slideNext) {
      slideNext.addEventListener("click", function () {
        nextSlide();
        resetAutoplay();
      });
    }

    if (slidePrev) {
      slidePrev.addEventListener("click", function () {
        prevSlide();
        resetAutoplay();
      });
    }

    startAutoplay();

    var slideshow = document.getElementById("slideshow");
    if (slideshow) {
      slideshow.addEventListener("mouseenter", stopAutoplay);
      slideshow.addEventListener("mouseleave", startAutoplay);
    }
  }

  /* ─── Workout of the Day Generator ─── */
  var wodTitles = [
    "Iron Circuit",
    "Core Crusher",
    "Power Hour",
    "Endurance Engine",
    "Strength Stack",
    "Metcon Madness"
  ];

  var exercisePool = [
    "20 Kettlebell Swings",
    "15 Box Jumps",
    "12 Pull-ups (or rows)",
    "30 sec Plank Hold",
    "10 Burpees",
    "400m Row",
    "15 Goblet Squats",
    "20 Push-ups",
    "12 Deadlifts (moderate)",
    "30 sec Battle Ropes",
    "15 Lunges (each leg)",
    "10 Toes-to-Bar (or knee raises)"
  ];

  var wodFormats = ["AMRAP 12 min", "For Time (cap 20 min)", "3 Rounds", "EMOM 16 min", "5 Rounds"];

  function pickRandom(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function generateWOD() {
    var titleEl = document.getElementById("wodTitle");
    var listEl = document.getElementById("wodExercises");
    var metaEl = document.getElementById("wodMeta");

    if (!titleEl || !listEl || !metaEl) {
      return;
    }

    var title = pickRandom(wodTitles);
    var format = pickRandom(wodFormats);
    var exerciseCount = 4 + Math.floor(Math.random() * 3);
    var selected = [];
    var available = exercisePool.slice();
    var count = 0;

    while (count < exerciseCount && available.length > 0) {
      var pickIndex = Math.floor(Math.random() * available.length);
      selected.push(available[pickIndex]);
      available.splice(pickIndex, 1);
      count++;
    }

    titleEl.textContent = title;
    listEl.innerHTML = "";

    var e = 0;
    while (e < selected.length) {
      var li = document.createElement("li");
      li.textContent = selected[e];
      listEl.appendChild(li);
      e++;
    }

    metaEl.textContent = "Format: " + format + " · " + selected.length + " movements";
  }

  var generateBtn = document.getElementById("generateWod");
  if (generateBtn) {
    generateBtn.addEventListener("click", generateWOD);
    generateWOD();
  }

  /* ─── Countdown Clock ─── */
  var eventDate = new Date("2026-06-01T09:00:00");
  var cdDays = document.getElementById("cdDays");
  var cdHours = document.getElementById("cdHours");
  var cdMinutes = document.getElementById("cdMinutes");
  var cdSeconds = document.getElementById("cdSeconds");

  function pad(num) {
    return num < 10 ? "0" + num : String(num);
  }

  function updateCountdown() {
    var now = new Date();
    var diff = eventDate.getTime() - now.getTime();

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = "00";
      if (cdHours) cdHours.textContent = "00";
      if (cdMinutes) cdMinutes.textContent = "00";
      if (cdSeconds) cdSeconds.textContent = "00";
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (cdDays) cdDays.textContent = pad(days);
    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMinutes) cdMinutes.textContent = pad(minutes);
    if (cdSeconds) cdSeconds.textContent = pad(seconds);
  }

  if (cdDays) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ─── Goal Tracker Progress Bar ─── */
  var sessionsInput = document.getElementById("sessionsInput");
  var progressFill = document.getElementById("progressFill");
  var progressLabel = document.getElementById("progressLabel");
  var progressBar = document.getElementById("progressBar");
  var maxSessions = 7;

  function updateProgress() {
    if (!sessionsInput || !progressFill) {
      return;
    }

    var sessions = parseInt(sessionsInput.value, 10);
    var percent = (sessions / maxSessions) * 100;

    progressFill.style.width = percent + "%";

    if (progressLabel) {
      progressLabel.textContent = sessions + " / " + maxSessions + " sessions";
    }

    if (progressBar) {
      progressBar.setAttribute("aria-valuenow", sessions);
    }
  }

  if (sessionsInput) {
    sessionsInput.addEventListener("input", updateProgress);
    updateProgress();
  }

})();
