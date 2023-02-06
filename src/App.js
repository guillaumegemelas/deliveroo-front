import "./App.css";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";

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
              Profitez de chaque plasir de la vie qutoidienne. Le pain Quotidien
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
            <div className="menu">
              <h2>{data.categories[0].name}</h2>
              <div className="test">
                <div className="composant">
                  <div className="firstColBloc">
                    <h3 className="title">
                      {data.categories[0].meals[0].title}
                    </h3>
                    <p className="description1">
                      {data.categories[0].meals[0].description}
                    </p>
                  </div>

                  <div className="priceAndPopular">
                    <p className="price">{data.categories[0].meals[0].price}</p>
                    <p>
                      {data.categories[0].meals[0].popular ? "popular⭐️" : ""}
                    </p>
                  </div>
                </div>
                <img
                  className="imgmenu"
                  src={data.categories[0].meals[0].picture}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
