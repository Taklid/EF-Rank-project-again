import featurImg from '../../assets/home/featured.jpg'
import './FutureDesigen.css'

const FutureItem = () => {
    return (
        <div className="future flex flex-col md:flex-row justify-center items-center gap-10 py-10">
            {/* Image Section */}
            <div className="flex justify-center">
                <img
                    className="w-[90%] md:w-[400px] h-[220px] md:h-[250px] rounded-xl shadow-lg"
                    src={featurImg}
                    alt="Featured"
                />
            </div>

            {/* Text Section */}
            <div className="text-white text-center md:text-left space-y-4 max-w-[400px] z-10">
                <p className="text-gray-200">Oct 25 —</p>
                <h2 className="text-2xl font-bold tracking-wide uppercase">Where Can I Get Some?</h2>
                <p className="text-gray-100 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsa culpa in at eveniet asperiores ipsam doloribus rerum aut totam. Minus.
                </p>
                <button className="mt-4 px-5 py-2 bg-lime-500 text-black font-semibold rounded-lg shadow-md hover:bg-lime-400 transition">
                    READ MORE
                </button>
            </div>
        </div>
    );
};

export default FutureItem;
