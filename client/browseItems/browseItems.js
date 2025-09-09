const browseContainer = document.getElementById("browseContainer");
async function createBrowseList() {
  const dataFromDatabase = await fetch(
    "https://relove-e3km.onrender.com/view-items"
  );
  const parsedData = await dataFromDatabase.json();
  for (let i = 0; i < parsedData.length; i++) {
    createCustomElement(
      parsedData[i].itemname,
      parsedData[i].itemcategory,
      parsedData[i].itemcondition,
      parsedData[i].itemdescription,
      parsedData[i].userlocation,
      parsedData[i].created_at
    );
  }
}
function createCustomElement(
  itemName,
  itemCategory,
  itemCondition,
  itemDescription,
  userLocation,
  date
) {
  const element = document.createElement("div");
  browseContainer.appendChild(element);
  const itemNameElement = document.createElement("h3");
  itemNameElement.textContent = itemName;
  const itemCategoryElement = document.createElement("h4");
  itemCategoryElement.textContent = itemCategory;
  const itemConditionElement = document.createElement("h4");
  itemConditionElement.textContent = itemCondition;
  const itemDescriptionElement = document.createElement("p");
  itemDescriptionElement.textContent = itemDescription;
  const userLocationElement = document.createElement("h4");
  userLocationElement.textContent = userLocation;
  const dateElement = document.createElement("h4");
  dateElement.textContent = date;

  element.appendChild(itemNameElement);
  element.appendChild(itemCategoryElement);
  element.appendChild(itemConditionElement);
  element.appendChild(itemDescriptionElement);
  element.appendChild(userLocationElement);
  element.appendChild(dateElement);
}
createBrowseList();
