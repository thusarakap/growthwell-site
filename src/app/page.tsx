"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string; // Ensure there's an image property
}

const carouselImages = [
  { id: 1, src: "/images/banner.webp", alt: "Banner 1" },
  { id: 2, src: "/images/banner.webp", alt: "Banner 2" },
  { id: 3, src: "/images/banner.webp", alt: "Banner 3" },
];

const products = [
  {
    id: 1,
    name: "Product 1",
    image: "/images/product1.webp",
    description: "Description of Product 1.",
  },
  {
    id: 2,
    name: "Product 2",
    image: "/images/product2.webp",
    description: "Description of Product 2.",
  },
  {
    id: 3,
    name: "Product 3",
    image: "/images/product3.webp",
    description: "Description of Product 3.",
  },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleProductClick = (product:any) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        setIsAnimating(false);
      }, 1000); // duration of the fade out animation
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Scroll-triggered animation handlers
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: productsRef, inView: productsInView } = useInView({ triggerOnce: true });
  const { ref: bestRef, inView: bestInView } = useInView({ triggerOnce: true });
  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true });
  const { ref: tipsRef, inView: tipsInView } = useInView({ triggerOnce: true });
  const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true });

  const bounceEffect = {
    y: ["0%", "-10%", "0%", "10%", "0%"],
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="w-full relative">
        <div className="w-full h-0 pb-[28%] relative bg-cover bg-center">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${carouselImages[currentImageIndex].src})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: heroInView ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            key={currentImageIndex}
          ></motion.div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? "bg-blue-400" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} className="w-full flex flex-col items-center py-20 bg-gray-100 bg-green">
        <motion.h2
          className="text-6xl font-semibold mb-10 text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: productsInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Products
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-10">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="relative"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleProductClick(product)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: productsInView ? 1 : 0, y: productsInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="rounded-lg cursor-pointer w-60 h-80 object-cover shadow-lg bg-gray-200 bg-gray-800 bg-opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: productsInView ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
              <motion.p
                className="absolute bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-50 text-white px-4 py-2 rounded-b-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: productsInView ? 1 : 0, y: productsInView ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                {product.name}
              </motion.p>
            </motion.div>
          ))}
        </div>
        <Link
          href="/shop"
          className="mt-10 px-6 py-3 bg-gray-900 bg-opacity-90 text-white rounded-full shadow-md hover:bg-gray-900 duration-300"
        >
          Shop Now
        </Link>
      </section>

      {/* Expanded Product Modal */}
      {selectedProduct && (
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="bg-neutral-900 bg-opacity-95 text-white  p-6 rounded-lg shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="rounded-lg w-80 h-70 object-cover"
            />
            <h3 className="text-xl font-medium mt-4">{selectedProduct.name}</h3>
            <p className="mt-2">{selectedProduct.description}</p>
          </motion.div>
        </motion.div>
      )}

      {/* Best Section */}
      <section ref={bestRef} className="w-full flex flex-col items-center py-20 bg-gray-100">
        <motion.div
          className="flex flex-row items-center gap-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: bestInView ? 1 : 0, scale: bestInView ? 1 : 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-6xl font-bold text-center ">Only the best <br /> for <br /> your pets.</p>
          <motion.img className="mr-10 ml-10 mb-10 rounded-3xl shadow-xl"
              src="/images/onlyBest.webp"
              width={700}
              alt="factory"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: bestInView ? 1 : 0, y: bestInView ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />        
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="w-full flex flex-col items-center mt-10 bg-white">
        <motion.h2
          className="text-6xl subpixel-antialiased font-semibold mb-10 text-blue-500 text-left ml-11"
          initial={{ opacity: 0 }}
          animate={{ opacity: aboutInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
        <div className="flex flex-row items-center">
          <section>
            <motion.img className="mr-10 ml-10  mb-10 rounded-3xl shadow-xl"
              src="/images/factory.webp"
              width={700}
              alt="factory"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </section>
          <motion.div
            className="text-lg text-gray-600 max-w-3xl text-left pl-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-3xl">
              Growthwell is committed to innovation and excellence in animal
              nutrition.
            </p>
            <br />
            <p className="text-3xl text-black">
              Our mission is to provide top-notch supplements that
              promote the health and longevity of your animals.
            </p>
            <br />
            <p className="text-3xl">
            With years of experience and a dedicated team of experts,
            we strive to bring you the best in animal care.
            </p>
          </motion.div>
        </div>
        <div className="flex flex-row items-center">
        <motion.div
            className="text-lg text-gray-600 max-w-3xl text-left pl-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-3xl">
              Growthwell is committed to innovation and excellence in animal
              nutrition.
            </p>
            <br />
            <p className="text-3xl text-black">
              Our mission is to provide top-notch supplements that
              promote the health and longevity of your animals.
            </p>
            <br />
            <p className="text-3xl">
            With years of experience and a dedicated team of experts,
            we strive to bring you the best in animal care.
            </p>
          </motion.div>
          <section>
            <motion.img className="mr-10 ml-10 mb-10 rounded-3xl shadow-xl"
              src="/images/factory.webp"
              width={700}
              alt="factory"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: aboutInView ? 1 : 0, y: aboutInView ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </section>
        </div>
      </section>

      {/* Tips Section */}
      <section ref={tipsRef} className="w-full flex flex-col items-center py-20 bg-gray-100">
        <motion.h2
          className="text-6xl font-semibold mb-10 text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: tipsInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          Helpful Tips
        </motion.h2>
        <motion.div
          className=""
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: tipsInView ? 1 : 0, scale: tipsInView ? 1 : 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-10">
            <div className="w-80 h-80 bg-gray-300 rounded-lg shadow-lg"></div>
            <div className="w-80 h-80 bg-gray-300 rounded-lg shadow-lg"></div>
            <div className="w-80 h-80 bg-gray-300 rounded-lg shadow-lg"></div>
            <div className="w-80 h-80 bg-gray-300 rounded-lg shadow-lg"></div>
          </div>
        </motion.div>
      </section>

      <section className="relative overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-100 to-white opacity-20"></div>
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left transform skew-x-[-30deg] bg-white shadow-xl ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h2 className="text-6xl font-semibold text-center text-green-600">Testimonials</h2>
        <figure className="mt-10 text-center">
          <blockquote className="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>“Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.”</p>
          </blockquote>
          <figcaption className="mt-10">
            <img className="mx-auto h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Judith Black" />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">Judith Black</div>
              <svg className="w-3 h-3 fill-current text-gray-900" viewBox="0 0 2 2" aria-hidden="true">
                <circle cx="1" cy="1" r="1" />
              </svg>
              <div className="text-gray-600">CEO of Workcation</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>

      

      {/* Made in Sri Lanka Banner Section */}
      <section>
        <Image
          src="/images/madeInSL.webp"
          alt="Landscape picture"
          width={1500}
          height={100}
        />
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="w-full flex flex-col items-center py-20 bg-gray-100">
        <motion.h2
          className="text-3xl font-semibold mb-10 text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: contactInView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h2>
        <motion.form
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: contactInView ? 1 : 0, scale: contactInView ? 1 : 0.9 }}
          transition={{ duration: 0.5 }}
        >
          {/* Contact form content */}
          <div className="flex flex-col gap-6 items-center">
            {/* Hotline */}
            <div className="flex flex-col items-center text-lg">
              <span className="text-3xl font-bold text-gray-900">HOTLINE:</span>
              <a
                href="tel:+94741202084"
                className="ml-2 pt-2 text-xl text-blue-500"
              >
                +94741202084
              </a>
            </div>
            <div className="flex items-center text-lg">
              <FontAwesomeIcon icon={faPhone} className="text-gray-900 mr-2" />
              <span className="font-bold text-gray-900">Landline:</span>
              <a href="tel:+94741202084" className="ml-2 text-blue-500">
                +94741202084
              </a>
            </div>
            <div className="flex items-center text-lg">
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="text-green-500 mr-2"
              />
              <span className="font-bold text-gray-900">WhatsApp:</span>
              <a href="tel:+94741202084" className="ml-2 text-blue-500">
                +94741202084
              </a>
            </div>
          </div>
        </motion.form>
      </section>

      {/* Bottom Bounce Effect */}
      <div className="scroll-bounce-bottom"></div>
      <div className="scroll-bounce-top"></div>
    </main>
  );
}
