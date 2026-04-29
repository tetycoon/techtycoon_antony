import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import all images from the horizontalmotion folder
import img1 from '../assets/horizantalmotion/My profession by AI.png';
import img2 from '../assets/horizantalmotion/My Profession by AI - 1.png';
import img3 from '../assets/horizantalmotion/a1862567-e08b-4c80-9096-7f120cb598a2.png';
import img4 from '../assets/horizantalmotion/a0e7c828-cdf8-4c95-88a6-527a1eb9fb7c.png';
import img5 from '../assets/horizantalmotion/a-striking-3d-render-of-a-futuristic-rec_KPENKYDOTZuf3Fv73Di-3g_62F7qY1VQ1KFeBXmHKlszQ.jpeg';
import img6 from '../assets/horizantalmotion/a-professional-3d-rendered-logo-design-f_id0YX7G7Rri5Apm8nPIxug_ykF_rzw_RZqSFn1NC7chnQ.jpeg';
import img7 from '../assets/horizantalmotion/a-photograph-of-a-sleek-polished-black-r_Tog1ErrHRiKhH7BAwdqeMg_vOmMW6CfTiWU_YQ0TSx0xg.jpeg';
import img8 from '../assets/horizantalmotion/a-photograph-of-a-polished-black-robotic_WIw-jZF9R9ihsKYgSNmedQ_vOmMW6CfTiWU_YQ0TSx0xg.jpeg';
import img9 from '../assets/horizantalmotion/a-meticulously-detailed-pencil-sketch-on_Js4ySFQ4QkuXtrVqD8L5IQ_kLtJogBwTHKtLMkBxg-O3Q.jpeg';
import img10 from '../assets/horizantalmotion/a-3d-rendered-logo-design-showcasing-tec_2a_jFYVWQv-B_wOHqUIieg_ykF_rzw_RZqSFn1NC7chnQ.jpeg';
import img11 from '../assets/horizantalmotion/a-3d-render-showcasing-a-vibrant-text-sc_cGx0gCx4THW7JG4AYe0K3A_EAM2Te2iT1m7UZ3hlQNNEw.jpeg';
import img12 from '../assets/horizantalmotion/990dcb9c-f30d-4f28-865a-e81e7c5df21c.png';
import img13 from '../assets/horizantalmotion/72138ae3-2726-4d1a-b4ca-5d46d801c467.png';
import img14 from '../assets/horizantalmotion/4d58429f-1a7d-4e78-98bf-4f4c3f626d5f.png';
import img15 from '../assets/horizantalmotion/24589f22-b5f0-4f2b-bd8e-a384ad6f361c.png';
import img16 from '../assets/horizantalmotion/11e3a6aa-fd1d-45a5-8870-3414e8205770.png';
import img17 from '../assets/horizantalmotion/02109c77-7dd6-4900-bede-b58c831fd7be.png';
import img18 from '../assets/horizantalmotion/111.jpeg';
import img19 from '../assets/horizantalmotion/112.jpeg';
import img20 from '../assets/horizantalmotion/113.jpeg';
import img21 from '../assets/horizantalmotion/114.jpeg';
import img22 from '../assets/horizantalmotion/115.jpeg';
import img23 from '../assets/horizantalmotion/116.jpeg';
import img24 from '../assets/horizantalmotion/117.jpeg';
import img25 from '../assets/horizantalmotion/118.jpeg';
import img26 from '../assets/horizantalmotion/119.jpeg';
import img27 from '../assets/horizantalmotion/120.jpeg';
import img28 from '../assets/horizantalmotion/121.jpeg';
import img29 from '../assets/horizantalmotion/122.jpeg';
import img30 from '../assets/horizantalmotion/123.jpeg';

const images = [
  // Newly added assets first
  img18, img19, img20, img21, img22, img23, img24, img25,
  img26, img27, img28, img29, img30,
  // Original assets follow
  img1, img2, img3, img4, img5, img6, img7, img8, img9, 
  img10, img11, img12, img13, img14, img15, img16, img17
];

const HorizontalScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });
  
  // Create duplicate arrays for seamless loop
  const allImages = [...images, ...images];
  
  // Calculate distance to animate based on image count and width
  const imageWidth = 400; // Account for width and gap for larger images
  const totalWidth = allImages.length * imageWidth;
  const distanceToMove = -(totalWidth / 2); // Only need to move half-way since we duplicated the images
  
  // Start/stop animation based on visibility
  React.useEffect(() => {
    if (inView) {
      controls.start({
        x: [0, distanceToMove],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
            repeatDelay: 0
          }
        }
      });
    } else {
      controls.stop();
    }
  }, [controls, distanceToMove, inView]);

  return (
    <div ref={ref} className="w-full overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Our Creatives</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">Explore our AI-generated designs and creative works</p>
      </div>
      
      <div ref={scrollRef} className="relative overflow-hidden px-6 py-8">
        <motion.div 
          className="flex gap-12 items-center"
          style={{
            willChange: 'transform',
          }}
          animate={controls}
        >
          {allImages.map((img, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 p-4 rounded-xl shadow-xl border-2 border-white dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800"
              style={{ maxWidth: '350px', maxHeight: '350px', width: 'auto', height: 'auto' }}
            >
              <img 
                src={img} 
                alt={`Creative portfolio item ${index + 1}`} 
                className="max-w-full max-h-full object-contain mx-auto my-auto" 
                style={{ maxWidth: '100%', maxHeight: '300px', display: 'block' }}
                loading={index < 6 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalScroll; 