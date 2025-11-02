
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CategorySwiper.css"; // optional custom styles
import slied1 from '../../../assets/home/slide1.jpg'
import slied2 from '../../../assets/home/slide2.jpg'
import slied3 from '../../../assets/home/slide3.jpg'
import slied4 from '../../../assets/home/slide4.jpg'
import slied5 from  '../../../assets/home/slide5.jpg'
// import slied6 from'../../../assets/home/slide6.jpg'

const CategorySwiper = () => {
  return (
    <>
    <div>
       <p className="text-center font-bold mt-8 bg-lime-500 w-[200px] mx-auto rounded-lg text-white py-2 shadow-[0_0_20px_#84cc16]">
  MY FOOD
</p>

      
    </div>
    <div className="category-swiper-container mt-5">
       
      <Swiper
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,      // 3D rotation angle
          stretch: 0,      // spacing between slides
          depth: 100,      // depth of the effect
          modifier: 1,     // effect intensity
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slied1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
         <img src={slied2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
         <img src={slied3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
         <img src={slied4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
              <img src={slied5} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
    </>
  );
};

export default CategorySwiper;
