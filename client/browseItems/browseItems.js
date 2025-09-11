// Active Navlinks

document.querySelectorAll("nav a").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

//================================================
//

// GET code for viewing items

const browseContainer = document.getElementById("browseContainer"); //box all items go in
const itemFilterCondition = document.getElementById("itemCondition"); //select where you can pick a condition to filter by
const itemFilterCategory = document.getElementById("itemCategory"); //select where you can pick a category to filter by
const itemSearchBar = document.getElementById("searchBar"); //search bar input element
let parsedData; //initialised to become global variable
let claimedIds = localStorage.getItem("userClaimedIds"); //get claimed ids from localStorage

let claimedId = []; //sets returned value from next for loop to prevent the output not being defined if no local storage
if (claimedIds) {
  //if something obtained from local storage, add all numbers in the list (formatted with commas)
  claimedIds = JSON.parse(claimedIds);
  for (let j = 0; j < claimedIds.length; j++) {
    claimedId.push(claimedIds[j]);
  }
}
async function createBrowseList() {
  const response = await fetch (
  // const dataFromDatabase = await fetch( "Callum"
    "https://relove-e3km.onrender.com/view-items"
  ); //getting data from server from database
  parsedData = await response.json();
  browseContainer.innerHTML = "";
  // parsedData = await dataFromDatabase.json(); //convert to readable format "Callum's"
  for (let i = 0; i < parsedData.length; i++) {
    createCustomElement(
      parsedData[i].itemname,
      parsedData[i].itemcategory,
      parsedData[i].itemcondition,
      parsedData[i].itemdescription,
      parsedData[i].userlocation,
      parsedData[i].created_at,
      i,
      parsedData[i].id,
      parsedData[i].claimed
    );
  }
  // setInterval(searchAndFilterBrowseList, 500); //starts refreshing search and filters every 0.5 seconds. "Callum"
  itemSearchBar.addEventListener("input", searchAndFilterBrowseList);
itemFilterCategory.addEventListener("change", searchAndFilterBrowseList);
itemFilterCondition.addEventListener("change", searchAndFilterBrowseList);

}
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
  //takes input of all parts of database we want to show on a card for collection, setting text content to be data from the database
  const element = document.createElement("div");
  element.className = `card individualItem`; 
  element.id = `itemNo${i}`;
  element.dataset.dbId = dbID;
  browseContainer.appendChild(element); //adding container element to DOM

const imagesByCategory = {
  furniture: "./images/sofa.jpg",
  electronics: "./images/robot.jpg",
  clothing: ["./images/shirt.jpg", "./images/jacket.jpg",  "./images/cloth.jpg",],
  books: "./images/book.jpg",
  "toys-and-games": "./images/toys.jpg",
  "home-and-garden": "./images/garden.jpg",
  "sport-and-recreation": "./images/sport.jpg",
  other: "./images/pokemon.jpg",
};

const imageElement = document.createElement("img");
imageElement.src = imagesByCategory[itemCategory] || imagesByCategory.other;
imageElement.alt = itemName;
imageElement.className = "itemImage";
element.appendChild(imageElement);

  const itemNameElement = document.createElement("h3");
  itemNameElement.textContent = itemName;

  itemNameElement.className = "itemName";
  element.appendChild(itemNameElement);

  const itemCategoryElement = document.createElement("p");
itemCategoryElement.textContent = itemCategory;
itemCategoryElement.className = "itemCategory";
itemCategoryElement.style.display = "none"; 
element.appendChild(itemCategoryElement);


   // Container for details
  const detailsContainer = document.createElement("div");
  detailsContainer.className = "itemDetails";
