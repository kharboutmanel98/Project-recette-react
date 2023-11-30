import Loading from "../../components/Loading/Loading";
import styles from "./Homepage.module.scss";
import Recipe from "./components/Recipe/Recipe";
// import { data } from "../../data/recipes";
import { useState } from "react";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const recipes = data;
  const [filter, setFilter] = useState("");
  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());
  }
  return (
    <div className="flex-fill container p-20 d-flex flex-column">
      <h1 className="my-30 ">Découvrez nos nouvelles recettes </h1>
      <div className={`card p-20 d-flex flex-column  flex-fill mb-20 ${styles.contentCard}  `}>
        <div
          className={`d-flex flex-row justify-content-center align-item-center my-30 ${styles.searchBar}`}
        >
          <i className="fa-solid fa-magnifying-glass mr-15"></i>
          <input
            type="text"
            placeholder="Rechercher"
            className="flex-fill"
            onInput={handleInput}
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.grid}>
            {recipes
              .filter((r) => r.title.toLowerCase().startsWith(filter))
              .map((r) => (
                <Recipe key={r._id} title={r.title} image={r.image} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
