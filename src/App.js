import "./App.css";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";
import Menu from "./components/Menu";

import logo from "./img/logo-teal.svg";
import min from "./img/min.png";
import plus from "./img/plus.png";
import image1 from "./img/header-image.jpg";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //on va créer un state pour stocker le contenu du panier, à la base tableau vide
  const [basket, setBasket] = useState([]);

  //---------fonction pour stocker dans le tableau le contenu que l'on souhaite ajouter au panier-----------
  const handleSubmit = (elem) => {
    //je dois vérifier si le plat sur lequel je clqiue est déjà dans le panier
    const newBasket = [...basket];

    let isPresent = false;
    for (let i = 0; i < newBasket.length; i++) {
      if (newBasket[i].id === elem.id) {
        newBasket[i].quantity++;
        isPresent = true;
        break;
      }
    }
    if (isPresent === false) {
      const basketCopy = { ...elem, quantity: 1 };
      newBasket.push(basketCopy);
    }

    setBasket(newBasket); // je copie le state panier
    console.log(newBasket, "newbasket handlesubmit");
  };
  //-----------------------------------------------------
  // pour supprimer l'éléménent dans le panier: avec la méthode find()
  const handleRemove = (elem) => {
    const newBasket = [...basket];
    const elemInBasket = newBasket.find((item) => item.id === elem.id);

    //si clé qty vaut 1, je l'enlève du panier
    if (elemInBasket.quantity === 1) {
      const index = newBasket.indexOf(elemInBasket);
      newBasket.splice(index, 1);
    } else {
      //sinon je décrémente sa clé qty
      elemInBasket.quantity--;
    }
    setBasket(newBasket);
  };
  //---------------------------------------------------------
  //TOTAL Price: pas besoin d'utiliser de state pour cela, se rafraichit à chaque
  //changement
  //en notion avancé, on pourrait faire total dans la second .map, ce qui
  //éviterait le faire une boucle for ici (plus dry)

  let total = 0;
  for (let i = 0; i < basket.length; i++) {
    total += basket[i].price * basket[i].quantity;
  }

  //----------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-back--zqfvjrr4byql.code.run/"
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
                        <div className="h2menu">
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
            {/* {basket.length ===0 ? "Votre Panier est vide" : div} */}
            <div className="basket">
              <div className={basket.length === 0 ? "validate" : "validate1"}>
                valider mon panier
              </div>
              {basket.map((elem) => {
                return (
                  <div key={elem.id}>
                    <div className="qtyAndPrice">
                      <div className="buttonsBasket">
                        <button
                          onClick={() => {
                            console.log("j'ai cliqué sur le -");
                            handleRemove(elem);
                          }}
                        >
                          <img src={min} alt="" />
                        </button>
                        <span> {elem.quantity}</span>
                        <button
                          onClick={() => {
                            console.log("j'ai cliqué sur le +");
                            handleSubmit(elem);
                          }}
                        >
                          <img src={plus} alt="" />
                        </button>
                      </div>
                      <div className="nameAndPrice">
                        <div className="name">
                          <p>{elem.title}</p>
                        </div>
                        <div className="price1">
                          <p>{(elem.price * elem.quantity).toFixed(2)}€</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div></div>
              {basket.length > 0 && (
                <div className="totalPrice">
                  <p className="tot1">Total: </p>
                  <p className="tot2">{total.toFixed(2)}€</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default App;
