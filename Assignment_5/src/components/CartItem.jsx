import React from 'react';
import { PlusIcon, MinusIcon, TrashIcon } from './Icons';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  const handleDecrement = () => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const lineTotal = item.price * item.quantity;

  return (
    <div className="cart-item-row">
      <img src={item.image} alt={item.name} className="cart-item-thumb" />

      <div className="cart-item-info">
        <h4 className="cart-item-title">{item.name}</h4>
        <span className="cart-item-category">{item.category}</span>
        <div className="cart-item-unit-price">
          ₹{item.price.toLocaleString('en-IN')} each
        </div>
      </div>

      <div className="cart-item-actions">
        {/* Quantity Controls */}
        <div className="quantity-stepper">
          <button
            type="button"
            className="qty-btn"
            onClick={handleDecrement}
            title={item.quantity === 1 ? 'Remove item' : 'Decrease quantity'}
            aria-label="Decrease quantity"
          >
            {item.quantity === 1 ? <TrashIcon size={14} /> : <MinusIcon size={14} />}
          </button>

          <span className="qty-value">{item.quantity}</span>

          <button
            type="button"
            className="qty-btn"
            onClick={handleIncrement}
            title="Increase quantity"
            aria-label="Increase quantity"
          >
            <PlusIcon size={14} />
          </button>
        </div>

        <div className="cart-item-pricing">
          <span className="cart-item-line-total">₹{lineTotal.toLocaleString('en-IN')}</span>
          <button
            type="button"
            className="btn-remove-item"
            onClick={() => removeItem(item.id)}
            title="Remove from cart"
            aria-label={`Remove ${item.name} from cart`}
          >
            <TrashIcon size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
