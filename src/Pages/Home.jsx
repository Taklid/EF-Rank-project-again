import Banner from "./FoodBanner/Banner";
import FutureItem from "./Future/FutureItem";
import Food from "./PopulerMenu/Food";
import CategorySwiper from "./Share/Category/CategorySwiper";



const Home = () => {
    return (
        <div>
           <Banner></Banner>
          <CategorySwiper></CategorySwiper>
          <Food></Food>
          <FutureItem></FutureItem>
        </div>
    );
};

export default Home;