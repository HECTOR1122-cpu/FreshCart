import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, MapPin, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Main Header - White */}
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo & Location */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex flex-col">
                <span className="text-2xl font-heading font-bold text-[#e67e22] leading-none">FreshCart</span>
                <span className="text-[10px] text-gray-500 tracking-widest font-bold uppercase">Online Grocery</span>
              </div>
            </Link>

            <div className="hidden xl:flex items-center gap-2 bg-[#f3f4f7] px-4 py-2 rounded-md border border-gray-200 cursor-pointer hover:border-[#e67e22] transition-colors">
              <MapPin size={16} className="text-gray-500" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 leading-none">Deliver to</span>
                <span className="text-xs font-bold text-[#e67e22] flex items-center gap-1">Lahore, PK <ChevronDown size={10} /></span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearch} className="relative flex items-center bg-[#f3f4f7] rounded-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#e67e22]/20 focus-within:border-[#e67e22] transition-all">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products (e.g. 'Mango', 'Milk')..." 
                className="w-full bg-transparent px-5 py-3 text-sm text-gray-700 focus:outline-none"
              />
              <button type="submit" className="bg-[#e67e22] text-white px-6 py-3 transition-colors hover:bg-black">
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
             <Link to="/contact" className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-[#f3f4f7] text-[#e67e22] hover:bg-black hover:text-white transition-colors">
               <User size={20} />
             </Link>
             <div className="hidden lg:block text-xs">
                <p className="text-gray-500">Sign In</p>
                <p className="font-bold text-[#e67e22]">Account</p>
             </div>

             <Link to="/cart" className="relative flex items-center gap-3 px-4 py-2 bg-[#fff1ee] rounded-full text-[#d51243] hover:bg-black hover:text-white transition-colors group">
                <div className="relative">
                  <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#eb2606] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="font-bold text-sm hidden sm:block">Cart</span>
             </Link>

             <button 
              className="md:hidden text-[#e67e22]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between">
           <div className="flex items-center gap-8">
              {/* All Categories Button */}
              <div className="relative group cursor-pointer">
                 <div className="bg-[#e67e22] text-white px-6 py-3 flex items-center gap-3 rounded-t-lg min-w-[200px] font-bold text-sm tracking-wide hover:bg-black transition-colors">
                    <Menu size={18} />
                    ALL CATEGORIES
                    <ChevronDown size={14} className="ml-auto" />
                 </div>
                 {/* Dropdown Placeholder */}
                 <div className="absolute top-full left-0 w-full bg-white shadow-xl border border-gray-100 rounded-b-lg py-2 hidden group-hover:block z-50">
                    {['Fruits & Vegetables', 'Dairy & Breakfast', 'Staples', 'Spices'].map(cat => (
                       <Link key={cat} to="/shop" className="block px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#e67e22] transition-colors">{cat}</Link>
                    ))}
                 </div>
              </div>

              {/* Main Links */}
              <nav className="flex items-center gap-1">
                 <Link to="/" className={`text-sm font-bold tracking-wide uppercase px-4 py-3 hover:text-[#e67e22] transition-colors flex items-center gap-1 ${location.pathname === '/' ? 'text-[#e67e22]' : 'text-gray-500'}`}>
                    Home
                 </Link>
                 <Link to="/shop" className={`text-sm font-bold tracking-wide uppercase px-4 py-3 hover:text-[#e67e22] transition-colors flex items-center gap-1 ${location.pathname === '/shop' ? 'text-[#e67e22]' : 'text-gray-500'}`}>
                    Shop
                 </Link>
                 <Link to="/recipes" className={`text-sm font-bold tracking-wide uppercase px-4 py-3 hover:text-[#e67e22] transition-colors flex items-center gap-1 ${location.pathname === '/recipes' ? 'text-[#e67e22]' : 'text-gray-500'}`}>
                    Recipes
                 </Link>
                 <Link to="/about" className={`text-sm font-bold tracking-wide uppercase px-4 py-3 hover:text-[#e67e22] transition-colors flex items-center gap-1 ${location.pathname === '/about' ? 'text-[#e67e22]' : 'text-gray-500'}`}>
                    About
                 </Link>
                 <Link to="/contact" className={`text-sm font-bold tracking-wide uppercase px-4 py-3 hover:text-[#e67e22] transition-colors flex items-center gap-1 ${location.pathname === '/contact' ? 'text-[#e67e22]' : 'text-gray-500'}`}>
                    Contact
                 </Link>
              </nav>
           </div>
           
           <div className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-black text-white px-3 py-1 rounded-full animate-pulse">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span> Only Weekend Updates
           </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 fixed w-full h-full z-50 top-[70px] left-0 overflow-y-auto pb-20">
          <div className="p-4">
            <div className="mb-6">
                <form onSubmit={handleSearch}>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..." 
                    className="w-full bg-gray-100 px-4 py-3 rounded-lg text-sm focus:outline-none"
                  />
                </form>
            </div>
            <div className="flex flex-col gap-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 border-b border-gray-50 font-semibold text-[#e67e22]">Home</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 border-b border-gray-50 font-semibold text-gray-600">Shop Catalog</Link>
              <Link to="/recipes" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 border-b border-gray-50 font-semibold text-gray-600">Recipes</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 border-b border-gray-50 font-semibold text-gray-600">About Us</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 border-b border-gray-50 font-semibold text-gray-600">Contact</Link>
            </div>
            <div className="mt-8 px-4">
               <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">Contact Info</h4>
               <p className="text-sm text-gray-600 mb-2">+92 300 1234567</p>
               <p className="text-sm text-gray-600">hello@freshcart.pk</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;