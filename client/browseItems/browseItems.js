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
async function createBrowseList() {
  //temp: https://relove-e3km.onrender.com/
  const dataFromDatabase = await fetch("http://localhost:8080/view-items"); //getting data from server from database
  parsedData = await dataFromDatabase.json(); //convert to readable format
  for (let i = 0; i < parsedData.length; i++) {
    createCustomElement(
      parsedData[i].itemname,
      parsedData[i].itemcategory,
      parsedData[i].itemcondition,
      parsedData[i].itemdescription,
      parsedData[i].userlocation,
      parsedData[i].created_at,
      i,
      parsedData[i].id
    );
  }
  setInterval(searchAndFilterBrowseList, 500); //starts refreshing search and filters every 0.5 seconds
}
function createCustomElement(
  itemName,
  itemCategory,
  itemCondition,
  itemDescription,
  userLocation,
  date,
  i,
  dbID
) {
  //takes input of all parts of database we want to show on a card for collection, setting text content to be data from the database
  const element = document.createElement("div");
  element.className = `individualItem`;
  element.id = `itemNo${i}`;
  browseContainer.appendChild(element); //adding container element to DOM
  const itemNameElement = document.createElement("h3");
  itemNameElement.textContent = itemName;
  itemNameElement.className = "itemName";
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
function searchAndFilterBrowseList() {
  for (let i = 0; i < parsedData.length; i++) {
    const currElement = document.getElementById(`itemNo${i}`); //for all elements, get the current element based on their id(added in creation step)
    if (
      (currElement.children[0].textContent
        .toLowerCase()
        .includes(itemSearchBar.value.toLowerCase()) ||
        itemSearchBar.value == "") &&
      (currElement.children[1].textContent == itemFilterCategory.value ||
        itemFilterCategory.value == "") &&
      (currElement.children[2].textContent == itemFilterCondition.value ||
        itemFilterCondition.value == "")
    ) {
      //if(current element text content contains the text in the search bar && the text content of the category element matches the category filter (or it is blank) && the text content of the category element matches the condition filter (or it is blank) ){set display to block}
      currElement.style.display = "block";
    } else {
      currElement.style.display = "none"; //hides element if condition isnt met
    }
  }
}
async function itemClaim(i) {
  const sendingClaimUpdate = fetch("http://localhost:8080/claim-item-update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ i }),
  });
}
createBrowseList();