// ===================== Callum
Category

  if (claimed == false) {
    itemNameElement.className = "itemName";
  } else if (claimed == true) {
    itemNameElement.className = `itemName claimed claimID${dbID}`;
  }
  const itemCategoryElement = document.createElement("h4");

  itemCategoryElement.textContent = itemCategory;
  itemCategoryElement.className = "itemCategory";
  const itemConditionElement = document.createElement("h4");
  itemConditionElement.textContent = itemCondition;
  itemConditionElement.className = "itemCondition";

  const itemDescriptionElement = document.createElement("p");
  itemDescriptionElement.textContent = itemDescription;  
  itemDescriptionElement.className = "itemDescription";
  const userLocationElement = document.createElement("h4");
  userLocationElement.textContent = userLocation;
  userLocationElement.className = "userLocation";
  const dateElement = document.createElement("h4");
  dateElement.textContent = date;
  dateElement.className = "dateAdded";
  const claimButton = document.createElement("button");
  claimButton.id = `buttonNo${i}`;
  claimButton.textContent = "Claim";
  claimButton.className = "claimButton";
  claimButton.addEventListener("click", function () {
    //creates listener for each button with their database id as an argument
    itemClaim(dbID);
  });
  element.appendChild(itemNameElement); //Adding rest of elements as children of main element in the DOM
  element.appendChild(itemCategoryElement);
  element.appendChild(itemConditionElement);
  element.appendChild(itemDescriptionElement);
  element.appendChild(userLocationElement);
  element.appendChild(dateElement);
  element.appendChild(claimButton);
}
// ============================

// just rearranged 

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

  // User Location
  const userLocationElement = document.createElement("p");
  userLocationElement.textContent = `Location: ${userLocation}`;
  userLocationElement.className = "userLocation";
  detailsContainer.appendChild(userLocationElement);

  element.appendChild(detailsContainer);

  // Format date nicely
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
  claimButton.addEventListener("click", function () {
    itemClaim(dbID);
  });
  element.appendChild(claimButton);
}
function searchAndFilterBrowseList() {
  for (let i = 0; i < parsedData.length; i++) {
    const currElement = document.getElementById(`itemNo${i}`); //for all elements, get the current element based on their id(added in creation step)
    if (
      (currElement.querySelector(".itemName").textContent
        .toLowerCase()
        .includes(itemSearchBar.value.toLowerCase()) ||
        itemSearchBar.value == "") &&
      (currElement.querySelector(".itemCategory").textContent
        .toLowerCase()
        .includes(itemFilterCategory.value.toLowerCase()) ||
        itemFilterCategory.value == "") &&
      (currElement.querySelector(".itemCondition").textContent
        .toLowerCase()
        .includes(itemFilterCondition.value.toLowerCase()) ||
        itemFilterCondition.value == "")
    ) {
      currElement.style.display = "block";
    } else {
      currElement.style.display = "none";
    }
  }
}
// ======================================Callum
      (currElement.children[0].textContent    //"Callums"
        .toLowerCase()
        .includes(itemSearchBar.value.toLowerCase()) ||
        itemSearchBar.value == "") &&
      (currElement.children[1].textContent == itemFilterCategory.value ||
        itemFilterCategory.value == "") &&
      (currElement.children[2].textContent == itemFilterCondition.value ||

        itemFilterCondition.value == "") &&
      (parsedData[i].claimed == false || claimedId.includes(parsedData[i].id))
    ) {

      //if(current element text content contains the text in the search bar && the text content of the category element matches the category filter (or it is blank) && the text content of the category element matches the condition filter (or it is blank) ){set display to block}
      currElement.style.display = "block";
    } else {
      currElement.style.display = "none"; //hides element if condition isnt met
    }
  }
}

async function itemClaim(dbId) {
  const sendingClaimUpdate = fetch(
    "https://relove-e3km.onrender.com/claim-item-update",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dbId }),
    }
  ); //sends a post to the server address '/claim-item-update' containing the id of the element that was claimed
  let arrayToLocalStorage = [];
  let toAddtoArray = localStorage.getItem("userClaimedIds");
  if (!toAddtoArray) {
    toAddtoArray = [];
  }
  toAddtoArray = JSON.parse(toAddtoArray);
  for (let i = 0; i < toAddtoArray.length; i++) {
    arrayToLocalStorage.push(toAddtoArray[i]);
  }
  if (!arrayToLocalStorage.includes(dbId)) {
    arrayToLocalStorage.push(dbId);
  }
  localStorage.setItem("userClaimedIds", JSON.stringify(arrayToLocalStorage));
}
createBrowseList();
