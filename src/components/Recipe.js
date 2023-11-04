
import styles from "./Recipe.module.scss"
function Recipe({title, image})  {
  return (
    <div className={styles.recipe}>
    <div className={styles.imageContainer}>
        <img src={image} alt="recipe" />
        <div className={`${styles.recipeTitle} d-flex flex-row align-items-center justify-content-center`}>
            <h3>
              {title}
            </h3>
        </div>
    </div>
    </div>
  )
}

export default Recipe