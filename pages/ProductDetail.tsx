import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, ArrowLeft, Info, Leaf } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'nutrition'>('description');

  const product = products.find(p => p.id === id);

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
    setActiveTab('description');
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="text-brand-green hover:underline">Return to Shop</button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    // Visual feedback could be added here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-brand-green mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="h-96 md:h-auto bg-gray-50 flex items-center justify-center p-8">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-2">
               <span className="bg-green-100 text-brand-green text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                 {product.category}
               </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-slate mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-brand-green mb-6">
              Rs. {product.price} <span className="text-sm font-normal text-gray-400">/ {product.unit}</span>
            </p>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-50 text-brand-slate transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 py-3 font-bold text-lg min-w-[3rem] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-50 text-brand-slate transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-brand-green text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex gap-6 border-b border-gray-200 mb-4">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`pb-2 font-semibold transition-colors relative ${activeTab === 'description' ? 'text-brand-slate' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <div className="flex items-center gap-2"><Info size={16} /> Description</div>
                  {activeTab === 'description' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange"></div>}
                </button>
                <button 
                  onClick={() => setActiveTab('nutrition')}
                  className={`pb-2 font-semibold transition-colors relative ${activeTab === 'nutrition' ? 'text-brand-slate' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <div className="flex items-center gap-2"><Leaf size={16} /> Nutrition Info</div>
                  {activeTab === 'nutrition' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange"></div>}
                </button>
              </div>
              
              <div className="text-gray-600 leading-relaxed min-h-[100px]">
                {activeTab === 'description' ? (
                  <p>{product.description}</p>
                ) : (
                  <div>
                    <p className="mb-2">Typical values per 100g/serving:</p>
                    <p className="font-mono bg-gray-50 p-4 rounded-md text-sm">{product.nutrition}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-brand-slate">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
