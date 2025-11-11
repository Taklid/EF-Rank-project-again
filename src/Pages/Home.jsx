
import FuturePlayer from "./Future/FuturePlayer";
import Banner from "./PLAYERBanner/Banner";
import Food from "./PopulerMenu/Food";
import CategorySwiper from "./Share/Category/CategorySwiper";



const Home = () => {
    return (
        <div>
           <Banner></Banner>
          <CategorySwiper></CategorySwiper>
          <Food></Food>
           <FuturePlayer></FuturePlayer> 
        </div>
    );
};

export default Home;