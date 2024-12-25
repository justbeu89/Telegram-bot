import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from "./Components/Card/Card.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import CheckoutForm from "./db/CheckoutForm.jsx";
import { getData } from "./db/db.js";
import './App.css';

function MainContent({ cartItems, cartItemsCount, handleAddToCart, handleRemoveFromCart, handleCheckout, data }) {
  return (
    <div className="app">
      <h1 className="apptitle">Order Food</h1>
      <div className="cartbadge">
        Items in cart: {cartItemsCount}
      </div>
      <Cart 
        cartItems={cartItems}
        onCheckout={handleCheckout}
      />
      <div className="cards-container">
        {data.map(food => (
          <Card 
            key={food.id} 
            food={{
              id: food.id,
              title: food.title,
              price: food.price,
              Image: food.image 
            }}
            onAdd={handleAddToCart}
            onRemove={handleRemoveFromCart}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const fetchedData = getData();
    setData(fetchedData);
  }, []);

  const handleAddToCart = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const handleCheckout = () => {
    // Keep the cart items until order is completed
  };

  const handleOrderComplete = () => {
    setCartItems([]); // Clear cart after successful order
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <MainContent 
              cartItems={cartItems}
              cartItemsCount={cartItemsCount}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleCheckout={handleCheckout}
              data={data}
            />
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <CheckoutForm 
              cartItems={cartItems} 
              onOrderComplete={handleOrderComplete}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
