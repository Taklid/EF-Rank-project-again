
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CategorySwiper.css"; // optional custom styles
import slied1 from '../../../assets/home/messi-1.jpg'
import slied2 from '../../../assets/home/messi-3.jpg'
import slied3 from '../../../assets/EF-Player-Pic/kaka.avif'
import slied4 from '../../../assets/EF-Player-Pic/cr7.jpg'
import slied5 from  '../../../assets/EF-Player-Pic/rumi2.jpg'
import slied6 from  '../../../assets/EF-New-Player-Pic/bonocci1.webp'
import slied7 from  '../../../assets/EF-New-Player-Pic/pedri.jpg'
import slied8 from  '../../../assets/EF-New-Player-Pic/pele.jpg'
import slied9 from  '../../../assets/EF-New-Player-Pic/philipp-lahm1.avif'
import slied10 from  '../../../assets/EF-New-Player-Pic/platini.jpg'
import slied11 from  '../../../assets/EF-New-Player-Pic/eto.jpg'
import slied12 from  '../../../assets/EF-New-Player-Pic/forlan-2.avif'


const CategorySwiper = () => {
  return (
    <>
    <div>
       <p className="text-center font-bold mt-8 bg-lime-500 w-[200px] mx-auto rounded-lg text-white py-2 shadow-[0_0_20px_#84cc16]">
  UWP CLUB
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
        <SwiperSlide>
              <img src={slied6} alt="" />
        </SwiperSlide>
        <SwiperSlide>
              <img src={slied7} alt="" />
        </SwiperSlide>
        <SwiperSlide>
              <img src={slied8} alt="" />
        </SwiperSlide>
        <SwiperSlide>
              <img src={slied9} alt="" />
        </SwiperSlide>
        <SwiperSlide>
              <img src={slied10} alt="" />
        </SwiperSlide>
        <SwiperSlide>
              <img src={slied11} alt="" />
        </SwiperSlide>
        <SwiperSlide>
              <img src={slied12} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
    </>
  );
};

export default CategorySwiper;
