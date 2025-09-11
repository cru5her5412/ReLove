// Active Navlinks

document.querySelectorAll("nav a").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

//================================================
//

// Popup modal message variables
const popupModal = document.getElementById("popupModal");
const closePopupButton = document.getElementById("close-popup-button");

//================================================

// Confetti function

import pigeonImage from "./confettiImage/pigeon.png";

function triggerConfetti(duration = 10000, confettiPerTick = 7) {
  const container = document.getElementById("confetti-container");

  const confettiInterval = setInterval(function () {
    for (let i = 0; i < confettiPerTick; i++) {
      const pigeonConfetto = Math.random() < 0.1; // Randomly detrmines if a pigeon (10% chance) or regular confetto is generated.

      // Movements
      const drift = (Math.random() - 0.35) * 100; // A random number is generated between -35 and +35. This determines if the confetto moves left (negative), or right (positive).
      const rotateEnd = Math.random() * 720; // A random number between 0 and 2 full rotations (720 degrees)

      // Pigeon confetto code
      if (pigeonConfetto) {
        const pigeon = document.createElement("img");
        pigeon.src = pigeonImage;
        pigeon.classList.add("pigeon");

        const size = 40 + Math.random() * 30; // A random number is generated between 40 and 70.
        pigeon.style.width = size + "px"; // The random number is assigned to the width of the element.
        pigeon.style.height = "auto"; // The height automatically matches with the randomly generated width.

        pigeon.style.left = Math.random() * 100 + "vw"; // Randomly generated number of where (horizontally) the pigeon confetto appears. Because the pigeon is 'position: absolute' in the css, we can use '.left'.

        // Assign the randomly generated numbers from before to the pigeon confetto.
        pigeon.style.setProperty("--x-drift", drift + "vw");
        pigeon.style.setProperty("--rotate-end", rotateEnd + "deg");

        pigeon.style.animationDuration = 1.5 + Math.random() * 2 + "s"; // Pigeons will fall for a duration of a rndomly generated number (between 1.5 and 3.5 seconds).

        container.appendChild(pigeon);
        pigeon.addEventListener("animationEnd", () => pigeon.remove());
      } else {
        // Regular confetto code
        const confetti = document.createElement("div"); // Each confetto will be a small div element.
        confetti.classList.add("confetti");

        const size = 6 + Math.random() * 8; // Each confetto will be a random size between 6px and 14px.

        // Now sets that randomly generated number for width and height
        confetti.style.width = size + "px";
        confetti.style.height = size + "px";

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.setProperty("--hue", Math.floor(Math.random() * 360)); // A random colour is assigned to the confetto.
        confetti.style.setProperty("--x-drift", drift + "vw");
        confetti.style.setProperty("--rotate-end", rotateEnd + "deg");
        confetti.style.animationDuration = 2 + Math.random() * 2 + "s"; // A fall duration between 2 and 4 seconds.

        container.appendChild(confetti);
        confetti.addEventListener("animationEnd", () => confetti.remove());
      }
    }
  }, 100); // Generate a confetto every 100ms.

  setTimeout(() => clearInterval(confettiInterval), duration);
}

//================================================

// POST code

const form = document.querySelector("#inputForm"); //selects the form element
//on submit button press, prevents default, creates form template using form, inserts data from form into template in new object, sends said object over to the server's /submit-item address as JSON to add to the database
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formTemplate = new FormData(form);
  const formData = Object.fromEntries(formTemplate);
  const response = await fetch("https://relove-e3km.onrender.com/submit-item", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData }),
  });

  form.reset();

  // Trigger popup modal message code
  if (response.ok) {
    popupModal.classList.add("show"); // A wild popup appears!
    closePopupButton.focus(); // Accessibility focus on the close button

    //Confetti are triggered
    triggerConfetti(10000, 7);
  }
});

// Popup modal message close button functionality

closePopupButton.addEventListener("click", function () {
  popupModal.classList.remove("show"); // Popup hides again
});
