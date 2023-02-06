import "./App.css";

import logo from "./img/logo-teal.svg";
import image1 from "./img/header-image.jpg";

function App() {
  return (
    <div className="App">
      <header className="head">
        <img src={logo} alt="" />
      </header>
      <section className="description">
        <div className="col1">
          <h1>Le Pain Quotidien - Montorgueil</h1>
          <p>
            Profitez de chaque plasir de la vie qutoidienne. Le pain Quotidien
            propose des ingrédients simples et sains, du bon pain, des fruits et
            des légumes frais et de saison issus de l’agriculture biologique.
          </p>
        </div>
        <div className="col2">
          <img src={image1} alt="" />
        </div>
      </section>
    </div>
  );
}

export default App;
