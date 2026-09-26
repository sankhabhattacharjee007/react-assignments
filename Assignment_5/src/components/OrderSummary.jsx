import React, { useState } from 'react';
import { ArrowRightIcon, TrashIcon, CheckIcon } from './Icons';
import { useCart } from '../context/CartContext';

export default function OrderSummary() {
  const { totals, clearCart, setIsCartOpen } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);

  const handleCheckout = () => {
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      setIsOrdered(false);
      setIsCartOpen(false);
    }, 2200);
  };

  return (
    <div className="order-summary-box">
      <h3 className="summary-title">Order Summary</h3>

      <div className="summary-breakdown-list">
        {/* Subtotal */}
        <div className="summary-row">
          <span className="summary-label">
            Subtotal ({totals.totalItemCount} {totals.totalItemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="summary-val">₹{totals.subtotal.toLocaleString('en-IN')}</span>
        </div>

        {/* GST Calculation (18% = 9% CGST + 9% SGST) */}
        <div className="gst-box">
          <div className="summary-row gst-main-row">
            <span className="summary-label">
              GST (18%)
            </span>
            <span className="summary-val">₹{totals.gstAmount.toLocaleString('en-IN')}</span>
          </div>
          <div className="gst-sub-details">
            <div className="gst-sub-row">
              <span>CGST (9%)</span>
              <span>₹{totals.cgstAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="gst-sub-row">
              <span>SGST (9%)</span>
              <span>₹{totals.sgstAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="summary-divider"></div>

        {/* Grand Total */}
        <div className="summary-row grand-total-row">
          <span className="grand-total-label">Grand Total</span>
          <span className="grand-total-val">₹{totals.grandTotal.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {isOrdered ? (
        <div className="order-success-banner">
          <CheckIcon size={20} />
          <span>Order Placed Successfully!</span>
        </div>
      ) : (
        <div className="summary-actions">
          <button
            type="button"
            className="btn-checkout"
            onClick={handleCheckout}
            disabled={totals.totalItemCount === 0}
          >
            <span>Proceed to Checkout</span>
            <ArrowRightIcon size={18} />
          </button>

          <button
            type="button"
            className="btn-clear-cart"
            onClick={clearCart}
            disabled={totals.totalItemCount === 0}
            title="Clear all items from cart"
          >
            <TrashIcon size={15} />
            <span>Clear Cart</span>
          </button>
        </div>
      )}
    </div>
  );
}
