//tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

//index.css
@tailwind base;
@tailwind components;
@tailwind utilities;


//src/components/ProductCard.jsx
import React from "react";

function ProductCard({ product }) {
  return (
    <div className="max-w-sm rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition p-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded-lg"
      />
      <h2 className="mt-3 text-lg font-semibold text-gray-800">{product.name}</h2>
      <p className="mt-1 text-sm text-gray-600">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-bold text-green-600">₹{product.price}</span>
        <button className="rounded-xl bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;


//src/components/ProductList.jsx
import React from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Noise cancelling with 30hr battery",
    price: 2999,
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track fitness, heart rate & more",
    price: 4999,
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    description: "RGB lights with ultra precision",
    price: 1999,
    image: "https://picsum.photos/300/200?random=3",
  },
];

function ProductList() {
  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductList;


//App.jsx
import React from "react";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-center text-white text-xl font-bold">
        🛍️ Product Card List
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;




