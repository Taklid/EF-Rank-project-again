import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";


import img1 from "../../assets/EF-Player-Pic/cr7.jpg";
import img2 from "../../assets/EF-Player-Pic/kaka.avif";
import img3 from "../../assets/EF-Player-Pic/messi-pic.jpg";
import img4 from "../../assets/EF-Player-Pic/pic-1.jpg";
import img5 from "../../assets/EF-Player-Pic/pic-2-c.jpg";
import img6 from "../../assets/EF-Player-Pic/rumi2.jpg";
import img7 from "../../assets/EF-New-Player-Pic/bonocci.avif";
import img8 from "../../assets/EF-New-Player-Pic/forlan-2.avif";
import img9 from "../../assets/EF-New-Player-Pic/nedvad.jpeg";
import img10 from "../../assets/EF-New-Player-Pic/turham-1.jpg";
import img11 from "../../assets/EF-New-Player-Pic/vvd.jpg";
import img12 from "../../assets/EF-New-Player-Pic/vanf.webp";
import img13 from "../../assets/EF-New-Player-Pic/roony.webp";

const Banner = () => {
  return (
    <div className="w-full mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={true}
        showThumbs={true}
        showIndicators={true}
        showStatus={true}
        interval={3000}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        useKeyboardArrows={true}
        dynamicHeight={false}
      >
        <div>
          <img className="" src={img1} alt="Slide 1" />
          
        </div>
        <div>
          <img src={img2} alt="Slide 2" />
        
        </div>
        <div>
          <img src={img3} alt="Slide 3" />
          
        </div>
        <div>
          <img src={img4} alt="Slide 4" />
     
        </div>
        <div>
          <img src={img5} alt="Slide 5" />
         
        </div>
        <div>
          <img src={img6} alt="Slide 6" />
        
        </div>
        <div>
          <img src={img7} alt="Slide 7" />
        
        </div>
        <div>
          <img src={img8} alt="Slide 8" />
        
        </div>
        <div>
          <img src={img9} alt="Slide 9" />
        
        </div>
        <div>
          <img src={img10} alt="Slide 10" />
        
        </div>
        <div>
          <img src={img11} alt="Slide 11" />
        
        </div>
        <div>
          <img src={img12} alt="Slide 12" />
        
        </div>
        <div>
          <img src={img13} alt="Slide 13" />
        
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
