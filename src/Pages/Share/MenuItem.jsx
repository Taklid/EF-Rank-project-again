
const MenuItem = ({item}) => {
    const {name, image, price, recipe} = item;

    return (
        <div className="mt-10">
            <img src={image} alt="" />
            <div>
                <h3>{name}---------</h3>
                <p>{recipe}</p>
            </div>
            <p>{price}</p>
        </div>
    );
};

export default MenuItem;