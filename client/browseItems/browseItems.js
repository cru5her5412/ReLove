//
// IMPORTING IMAGES

import bookImage from "./images/book.webp";
import clothImage from "./images/cloth.webp";
import gardenImage from "./images/garden.webp";
import jacketImage from "./images/jacket.webp";
import pokemonImage from "./images/pokemon.jpg";
import robotImage from "./images/robot.webp";
import shirtImage from "./images/shirt.webp";
import sofaImage from "./images/sofa.webp";
import toyImage from "./images/toy.jpg";
import sportImage from "./images/sport.webp";
//
//
//

// Active Navlinks

document.querySelectorAll("nav a").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

//================================================

// DOM Elements
const browseContainer = document.getElementById("browseContainer");
const itemFilterCondition = document.getElementById("itemCondition");
const itemFilterCategory = document.getElementById("itemCategory");
const itemSearchBar = document.getElementById("searchBar");

// Claimed IDs from localStorage
let claimedIds = JSON.parse(localStorage.getItem("userClaimedIds")) || [];

//  fetched item data
let parsedData = [];

//  Fetch items
async function createBrowseList() {
  const response = await fetch("https://relove-e3km.onrender.com/view-items");
  parsedData = await response.json();
  browseContainer.innerHTML = "";

  for (let i = 0; i < parsedData.length; i++) {
    const item = parsedData[i];
    createCustomElement(
      item.itemname,
      item.itemcategory,
      item.itemcondition,
      item.itemdescription,
      item.userlocation,
      item.created_at,
      i,
      item.id,
      item.claimed
    );
  }

  // Event listeners for live filtering
  itemSearchBar.addEventListener("input", searchAndFilterBrowseList);
  itemFilterCategory.addEventListener("change", searchAndFilterBrowseList);
  itemFilterCondition.addEventListener("change", searchAndFilterBrowseList);
}

//  card element for an item
function createCustomElement(
  itemName,
  itemCategory,
  itemCondition,
  itemDescription,
  userLocation,
  date,
  i,
  dbID,
  claimed
) {
  const element = document.createElement("div");
  element.className = "card individualItem";
  element.id = `itemNo${i}`;
  element.dataset.dbId = dbID;
  browseContainer.appendChild(element);

  const imagesByCategory = {
    furniture: [sofaImage],
    electronics: [robotImage],
    clothing: [shirtImage, jacketImage, clothImage],
    books: [bookImage],
    toysAndGames: [toyImage],
    homeAndGarden: [gardenImage],
    sportAndRecreation: [sportImage],
    other: [pokemonImage],
    test: [pokemonImage],
  };

  const imageElement = document.createElement("img");
  imageElement.src =
    imagesByCategory[itemCategory][
      Math.floor(Math.random() * (imagesByCategory[itemCategory].length - 1))
    ] || imagesByCategory.other;
  imageElement.alt = itemName;
  imageElement.className = "itemImage";
  element.appendChild(imageElement);

  const itemNameElement = document.createElement("h3");
  itemNameElement.textContent = itemName;
  itemNameElement.className = claimed
    ? `itemName claimed claimID${dbID}`
    : "itemName";
  element.appendChild(itemNameElement);

  // Hidden element for filtering
  const itemCategoryElement = document.createElement("p");
  itemCategoryElement.textContent = itemCategory;
  itemCategoryElement.className = "itemCategory";
  itemCategoryElement.style.display = "none";
  element.appendChild(itemCategoryElement);

  // Details container
  const detailsContainer = document.createElement("div");
  detailsContainer.className = "itemDetails";

  // Condition
  const itemConditionElement = document.createElement("p");
  itemConditionElement.textContent = `Condition: ${itemCondition}`;
  itemConditionElement.className = "itemCondition";
  detailsContainer.appendChild(itemConditionElement);

  // Description
  const itemDescriptionElement = document.createElement("p");
  itemDescriptionElement.textContent = `Details: ${itemDescription}`;
  itemDescriptionElement.className = "itemDescription";
  detailsContainer.appendChild(itemDescriptionElement);

  // Location
  const userLocationElement = document.createElement("p");
  userLocationElement.textContent = `Location: ${userLocation}`;
  userLocationElement.className = "userLocation";
  detailsContainer.appendChild(userLocationElement);

  element.appendChild(detailsContainer);

  const dateElement = document.createElement("p");
  const dateObj = new Date(date);
  dateElement.textContent = `Posted on: ${dateObj.toLocaleString()}`;
  dateElement.className = "dateAdded";
  element.appendChild(dateElement);

  // Claim button
  const claimButton = document.createElement("button");
  claimButton.id = `buttonNo${i}`;
  claimButton.textContent = "Claim";
  claimButton.className = "claimButton";

  if (claimed && !claimedIds.includes(dbID)) {
    claimButton.disabled = true;
    claimButton.textContent = "Claimed";
  }

  claimButton.addEventListener("click", function () {
    itemClaim(dbID);
  });

  element.appendChild(claimButton);
}

// Filter list by search input and dropdown filters
function searchAndFilterBrowseList() {
  for (let i = 0; i < parsedData.length; i++) {
    const currElement = document.getElementById(`itemNo${i}`);
    const nameText = currElement
      .querySelector(".itemName")
      .textContent.toLowerCase();
    const categoryText = currElement
      .querySelector(".itemCategory")
      .textContent.toLowerCase();
    const conditionText = currElement
      .querySelector(".itemCondition")
      .textContent.toLowerCase();

    const nameMatch =
      nameText.includes(itemSearchBar.value.toLowerCase()) ||
      itemSearchBar.value === "";
    const categoryMatch =
      categoryText.includes(itemFilterCategory.value.toLowerCase()) ||
      itemFilterCategory.value === "";
    const conditionMatch =
      conditionText.includes(itemFilterCondition.value.toLowerCase()) ||
      itemFilterCondition.value === "";

    currElement.style.display =
      nameMatch && categoryMatch && conditionMatch ? "block" : "none";
  }
}

//  Claim item and store in localStorage
async function itemClaim(dbId) {
  await fetch("https://relove-e3km.onrender.com/claim-item-update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dbId }),
  });

  let claimedIds = JSON.parse(localStorage.getItem("userClaimedIds")) || [];

  if (!claimedIds.includes(dbId)) {
    claimedIds.push(dbId);
    localStorage.setItem("userClaimedIds", JSON.stringify(claimedIds));
  }

  // Refresh UI to reflect claimed status
  createBrowseList();
}

// ✅ Initialize
createBrowseList();
