import { data } from "./recipes";

export async function sendRecipes() {
  await fetch("https://restapi.fr/api/recipes", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
