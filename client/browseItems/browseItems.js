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

const browseContainer = document.getElementById("browseContainer");
const itemFilterCondition = document.getElementById("itemCondition");
const itemFilterCategory = document.getElementById("itemCategory");
const itemSearchBar = document.getElementById("searchBar");
let parsedData;
async function createBrowseList() {
  const dataFromDatabase = await fetch(
    "https://relove-e3km.onrender.com/view-items"
  );
  parsedData = await dataFromDatabase.json();
  for (let i = 0; i < parsedData.length; i++) {
    createCustomElement(
      parsedData[i].itemname,
      parsedData[i].itemcategory,
      parsedData[i].itemcondition,
      parsedData[i].itemdescription,
      parsedData[i].userlocation,
      parsedData[i].created_at,
      i
    );
  }
  setInterval(searchAndFilterBrowseList, 500);
}
function createCustomElement(
  itemName,
  itemCategory,
  itemCondition,
  itemDescription,
  userLocation,
  date,
  i
) {
  const element = document.createElement("div");
  element.className = `individualItem`;
  element.id = `itemNo${i}`;
  browseContainer.appendChild(element);
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

  element.appendChild(itemNameElement);
  element.appendChild(itemCategoryElement);
  element.appendChild(itemConditionElement);
  element.appendChild(itemDescriptionElement);
  element.appendChild(userLocationElement);
  element.appendChild(dateElement);
}
function searchAndFilterBrowseList() {
  for (let i = 0; i < parsedData.length; i++) {
    const currElement = document.getElementById(`itemNo${i}`);
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
      currElement.style.display = "block";
    } else {
      currElement.style.display = "none";
    }
  }
}

createBrowseList();
