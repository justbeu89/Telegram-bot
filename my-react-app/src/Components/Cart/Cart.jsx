import React from 'react';
import PropTypes from 'prop-types';
import './Cart.css';

function Cart({ cartItems, onCheckout }) {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleCheckout = () => {
    if (typeof onCheckout === 'function') {
      onCheckout();
    }
  };

  return (
    <div className="cart__container">
      {cartItems.length === 0 ? "No items in cart" : (
        <>
          <ul className="cart__items">
            {cartItems.map(item => (
              <li key={item.id} className="cart__item">
                <span className="cart__item-title">{item.title}</span>
                <span className="cart__item-quantity">x{item.quantity}</span>
                <span className="cart__item-price">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="cart__total">
            Total: {formatCurrency(totalPrice)}
          </div>
        </>
      )}
      <button 
        className="cart__checkout-button"
        onClick={handleCheckout}
        type="button"
        disabled={cartItems.length === 0}
      >
        {cartItems.length === 0 ? "Order!" : "Checkout"}
      </button>
    </div>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default Cart;
