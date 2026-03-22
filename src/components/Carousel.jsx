import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import jaipur from "../assets/images/jaipur.jpg";
import kerala from "../assets/images/kerala.jpg";
import mumbai from "../assets/images/mumbai.jpg";
import rishikesh from "../assets/images/rishikesh.jpg";
import varanasi from "..//assets/images/varanasi.jpg";
import lucknow from "../assets/images/lucknow.jpg";
import Goa from "../assets/images/Goa.jpg";
import shimla from "../assets/images/shimla.jpg";
import delhi from "../assets/images/delhi.jpg";

export default function Carousel() {
  const navigate = useNavigate();
  const [tripInput, setTripInput] = useState("");

  const [showJoin, setShowJoin] = useState(false);
  const slides = [
  {
    img: jaipur,
    title: "EXPLORE JAIPUR",
    location: "Jaipur, India"
  },
  {
    img: kerala,
    title: "RELAX IN KERALA",
    location: "Kerala, India"
  },
  {
    img: mumbai,
    title: "EXPERIENCE MUMBAI",
    location: "Mumbai, India"
  },
  {
    img: rishikesh,
    title: "ADVENTURE IN RISHIKESh",
    location: "Rishikesh, India"
  },
  {
    img:varanasi,
    title: "DISCOVER VARANASI",
    location: "Varanasi, India"
  },
  {
    img: lucknow,
    title: "CULTURE OF LUCKNOW",
    location: "Lucknow, India"
  },
  {
    img: Goa,
    title: "PARTY IN GOA",
    location: "Goa, India"
  },
  {
    img: shimla,
    title: "CHILL IN SHIMLA",
    location: "Shimla, India"
  },
  {
    img:delhi,
    title: "HISTORY OF INDIA",
    location: "Delhi, India"
  }
];

  return (
    <div className="w-full h-screen" id="home">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            
            <div className="relative w-full h-screen">
              
              {/* IMAGE */}
              <img
                src={slide.img}
                className="w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

              {/* BOTTOM GRADIENT FADE */}
<div className="absolute bottom-0 left-0 w-full h-64 
bg-gradient-to-b from-transparent via-[#020617]/80 to-[#020617]">
</div>

              {/* TEXT */}
             <motion.div
  key={slide.title}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="absolute top-1/2 left-16 transform -translate-y-1/2 text-white max-w-xl"
>

  {/* LOCATION TAG */}
  <div className="mb-4 inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm">
    📍 {slide.location || "India"}
  </div>

  {/* MAIN TEXT */}
  <h1 className="text-6xl font-bold mb-4 leading-tight drop-shadow-lg ">
    {slide.title}
  </h1>

  <p className="text-lg mb-8 text-gray-200">
    Discover amazing experiences tailored for your group.
  </p>

</motion.div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-6"></div>
{/* heading */}
      {/* FIXED BUTTONS */}
<div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-40 flex gap-4">

  {/* CREATE */}
  <button className="px-6 py-2 rounded-full bg-orange-500 text-white 
hover:bg-orange-600 
hover:shadow-[0_0_25px_rgba(249,115,22,0.6)]
transition duration-300" onClick={() => {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  navigate("/preferences", { state: { tripCode: code } });
}}>
    Create Trip
  </button>

  {/* JOIN */}
  <button className="px-6 py-2 rounded-full border border-white/30 text-white 
hover:border-cyan-400 hover:text-cyan-400 
hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]
transition duration-300" onClick={() => {
  navigate("/joinTrip", { state: { tripCode: tripInput } });
}}>
    Join Trip
  </button>

</div>

      {showJoin && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    <div className="bg-[#0b1a1f] p-8 rounded-xl w-96 text-center">

      <h2 className="text-xl font-bold mb-4">Join a Trip</h2>

      <input
        type="text"
        placeholder="Enter Trip Code"
        className="w-full px-4 py-2 mb-4 bg-black/30 border border-gray-600 rounded"
      />

      <button className="w-full bg-[#22d3ee] text-black py-2 rounded mb-2">
        Join
      </button>

      <button onClick={() => setShowJoin(false)} className="text-gray-400">
        Cancel
      </button>

    </div>

  </div>
)}
    </div>
  );
}