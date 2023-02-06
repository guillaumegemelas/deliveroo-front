const Menu = ({ elem }) => {
  return (
    <div className="menu">
      {/* <h2>{element.name}</h2> */}

      <div className="test">
        <div className="composant">
          <div className="firstColBloc">
            <h3 className="title">{elem.title}</h3>
            <p className="description1">{elem.description}</p>
          </div>

          <div className="priceAndPopular">
            <p className="price">{elem.price}€</p>
            <p className="orange">{elem.popular ? "popular ✭" : ""}</p>
          </div>
        </div>
        <img className="imgmenu" src={elem.picture} alt="" />
      </div>
    </div>
  );
};

export default Menu;
