import Loading from "../../components/Loading/Loading";
import { ApiContext } from "../../context/ApiContext";
import styles from "./Homepage.module.scss";
import Recipe from "./components/Recipe/Recipe";
import { useContext, useEffect, useState } from "react";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState([1]);
  const BASE_URL_API = useContext(ApiContext);

  //useEffect
  useEffect(() => {
    let cancel = false;
    async function fetchRecipes() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL_API}?skip=${(page-1)*18}&limit=18 `);
        if (response.ok && !cancel) {
          const newRecipes = await response.json();
          setRecipes((x) => Array.isArray(newRecipes) ? [...x, ...newRecipes] : [...recipes, ...x]);
        }
      } catch (e) {
        console.log("ERROR");
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    fetchRecipes();
    return () => (cancel = true);
  }, [BASE_URL_API,page]);

  function updateRecipe(updateRecipe) {
    setRecipes(
      recipes.map((r) => (r._id === updateRecipe._id ? updateRecipe : r))
    );
  }
  function handleInput(e) {
    const filter = e.target.value;
    setFilter(filter.trim().toLowerCase());

    function handleClickLoadMoreRecipes() {

    }
  }
  return (
    <div className="flex-fill container p-20 d-flex flex-column">
      <h1 className="my-30 ">Découvrez nos nouvelles recettes <small className={styles.small}>{recipes.length}</small> </h1>
      <div
        className={`card p-20 d-flex flex-column  flex-fill mb-20 ${styles.contentCard}  `}
      >
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
                <Recipe
                  key={r._id}
                  recipe={r}
                  toggleLikedRecipe={updateRecipe}
                />
              ))}
          </div>
        )}
        <div className="d-flex flex-row justify-content-center align-items-center p-20">
          <button
            className="btn btn-primary"
            onClick={()=>setPage(page+1)}
          >
            Charger Plus de Recettes
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
