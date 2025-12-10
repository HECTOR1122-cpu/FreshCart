import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Cart: React.FC = () => {
  const { cart, products, removeFromCart, updateQuantity, placeOrder } = useStore();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Lahore'
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'paypal' | 'bank' | 'card'>('cod');

  const paymentOptions = [
    { id: 'cod', label: 'Cash on Delivery', description: 'Pay when you receive your order.' },
    { id: 'paypal', label: 'PayPal', description: 'Pay securely using your PayPal account.' },
    { id: 'bank', label: 'Bank Transfer', description: 'Transfer directly from your bank account.' },
    { id: 'card', label: 'Direct Card Processing', description: 'Pay using your credit/debit card.' },
  ];

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product); // Filter out any stale IDs

  const subtotal = cartItems.reduce((sum, item) => sum + ((item.product?.price || 0) * item.quantity), 0);
  const deliveryFee = subtotal > 2000 ? 0 : 150; // Free delivery over 2000
  const total = subtotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder({
      name: formData.name,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}`
    });
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-brand-green mb-6 animate-bounce">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-brand-slate mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-2">Thank you for shopping with FreshCart.</p>
        <p className="text-gray-600 mb-8">Your order will be delivered soon.</p>
        <Link to="/" className="bg-[#e67e22] text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0 && step === 'cart') {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-brand-slate mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="bg-[#e67e22] text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold text-[#e67e22] mb-8">
        {step === 'cart' ? 'Shopping Cart' : 'Checkout'}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Cart Items or Checkout Form */}
        <div className="w-full lg:w-2/3">
          {step === 'cart' ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Product</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">Quantity</th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Total</th>
                    <th className="py-4 px-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cartItems.map(item => (
                    <tr key={item.productId} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img src={item.product?.image} alt={item.product?.name} className="w-16 h-16 rounded-md object-cover border border-gray-200" />
                          <div>
                            <p className="font-bold text-brand-slate">{item.product?.name}</p>
                            <p className="text-sm text-gray-500">{item.product?.unit}</p>
                            <p className="text-sm text-brand-green md:hidden">Rs. {item.product?.price}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center border border-gray-200 rounded-lg w-max mx-auto">
                          <button
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="p-2 hover:bg-gray-100 text-gray-600"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="p-2 hover:bg-gray-100 text-gray-600"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-brand-slate hidden md:table-cell">
                        Rs. {(item.product?.price || 0) * item.quantity}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <div className="bg-brand-slate text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</div>
                Shipping Details
              </h3>
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                      placeholder="Ali Khan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                      placeholder="0300 1234567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <select
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                    placeholder="House #, Street, Block..."
                  ></textarea>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                  <p className="text-sm text-yellow-800 flex items-center gap-2">
                    <CheckCircle size={16} />
                    Payment Method:{" "}
                    <strong>
                      {paymentOptions.find(option => option.id === paymentMethod)?.label}
                    </strong>
                    {paymentMethod === 'cod' ? ' (Standard)' : ''}
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold mb-6 pb-4 border-b">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.length} items)</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? "text-brand-green font-bold" : ""}>
                  {deliveryFee === 0 ? "Free" : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold text-brand-slate">
                <span>Total</span>
                <span>Rs. {total}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="w-full bg-[#e67e22] text-white font-bold py-4 rounded-lg hover:bg-black transition-colors shadow-md flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full bg-[#e67e22] text-white font-bold py-4 rounded-lg hover:bg-black transition-colors shadow-md flex items-center justify-center gap-2 mb-3"
                >
                  Place Order
                </button>
                <button
                  onClick={() => setStep('cart')}
                  className="w-full text-gray-500 font-semibold py-2 hover:text-brand-slate transition-colors"
                >
                  Back to Cart
                </button>
              </>
            )}

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPaymentMethod(option.id as any)}
                    className={`border rounded-lg p-4 text-left transition-all ${paymentMethod === option.id
                        ? 'border-[#e67e22] bg-yellow-50 shadow-md'
                        : 'border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    <p className="font-semibold">{option.label}</p>
                    {paymentMethod === option.id && (
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    )}
                  </button>
                ))}
              </div>

              {/* Dynamic Payment Details */}
              <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                {paymentMethod === 'cod' && (
                  <p className="text-gray-700">You will pay in cash when your order is delivered.</p>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">PayPal Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                    />
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">Bank Name</label>
                    <input
                      type="text"
                      placeholder="Enter bank name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                    />
                    <label className="block text-sm font-semibold text-gray-700">Account Number</label>
                    <input
                      type="text"
                      placeholder="1234567890"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                    />
                    <label className="block text-sm font-semibold text-gray-700">IBAN</label>
                    <input
                      type="text"
                      placeholder="PK00XXXX0000000000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                    />
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#e67e22] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {deliveryFee > 0 && step === 'cart' && (
              <p className="text-xs text-center mt-4 text-gray-400">
                Add items worth Rs. {2000 - subtotal} more for free delivery!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;