import cors from "cors";
import express, { text } from "express";
import { db } from "./dbConnections.js";
const app = express();
app.use(express.json());
app.use(cors());
const port = 8080;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
app.get("/", function (request, response) {
  homePage(request, response);
});
app.get("/submit-item", function (request, response) {});
app.post("/submit-item", function (request, response) {
  submitItem(request, response);
});
app.get("/view-items", async function (request, response) {
  viewItems(request, response);
});
async function homePage(request, response) {}
async function submitItem(request, response) {
  const body = request.body;
  console.log(body.formData.itemName);
  response.json("submission received");
}
async function viewItems(request, response) {}
