import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter products
  const discountedProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 5);
  const fruitVegProducts = products.filter(p => p.category === 'Fruits' || p.category === 'Vegetables').slice(0, 8);
  const dairyProducts = products.filter(p => p.category === 'Dairy' || p.category === 'Staples').slice(0, 5);

  const slides = [
    {
      id: 1,
      bg: "bg-white",
      // Mixed Fruit & Veg image for the 100% Natural slide
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=1200",
      title1: "100%",
      title2: "Natural",
      subtitle: "Quality & Freshness",
      footer: "Guaranteed! Good Health.",
      accent: "text-green-600",
      buttonBg: "bg-[#e67e22]"
    },
    {
      id: 2,
      bg: "bg-[#fcfdfd]",
      // Vegetable image
      image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=1200",
      title1: "Farm",
      title2: "Fresh",
      subtitle: "Organic Vegetables",
      footer: "Direct from the fields.",
      accent: "text-[#e67e22]",
      buttonBg: "bg-green-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Slider */}
            <div className="lg:w-2/3 relative rounded-2xl overflow-hidden h-[350px] md:h-[450px] shadow-sm group border border-gray-100 bg-white">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${slide.bg}`}
                >
                  <div className="w-full h-full flex items-center relative overflow-hidden">
                    {/* Text Content */}
                    <div className="w-full md:w-1/2 z-20 pl-8 md:pl-16 pr-4 animate-fade-in-up flex flex-col justify-center h-full relative">
                      {/* Decorative leaf/icon could go here */}
                      <h2 className="text-5xl md:text-7xl font-heading font-bold text-gray-800 leading-none mb-2 tracking-tight">
                        {slide.title1} <span className="text-[#e67e22]">{slide.title2}</span>
                      </h2>
                      <p className={`text-xl md:text-3xl font-bold mb-2 ${slide.accent}`}>
                        {slide.subtitle}
                      </p>
                      <p className="text-lg text-gray-400 font-medium mb-8 tracking-wide">
                        {slide.footer}
                      </p>

                      <Link
                        to="/shop"
                        className={`inline-flex items-center gap-2 ${slide.buttonBg} text-white px-8 py-4 rounded-full font-bold text-sm shadow-lg transform hover:-translate-y-1 hover:bg-black transition-all w-max`}
                      >
                        SHOP NOW <ArrowRight size={18} />
                      </Link>
                    </div>

                    {/* Image with Diagonal Clip - The "Groci" look */}
                    <div
                      className="absolute right-0 top-0 bottom-0 w-[60%] h-full z-10 hidden md:block"
                      style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    >
                      <img
                        src={slide.image}
                        alt="Hero"
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-[2000ms]"
                      />
                      {/* Optional gradient overlay for better integration if needed */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Mobile Image Fallback (Background) */}
                    <div className="absolute inset-0 z-0 md:hidden opacity-10">
                      <img src={slide.image} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Dots */}
              <div className="absolute bottom-8 left-8 md:left-16 flex gap-2 z-20">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-[#e67e22] w-8' : 'bg-gray-200 w-2 hover:bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>

            {/* Side Banners */}
            <div className="lg:w-1/3 flex flex-col gap-6 h-auto md:h-[450px]">
              {/* Banner 1 */}
              <div className="relative flex-1 bg-[#fff8e5] rounded-xl overflow-hidden p-6 flex items-center shadow-sm border border-[#fce9bd] group">
                <div className="z-10 w-2/3">
                  <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Aromatic Flavors</p>
                  <h3 className="text-xl font-bold text-[#e67e22] mb-1">Spices</h3>
                  <p className="text-sm text-gray-600 mb-3">Turmeric, Chili & more</p>
                  <Link to="/shop" className="text-xs font-bold text-[#e67e22] hover:underline flex items-center gap-1">Shop Now <ArrowRight size={12} /></Link>
                </div>
                <img src="https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?q=80&w=1123&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="absolute right-0 bottom-0 w-1/2 h-full object-cover mask-image-gradient group-hover:scale-105 transition-transform" alt="Spices" />
              </div>


              {/* Banner 2 */}
              <div className="relative flex-1 bg-[#eaf4f4] rounded-xl overflow-hidden p-6 flex items-center shadow-sm border border-[#d3e9e9] group">
                <div className="z-10 w-2/3">
                  <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Daily Essentials</p>
                  <h3 className="text-xl font-bold text-[#e67e22] mb-1">Oil & Ghee</h3>
                  <p className="text-sm text-gray-600 mb-3">Up to 15% OFF</p>
                  <Link to="/shop" className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1">Shop Now <ArrowRight size={12} /></Link>
                </div>
                <img src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300" className="absolute right-0 bottom-0 w-1/2 h-full object-cover mask-image-gradient group-hover:scale-105 transition-transform" alt="Oil" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Savers / Discount Row */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#e67e22] uppercase">Top Savers Today</h2>
              <p className="text-xs text-gray-500 mt-1">Don't miss these limited time offers</p>
            </div>
            <div className="flex gap-2 text-xs font-bold text-white">
              <div className="bg-[#d51243] px-3 py-1 rounded">02 <span className="text-[10px] font-normal opacity-80">Days</span></div>
              <div className="bg-[#d51243] px-3 py-1 rounded">14 <span className="text-[10px] font-normal opacity-80">Hours</span></div>
              <div className="bg-[#d51243] px-3 py-1 rounded">32 <span className="text-[10px] font-normal opacity-80">Mins</span></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {discountedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Fruits & Veggies Section */}
      <section className="py-8 bg-[#f7f8fd]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#e67e22]">Fruits & Vegetables</h2>
            <Link to="/shop" className="text-xs font-bold text-gray-500 border border-gray-300 rounded-full px-4 py-1 hover:bg-[#e67e22] hover:text-white hover:border-[#e67e22] transition-colors">View All</Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Banner for Category */}
            <div className="hidden lg:block relative rounded-lg overflow-hidden h-full min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400" className="absolute inset-0 w-full h-full object-cover" alt="Fruits" />
              <div className="absolute inset-0 bg-black/20 p-6 flex flex-col justify-start">
                <h3 className="text-2xl font-bold text-white mb-2">Fresh <br />Orchard</h3>
                <p className="text-white/90 text-sm mb-4">Direct from farm to your home.</p>
                <button className="bg-white text-[#e67e22] text-xs font-bold px-4 py-2 rounded-full w-max hover:bg-black hover:text-white transition-colors">Shop Now</button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-span-1 lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {fruitVegProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wide Banner */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="rounded-xl overflow-hidden relative h-48 md:h-64 bg-[#eef5e5] flex items-center">
            <div className="container relative z-10 px-8 md:px-16 w-full md:w-1/2">
              <span className="bg-[#e67e22] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">Free Delivery</span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#e67e22] mb-2">Organic Food</h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">Get free delivery on all organic food orders over Rs. 3000</p>
              <Link to="/shop" className="bg-[#e67e22] text-white font-bold py-3 px-8 rounded-full text-sm hover:bg-black transition-colors inline-block">Shop Now</Link>
            </div>
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" className="absolute right-0 top-0 h-full w-2/3 object-cover object-left mask-image-gradient-left" alt="Organic" />
          </div>
        </div>
      </section>

      {/* Dairy & Staples Section */}
      <section className="py-8 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#e67e22]">Breakfast & Dairy</h2>
            <Link to="/shop" className="text-xs font-bold text-gray-500 border border-gray-300 rounded-full px-4 py-1 hover:bg-[#e67e22] hover:text-white hover:border-[#e67e22] transition-colors">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {dairyProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#e67e22] py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white font-bold uppercase tracking-widest text-xs mb-2">Get 20% Off Your First Order</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Newsletter</h2>
          <p className="text-gray-100 mb-8 text-sm max-w-lg mx-auto">Join our email subscription now to get updates on promotions and coupons.</p>

          <div className="bg-white p-2 rounded-lg max-w-md mx-auto flex">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 text-gray-700 outline-none" />
            <button className="bg-[#e67e22] text-white px-6 py-3 rounded-md font-bold text-sm hover:bg-black transition-colors">Subscribe</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;