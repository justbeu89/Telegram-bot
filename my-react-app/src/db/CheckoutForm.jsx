import React, { useState } from 'react';


function CheckoutForm({ cartItems, onCheckout }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCheckout();
    }
  };

  const validateForm = () => {
    // Basic validation
    return formData.name && formData.email && formData.address && formData.phone;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <div className="order-summary">
        {cartItems.map(item => (
          <div key={item.id} className="order-item">
            <span>{item.title}</span>
            <span>x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;