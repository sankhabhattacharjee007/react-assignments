import React from 'react';
import { CloseIcon, ShoppingBagIcon } from './Icons';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, totals } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-row">
            <ShoppingBagIcon size={22} className="drawer-bag-icon" />
            <h2 className="drawer-title">Shopping Cart</h2>
            <span className="drawer-count-badge">
              {totals.totalItemCount} {totals.totalItemCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon">🛒</div>
              <h3 className="empty-cart-title">Your cart is empty</h3>
              <p className="empty-cart-desc">
                Browse our featured products catalog and add items to your cart.
              </p>
              <button
                type="button"
                className="btn-start-shopping"
                onClick={() => setIsCartOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-container">
              {/* Items List */}
              <div className="cart-items-scroll-list">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Order Summary with GST & Grand Total */}
              <OrderSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
