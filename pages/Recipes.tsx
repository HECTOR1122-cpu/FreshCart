import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ChefHat } from 'lucide-react';

const recipes = [
  {
    id: 1,
    title: "Special Chicken Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800",
    time: "1 hr 30 mins",
    servings: "6",
    description: "The classic spicy rice dish with marinated chicken layered with fragrant basmati rice, potatoes, and dried plums.",
    ingredients: [
      "Basmati Rice",
      "Chicken (1kg)",
      "Potatoes",
      "Yogurt",
      "Fried Onions",
      "Biryani Spice Mix",
      "Mint & Coriander",
      "Dried Plums",
      "Ginger Garlic Paste",
      "Oil"
    ]
  },
  {
    id: 2,
    title: "Spicy Chickpea Salad",
    image: "https://plus.unsplash.com/premium_photo-1664478283448-94d7b72a23ed?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "20 mins",
    servings: "4",
    description: "A spicy, tangy, and refreshing chickpea salad. Perfect as a snack or a side dish.",
    ingredients: [
      "Boiled White Chickpeas",
      "Boiled Potatoes",
      "Onions",
      "Tomatoes",
      "Green Chilies",
      "Spice Powder",
      "Tamarind Sauce",
      "Crispy Fried Dough",
      "Yogurt"
    ]
  },
  {
    id: 3,
    title: "Chicken Wok Curry",
    image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&q=80&w=800",
    time: "45 mins",
    servings: "4",
    description: "A wok-cooked chicken curry. Made with lots of tomatoes, ginger, green chilies, and black pepper.",
    ingredients: [
      "Chicken (1kg)",
      "Tomatoes (500g)",
      "Ginger Julienne",
      "Green Chilies",
      "Garlic Paste",
      "Black Pepper",
      "Yogurt",
      "Cooking Oil"
    ]
  },
  {
    id: 4,
    title: "Mango Yogurt Smoothie",
    image: "https://plus.unsplash.com/premium_photo-1695411846330-c21df7517c25?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "10 mins",
    servings: "2",
    description: "The perfect summer drink to beat the heat. Creamy, sweet, and rich with the flavor of sweet yellow mangoes.",
    ingredients: [
      "Fresh Mangoes (2)",
      "Yogurt (1 cup)",
      "Milk (1/2 cup)",
      "Sugar (to taste)",
      "Ice Cubes"
    ]
  },

  {
    id: 5,
    title: "Tomato Scrambled Eggs",
    image: "https://plus.unsplash.com/premium_photo-1700179396194-a7b88a692a3a?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "15 mins",
    servings: "2",
    description: "Classic scrambled eggs cooked with fresh tomatoes, lightly seasoned. Quick, nutritious, and perfect for breakfast or a light meal.",
    ingredients: [
      "Eggs (4)",
      "Tomatoes (2, chopped)",
      "Salt & Pepper to taste",
      "Butter or Oil (1 tbsp)",
      "Optional: Spring Onion or Parsley for garnish"
    ]
  },

  {
    id: 6,
    title: "Mint Lemonade",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
    time: "5 mins",
    servings: "4",
    description: "A revitalizing drink made with fresh mint leaves, lemon juice, black salt, and sugar. Excellent for digestion.",
    ingredients: [
      "Fresh Mint Leaves",
      "Lemons (4)",
      "Sugar",
      "Black Salt",
      "Water/Soda",
      "Ice"
    ]
  }
];

const Recipes: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#e67e22] py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">Authentic Local Recipes</h1>
          <p className="text-xl opacity-90">Cook delicious meals with ingredients delivered by FreshCart.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group">
              <div className="h-56 overflow-hidden relative">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 flex items-center gap-1 shadow-sm">
                  <Clock size={14} /> {recipe.time}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#2c3e50] mb-3 font-heading">{recipe.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{recipe.description}</p>

                <div className="mb-6 flex-grow">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#e67e22] mb-3 flex items-center gap-2">
                    <ChefHat size={16} /> Key Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {/* Display all ingredients, no slicing */}
                    {recipe.ingredients.map(ing => (
                      <span key={ing} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md border border-gray-200">{ing}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-500 flex items-center gap-1"><Users size={16} /> Serves {recipe.servings}</span>
                  <Link to="/shop" className="text-sm font-bold text-[#e67e22] hover:text-black transition-colors underline decoration-2 underline-offset-4">
                    Shop Ingredients
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;