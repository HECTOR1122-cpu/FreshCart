import React, { useState } from 'react';
import { Package, Trash2, Edit2, TrendingUp, ShoppingBag, PlusCircle, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

const Admin: React.FC = () => {
  const { products, orders, deleteProduct, addProduct, editProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Fruits',
    image: 'https://picsum.photos/400',
    description: '',
    nutrition: '',
    unit: '1 kg'
  });

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    if (isEditing && productForm.id) {
        editProduct(productForm as Product);
    } else {
        addProduct(productForm as Omit<Product, 'id'>);
    }
    
    // Reset
    setIsEditing(false);
    setProductForm({
      name: '',
      price: 0,
      category: 'Fruits',
      image: 'https://picsum.photos/400',
      description: '',
      nutrition: '',
      unit: '1 kg'
    });
  };

  const handleEditClick = (product: Product) => {
      setProductForm(product);
      setIsEditing(true);
      setActiveTab('products');
      window.scrollTo(0, 0); // Scroll to form
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-slate text-white flex-shrink-0">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-heading font-bold">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-brand-green text-white' : 'hover:bg-gray-700 text-gray-300'}`}
          >
            <TrendingUp size={20} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-brand-green text-white' : 'hover:bg-gray-700 text-gray-300'}`}
          >
            <Package size={20} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-brand-green text-white' : 'hover:bg-gray-700 text-gray-300'}`}
          >
            <ShoppingBag size={20} /> Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-gray-500 mb-2">Total Sales</div>
                <div className="text-3xl font-bold text-brand-green">Rs. {totalSales.toLocaleString()}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-gray-500 mb-2">Total Orders</div>
                <div className="text-3xl font-bold text-brand-slate">{orders.length}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-gray-500 mb-2">Total Products</div>
                <div className="text-3xl font-bold text-brand-orange">{products.length}</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
              {orders.length === 0 ? (
                <p className="text-gray-400">No orders yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b text-gray-500 text-sm">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id}>
                          <td className="py-3 font-mono text-sm">#{order.id.slice(-6)}</td>
                          <td className="py-3">{order.customer.name}</td>
                          <td className="py-3 font-bold">Rs. {order.total}</td>
                          <td className="py-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">{order.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-8 animate-fade-in-up">
             <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
             </div>

             {/* Add/Edit Form */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {isEditing ? <Edit2 size={20} /> : <PlusCircle size={20} />} 
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                </h3>
                <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                        type="text" placeholder="Product Name" required
                        className="p-3 border rounded-lg"
                        value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})}
                    />
                    <div className="flex gap-2">
                        <input 
                            type="number" placeholder="Price (PKR)" required
                            className="p-3 border rounded-lg w-full"
                            value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})}
                        />
                         <input 
                            type="text" placeholder="Unit (e.g. 1 kg)" required
                            className="p-3 border rounded-lg w-full"
                            value={productForm.unit} onChange={e => setProductForm({...productForm, unit: e.target.value})}
                        />
                    </div>
                    
                    <select 
                        className="p-3 border rounded-lg bg-white"
                        value={productForm.category} 
                        onChange={e => setProductForm({...productForm, category: e.target.value as any})}
                    >
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Staples">Staples</option>
                        <option value="Spices">Spices</option>
                    </select>

                     <input 
                        type="text" placeholder="Image URL" required
                        className="p-3 border rounded-lg"
                        value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})}
                    />

                    <textarea 
                        placeholder="Description" required
                        className="p-3 border rounded-lg md:col-span-2"
                        rows={2}
                        value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})}
                    />
                     <textarea 
                        placeholder="Nutrition Info" required
                        className="p-3 border rounded-lg md:col-span-2"
                        rows={1}
                        value={productForm.nutrition} onChange={e => setProductForm({...productForm, nutrition: e.target.value})}
                    />

                    <div className="md:col-span-2 flex gap-4">
                        <button type="submit" className="bg-brand-green text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors">
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </button>
                        {isEditing && (
                            <button 
                                type="button" 
                                onClick={() => { setIsEditing(false); setProductForm({ name: '', price: 0, category: 'Fruits', image: '', description: '', nutrition: '', unit: '' }); }}
                                className="text-gray-500 font-semibold hover:text-gray-700"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
             </div>

             {/* Inventory List */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                 <table className="w-full text-left">
                     <thead className="bg-gray-50">
                         <tr>
                             <th className="p-4">Image</th>
                             <th className="p-4">Name</th>
                             <th className="p-4">Category</th>
                             <th className="p-4">Price</th>
                             <th className="p-4 text-right">Actions</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y">
                         {products.map(product => (
                             <tr key={product.id} className="hover:bg-gray-50">
                                 <td className="p-4"><img src={product.image} className="w-10 h-10 rounded object-cover" alt="" /></td>
                                 <td className="p-4 font-semibold">{product.name}</td>
                                 <td className="p-4 text-sm text-gray-500">{product.category}</td>
                                 <td className="p-4">Rs. {product.price}</td>
                                 <td className="p-4 flex justify-end gap-3">
                                     <button onClick={() => handleEditClick(product)} className="text-blue-500 hover:text-blue-700"><Edit2 size={18} /></button>
                                     <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
             <div className="space-y-8 animate-fade-in-up">
                <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Items</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="p-4 text-sm font-mono">#{order.id.slice(-6)}</td>
                                    <td className="p-4 text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <div className="font-bold">{order.customer.name}</div>
                                        <div className="text-xs text-gray-400">{order.customer.phone}</div>
                                    </td>
                                    <td className="p-4 text-sm">{order.items.length} items</td>
                                    <td className="p-4 font-bold text-brand-green">Rs. {order.total}</td>
                                    <td className="p-4">
                                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">{order.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {orders.length === 0 && <div className="p-8 text-center text-gray-400">No orders found.</div>}
                </div>
             </div>
        )}

      </main>
    </div>
  );
};

export default Admin;
