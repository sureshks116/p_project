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
      // Show Cake Popup instead of immediate text change
      const cakePopup = document.getElementById("cake-popup");
      cakePopup.classList.remove("hidden");

      // Handle Candle Blow Out
      const candle = document.querySelector(".candle");
      const flame = document.querySelector(".flame");

      // Ensure we don't add multiple listeners if clicked multiple times
      candle.onclick = function () {
        flame.classList.add("out");

        // Create smoke effect
        const smoke = document.createElement("div");
        smoke.classList.add("smoke");
        candle.appendChild(smoke);

        // Hide instruction immediately
        const instruction = document.getElementById("cake-instruction");
        if (instruction) instruction.classList.add("hidden");

        setTimeout(() => {
          // Show Next Button
          const nextBtn = document.getElementById("cake-next-btn");

          if (nextBtn) {
            nextBtn.classList.remove("hidden");
            nextBtn.classList.add("fade-in-up");
          }

          celebrateBtn.innerHTML = "Wishes Made! 🎂✨";

          // Big Final Confetti
          fireConfetti();
        }, 1000);
      };

      // Next Button Interaction
      const nextBtn = document.getElementById("cake-next-btn");
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          window.location.href = "memories.html";
        });
      }

      // Initial small burst just for fun
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff6b6b", "#4ecdc4", "#ffe66d", "#ffffff"],
      });
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
