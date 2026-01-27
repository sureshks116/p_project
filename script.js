document.addEventListener("DOMContentLoaded", () => {
  const celebrateBtn = document.getElementById("celebrate-btn");

  // Confetti Function
  const fireConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        }),
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  // Button Click Event
  if (celebrateBtn) {
    celebrateBtn.addEventListener("click", () => {
      fireConfetti();
      celebrateBtn.innerHTML = "Make Another Wish! 🌠";

      // Simple Audio Play (Optional, user can add their own file)
      // const audio = new Audio('assets/birthday_song.mp3');
      // audio.play().catch(e => console.log("Audio play failed (interaction needed first):", e));
    });
  }

  // Scroll Animation (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const galleryItems = document.querySelectorAll(".gallery-item");
  if (galleryItems.length > 0) {
    galleryItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";
      item.style.transition = "all 0.6s ease-out";
      observer.observe(item);
    });

    // Add class for visible items
    document.addEventListener("scroll", () => {
      galleryItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }
      });
    });
  }

  // Initial Confetti on Load
  setTimeout(() => {
    fireConfetti();
  }, 1000);
});
