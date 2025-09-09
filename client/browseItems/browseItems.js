const browseContainer = document.getElementById("browseContainer");
const itemFilterCondition = document.getElementById("itemCondition");
const itemFilterCategory = document.getElementById("itemCategory");
let parsedData;
async function createBrowseList() {
  const dataFromDatabase = await fetch("http://localhost:8080/view-items");
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
function filterBrowseList() {
  for (let i = 0; i < parsedData.length; i++) {
    const currElement = document.getElementById(`itemNo${i}`);
    console.log(itemFilterCategory.value);
    if (itemFilterCondition.value !== "") {
      if (currElement.children[1].textContent !== itemFilterCategory.value) {
        currElement.style.display = "none";
      } else {
        currElement.style.display = "block";
      }
    }
    if (itemFilterCondition.value !== "") {
      if (currElement.children[5].textContent !== itemFilterCondition.value) {
        currElement.style.display = "none";
      } else {
        currElement.style.display = "block";
      }
    }
  }
}
createBrowseList();

document.addEventListener("click", function () {
  filterBrowseList();
});
