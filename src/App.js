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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--delivery-backend--zqfvjrr4byql.code.run"
      );
      setData(response.data);
      setIsLoading(false);
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
        <div className="secondSectiontoMin">
          {isLoading ? (
            <p>En cours de chargement...</p>
          ) : (
            <div className="columnToWrap">
              {data.categories.map((element, num) => {
                console.log(element); // permettra de visualiser dans la console ce que représente `element`
                return (
                  <div key={num}>
                    <div>
                      <h2>{element.name}</h2>
                    </div>
                    <div className="columnToRow">
                      {" "}
                      {element.meals.map((elem, num2) => {
                        console.log(elem);
                        console.log(elem.name);

                        return (
                          <div key={num2}>
                            <Menu elem={elem} />
                          </div>
                        );
                      })}{" "}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
