const Menu = ({ data }) => {
  return (
    <div className="menu">
      <h2>{data.categories[0].name}</h2>
      <div className="test">
        <div className="composant">
          <div className="firstColBloc">
            <h3 className="title">{data.categories[0].meals[0].title}</h3>
            <p className="description1">
              {data.categories[0].meals[0].description}
            </p>
          </div>

          <div className="priceAndPopular">
            <p className="price">{data.categories[0].meals[0].price}</p>
            <p>{data.categories[0].meals[0].popular ? "popular⭐️" : ""}</p>
          </div>
        </div>
        <img
          className="imgmenu"
          src={data.categories[0].meals[0].picture}
          alt=""
        />
      </div>
    </div>
  );
};

export default Menu;
