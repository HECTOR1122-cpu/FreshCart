import React from 'react';
import { Truck, Users, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div 
        className="bg-[#2c3e50] text-white py-24 text-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About FreshCart</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Digitizing the neighborhood grocery experience for modern Pakistan.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&q=80&w=800" 
              alt="Our Story" 
              className="rounded-2xl shadow-lg w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-[#e67e22] mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2024, FreshCart Grocers started with a simple mission: to bridge the gap between local freshness and digital convenience. We realized that while e-commerce was booming in Pakistan, getting high-quality, fresh produce delivered reliably was still a challenge.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We partner directly with farmers in Punjab and Sindh to source our fruits and vegetables, ensuring that what lands on your table is as fresh as if you picked it yourself. No cold storage for weeks, no preservatives—just pure, natural goodness.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-green-50 rounded-xl">
            <div className="w-16 h-16 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Customer First</h3>
            <p className="text-gray-600">We believe in building relationships, not just processing orders. Our "No Questions Asked" return policy on perishables is proof of that.</p>
          </div>
          <div className="p-8 bg-orange-50 rounded-xl">
            <div className="w-16 h-16 bg-[#e67e22] text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Swift Delivery</h3>
            <p className="text-gray-600">Our fleet of riders ensures that your order reaches you within hours. We cover major areas in Lahore and are expanding fast.</p>
          </div>
          <div className="p-8 bg-blue-50 rounded-xl">
            <div className="w-16 h-16 bg-[#2c3e50] text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Community</h3>
            <p className="text-gray-600">We support local farmers by paying fair prices and helping them adopt modern farming techniques.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;