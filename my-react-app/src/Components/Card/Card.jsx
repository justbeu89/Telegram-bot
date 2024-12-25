import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./Card.css";

function Card({ food, onAdd, onRemove }) {
    const [count, setCount] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [imageError, setImageError] = useState(false);
    const { title, price, Image } = food;

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
        onAdd(food);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
            onRemove(food);
        }
        if (count === 1) {
            setShowControls(false);
        }
    };

    const handleAddClick = () => {
        setShowControls(true);
        handleIncrement();
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="card">
            <img 
                src={imageError ? '/placeholder.png' : Image} 
                alt={title}
                onError={handleImageError}
                className="card__image"
            />
            <div className="card__content">
                <h3 className="card__title">{title}</h3>
                <p className="card__price">{formatPrice(price)}</p>
                
                {!showControls ? (
                    <button 
                        className="card__add-button"
                        onClick={handleAddClick}
                    >
                        Add
                    </button>
                ) : (
                    <div className="card__controls">
                        <button 
                            onClick={handleDecrement}
                            disabled={count === 0}
                            className="card__button1"
                        >
                            -
                        </button>
                        <span className="card__count">{count}</span>
                        <button 
                            onClick={handleIncrement}
                            className="card__button2"
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

Card.propTypes = {
    food: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        Image: PropTypes.string.isRequired
    }).isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default Card;