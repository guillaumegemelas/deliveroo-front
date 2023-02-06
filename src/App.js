import "./App.css";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";

import logo from "./img/logo-teal.svg";
import image1 from "./img/header-image.jpg";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--delivery-backend--zqfvjrr4byql.code.run"
      );
      setData(response.data);
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
        <div>{data.restaurant.path}</div>
      </section>
    </div>
  );
}

export default App;
