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

      // Generate Decorations (Balloons & Stars)
      const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#ff9ff3", "#54a0ff"];

      // Create Balloons
      for (let i = 0; i < 15; i++) {
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        balloon.style.left = Math.random() * 100 + "%";
        balloon.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDuration = Math.random() * 2 + 3 + "s"; // 3s to 5s
        balloon.style.animationDelay = Math.random() * 2 + "s";
        cakePopup.appendChild(balloon);

        // Remove after animation to clean up DOM
        setTimeout(() => {
          balloon.remove();
        }, 5000 + 2000); // Max duration + max delay
      }

      // Create Stars
      for (let i = 0; i < 30; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 2 + "s";
        cakePopup.appendChild(star);
      }

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

        // Show Message
        const message = document.getElementById("birthday-message");
        if (message) {
          console.log("Showing birthday message");
          message.classList.remove("hidden");
          message.style.display = "block"; // Force display just in case
          message.classList.add("fade-in-up");
        }

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

    // Check visibility function
    const checkVisibility = () => {
      galleryItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
          item.classList.add("visible"); // Sync with class logic
        }
      });
    };

    // Add class for visible items
    document.addEventListener("scroll", checkVisibility);

    // Check immediately in case they are already in view
    checkVisibility();
    // Also check after a small delay to ensure layout is settled
    setTimeout(checkVisibility, 100);
  }

  // Initial Confetti on Load
  setTimeout(() => {
    fireConfetti();
  }, 1000);
  // Hidden Memory Logic
  const lockedMemory = document.getElementById("locked-memory");
  const passwordModal = document.getElementById("password-modal");
  const closeModal = document.getElementById("close-modal");
  const submitPassword = document.getElementById("submit-password");
  const passwordInput = document.getElementById("password-input");
  const errorMessage = document.getElementById("error-message");

  if (lockedMemory && passwordModal) {
    // Open Modal
    lockedMemory.addEventListener("click", () => {
      if (!lockedMemory.classList.contains("unlocked")) {
        passwordModal.classList.remove("hidden");
        passwordInput.value = "";
        errorMessage.classList.add("hidden");
        passwordInput.focus();
      }
    });

    // Close Modal
    closeModal.addEventListener("click", () => {
      passwordModal.classList.add("hidden");
    });

    // Submit Password
    submitPassword.addEventListener("click", () => {
      checkPassword();
    });

    // Enter Key Support
    passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        checkPassword();
      }
    });

    function checkPassword() {
      const password = passwordInput.value;
      if (password === "surip15") {
        // Unlock Memory
        lockedMemory.classList.add("unlocked");
        lockedMemory.querySelector(".lock-overlay").innerHTML = ""; // Remove lock icon
        passwordModal.classList.add("hidden");

        // Success Confetti
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        errorMessage.classList.remove("hidden");
        passwordInput.classList.add("shake");
        setTimeout(() => {
          passwordInput.classList.remove("shake");
        }, 500);
      }
    }
  }
});
