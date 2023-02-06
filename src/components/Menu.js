const Menu = ({ data, index }) => {
  return (
    <div className="menu">
      <h2>{data.categories[index].name}</h2>
      <div className="test">
        <div className="composant">
          <div className="firstColBloc">
            <h3 className="title">
              {data.categories[index].meals[index].title}
            </h3>
            <p className="description1">
              {data.categories[index].meals[index].description}
            </p>
          </div>

          <div className="priceAndPopular">
            <p className="price">
              {data.categories[index].meals[index].price}€
            </p>
            <p>
              {data.categories[index].meals[index].popular ? "popular⭐️" : ""}
            </p>
          </div>
        </div>
        <img
          className="imgmenu"
          src={data.categories[index].meals[index].picture}
          alt=""
        />
      </div>
    </div>
  );
};

export default Menu;
