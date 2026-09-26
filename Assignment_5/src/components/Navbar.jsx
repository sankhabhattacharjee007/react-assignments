import React from 'react';
import { ShoppingBagIcon } from './Icons';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totals, setIsCartOpen } = useCart();

  return (
    <header className="app-header glass-panel">
      <div className="brand-logo">
        <span className="brand-icon">⚡</span>
        <h1 className="brand-name">Products</h1>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="cart-toggle-btn"
          onClick={() => setIsCartOpen(true)}
          aria-label="Open Shopping Cart"
        >
          <ShoppingBagIcon size={20} />
          <span className="cart-btn-label">Cart</span>
          {totals.totalItemCount > 0 && (
            <span className="cart-badge-count">{totals.totalItemCount}</span>
          )}
          {totals.grandTotal > 0 && (
            <span className="cart-badge-total">₹{totals.grandTotal.toLocaleString('en-IN')}</span>
          )}
        </button>
      </div>
    </header>
  );
}
