import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group bg-white rounded-lg border border-gray-100 hover:border-[#e67e22]/30 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full relative">
      {/* Badges */}
      {discount > 0 && (
        <span className="absolute top-3 left-3 bg-[#e67e22] text-white text-[10px] font-bold px-2 py-1 rounded-sm z-10">
          {discount}%
        </span>
      )}
      
      {/* Image */}
      <div className="relative h-48 p-4 bg-white overflow-hidden flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow bg-white">
        <div className="mb-2 flex items-center justify-between">
           <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
             {product.category}
           </span>
           <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">
             IN STOCK
           </span>
        </div>

        <h3 className="font-heading font-bold text-[15px] text-[#2c3e50] mb-1 group-hover:text-[#e67e22] transition-colors line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[1,2,3,4,5].map(i => (
             <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-gray-400 ml-1">(4)</span>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
             {product.originalPrice && (
               <span className="text-xs text-gray-400 line-through">Rs. {product.originalPrice}</span>
             )}
             <span className="text-lg font-bold text-[#d51243]">Rs. {product.price}</span>
          </div>
          <button 
            onClick={handleAdd}
            className="bg-white border border-[#e67e22] text-[#e67e22] hover:bg-black hover:border-black hover:text-white text-xs font-bold uppercase px-4 py-2 rounded-full transition-colors active:scale-95 flex items-center gap-1"
          >
            Add <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;