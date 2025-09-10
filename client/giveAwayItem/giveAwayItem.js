// Active Navlinks

document.querySelectorAll("nav a").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

//================================================
//

// POST code

const form = document.querySelector("#inputForm");
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formTemplate = new FormData(form);
  const formData = Object.fromEntries(formTemplate);
  const response = await fetch("https://relove-e3km.onrender.com/submit-item", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData }),
  });
});
