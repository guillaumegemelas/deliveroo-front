import "./App.css";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";
import Menu from "./components/Menu";

import logo from "./img/logo-teal.svg";
import image1 from "./img/header-image.jpg";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //on va créer un state pour stocker le contenu du panier, à la base tableau vide
  const [basket, setBasket] = useState([]);

  //fonction pour stocker dans le tableau le contenu que l'on souhaite ajouter au panier
  const handleSubmit = (elem) => {
    // event.preventDefault();
    const newBasket = [...basket];
    newBasket.push({ name: elem });
    setBasket(newBasket);
  };

  const handleCheck = () => {
    const newBasket = [...basket];
    newBasket(newBasket);
  };
  //-----------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--delivery-backend--zqfvjrr4byql.code.run"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <section className="firstSection">
        <header className="head">
          <img src={logo} alt="" />
        </header>
        <div className="border"></div>
        <section className="description">
          <div className="col1">
            <h1>Le Pain Quotidien - Montorgueil</h1>
            <p>
              Profitez de chaque plasir de la vie quotidienne. Le pain Quotidien
              propose des ingrédients simples et sains, du bon pain, des fruits
              et des légumes frais et de saison issus de l’agriculture
              biologique.
            </p>
          </div>
          <div className="col2">
            <img src={image1} alt="" />
          </div>
        </section>
      </section>
      <section className="secondSection">
        <div className="global">
          <div className="secondSectiontoMin">
            {isLoading ? (
              <p>En cours de chargement...</p>
            ) : (
              <div className="columnToWrap">
                {/* on map sur la clé "catégories" de data */}
                {data.categories.map((element, num) => {
                  // if nécessaire pour éviter d'afficher le scatégories qui n'ont pas de menu
                  if (element.meals.length !== 0) {
                    // console.log(element); // permettra de visualiser dans la console ce que représente `element`
                    //dans ce cas, un tableau d'objet contenant "name" et "meals"
                    return (
                      <div key={num}>
                        <div>
                          {/* renvoie le type de menu: petit dej, brunch... */}
                          <h2>{element.name}</h2>
                        </div>
                        <div className="columnToRow">
                          {element.meals.map((elem, num2) => {
                            // console.log(elem);
                            // on map sur la clé meals et on renvoie les valeurs;

                            return (
                              <div
                                key={num2}
                                onClick={() => {
                                  console.log(elem);
                                  handleSubmit(elem);
                                }}
                              >
                                <Menu elem={elem} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  } else return null;
                })}
              </div>
            )}
          </div>
          {/* on passe à la seconde section, le panier qu'il va falloir incrémenter */}

          <div className="secondColumn">
            {basket.map((elem, index) => {
              return (
                <div key={index}>
                  <input
                    // value={elem.description}

                    key={index}
                    type="text"
                    onChange={() => {
                      handleSubmit(elem);
                    }}
                  />
                  <p>panier</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
