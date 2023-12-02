import { useContext } from "react";
import styles from "../Recipe.module.scss";
import { ApiContext } from "../../../../context/ApiContext";
// import { useState } from "react";

function Recipe({ recipe: { title, image, liked, _id }, togglelikedRecipe }) {
  // const [liked, setLiked] = useState(false);

  const BASE_URL_API = useContext(ApiContext);
  async function handleClick() {
    try {
      const response = await fetch(`${BASE_URL_API}/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify({ liked: !liked }),
      });
      if (response.ok) {
        const updatedRecipe = await response.JSON();
        togglelikedRecipe(updatedRecipe);
      }
    } catch (e) {
      console.log("ERROR");
    }
    // setLiked(!liked);
  }
  return (
    <div onClick={handleClick} className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={image} alt="recipe" />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-column align-items-center justify-content-center`}
      >
        <h3 className="mb-10">{title}</h3>
        <i className={`fa-solid fa-heart ${liked ? "text-primary" : " "}`}></i>
      </div>
    </div>
  );
}

export default Recipe;
