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

  const [counter, setCounter] = useState([0]);
  // const [tab, setTab] = useState([0]);

  //fonction pour stocker dans le tableau le contenu que l'on souhaite ajouter au panier-----------
  const handleSubmit = (elem) => {
    const newBasket = [...basket];

    newBasket.push({
      name: elem.title,
      price: elem.price,
      quantity: 1,
    });
    setBasket(newBasket); // je copie le state panier
    console.log(newBasket, "newbasket handlesubmit");
  };
  //-----------------------------------------------------

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
              Profitez de chaque plaisir de la vie quotidienne. Le pain
              Quotidien propose des ingrédients simples et sains, du bon pain,
              des fruits et des légumes frais et de saison issus de
              l’agriculture biologique.
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
                                  //lo log de l'ID propre à chaque elem:
                                  console.log(elem.id);
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
          <section className="secondColumn">
            <div className="basket">
              {basket.map((elem, num3) => {
                return (
                  <div key={num3}>
                    <div className="qtyAndPrice">
                      <div className="buttonsBasket">
                        <button
                          onClick={() => {
                            console.log("j'ai cliqué sur le -");
                            //   if (!elem.quantity) {
                            //     elem.quantity = 1;
                            //     setBasket(basket);
                            //   } else elem.quantity--;
                            //   setBasket(basket);
                          }}
                        >
                          -
                        </button>
                        <span> {elem.quantity + 1}</span>
                        <button
                          onClick={() => {
                            console.log("j'ai cliqué sur le +");
                            counter[num3]++;
                            setCounter(counter);
                            // const newCounter = [...counter];
                            // newCounter[index] = newCounter[index] + 1;
                            // setCounter(newCounter);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="nameAndPrice">
                        <div className="name">
                          <p>{elem.name}</p>
                        </div>
                        <div className="price1">
                          <p>{elem.price}€</p>
                        </div>
                        {/* <p>{elem.quantity}</p> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default App;
