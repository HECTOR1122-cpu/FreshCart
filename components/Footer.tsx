import React from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 text-gray-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl font-bold text-[#e67e22]">FreshCart</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              FreshCart Grocers is Pakistan's premier online grocery store. We deliver fresh organic produce, quality staples, and imported goods right to your doorstep.
            </p>
            <div className="flex items-center gap-2 text-sm mb-2">
               <Phone size={16} className="text-[#e67e22]" /> 
               <span>+92 300 1234567</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
               <Mail size={16} className="text-[#e67e22]" /> 
               <span>hello@freshcart.pk</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#e67e22] font-bold mb-6">Top Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#e67e22] transition-colors">Fruits & Vegetables</a></li>
              <li><a href="#" className="hover:text-[#e67e22] transition-colors">Dairy & Breakfast</a></li>
              <li><a href="#" className="hover:text-[#e67e22] transition-colors">Egg & Meat</a></li>
              <li><a href="#" className="hover:text-[#e67e22] transition-colors">Staples & Spices</a></li>
              <li><a href="#" className="hover:text-[#e67e22] transition-colors">Snacks & Beverages</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#e67e22] font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#e67e22] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#e67e22] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#e67e22] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#e67e22] transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#e67e22] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* App & Social */}
          <div>
            <h4 className="text-[#e67e22] font-bold mb-6">Download App</h4>
            <p className="text-sm mb-4">Get the FreshCart app for exclusive mobile-only deals.</p>
            <div className="flex flex-col gap-2 mb-6">
               <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 w-max hover:opacity-80 transition-opacity">
                  <div className="text-2xl"></div>
                  <div className="flex flex-col items-start leading-none">
                     <span className="text-[10px]">Download on the</span>
                     <span className="font-bold text-sm">App Store</span>
                  </div>
               </button>
               <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 w-max hover:opacity-80 transition-opacity">
                  <div className="text-xl">▶</div>
                  <div className="flex flex-col items-start leading-none">
                     <span className="text-[10px]">GET IT ON</span>
                     <span className="font-bold text-sm">Google Play</span>
                  </div>
               </button>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:bg-black transition-colors"><Facebook size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:bg-black transition-colors"><Twitter size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#e1306c] text-white flex items-center justify-center hover:bg-black transition-colors"><Instagram size={16} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} FreshCart Grocers Pakistan. All rights reserved.
          </p>
          <div className="flex gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
             <div className="h-6 w-10 bg-blue-600 rounded"></div> {/* Visa */}
             <div className="h-6 w-10 bg-red-500 rounded flex"><div className="w-1/2 bg-orange-500 h-full rounded-l"></div></div> {/* Mastercard */}
             <div className="h-6 w-10 bg-blue-400 rounded"></div> {/* Amex */}
             <div className="h-6 w-10 bg-green-500 rounded text-[8px] text-white flex items-center justify-center font-bold">COD</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;