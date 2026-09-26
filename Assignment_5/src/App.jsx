import React from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import { ShoppingBagIcon } from './components/Icons';
import { useCart } from './context/CartContext';

export default function App() {
  const { totals, setIsCartOpen, toastMessage } = useCart();

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <ProductList />
        </main>
      </div>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Floating Bottom Quick Cart Button (when items in cart) */}
      {totals.totalItemCount > 0 && (
        <aside className="floating-cart-bar">
          <div className="floating-cart-inner glass-panel">
            <div className="floating-cart-info">
              <span className="floating-cart-count">
                {totals.totalItemCount} {totals.totalItemCount === 1 ? 'item' : 'items'} in cart
              </span>
              <span className="floating-cart-total">
                Total: <strong>₹{totals.grandTotal.toLocaleString('en-IN')}</strong> (incl. GST)
              </span>
            </div>
            <button
              type="button"
              className="btn-view-cart"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBagIcon size={18} />
              <span>View Cart</span>
            </button>
          </div>
        </aside>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification" role="status" aria-live="polite">
          <span>✓ {toastMessage}</span>
        </div>
      )}
    </div>
  );
}
