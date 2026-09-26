import React, { useState } from 'react';
import { TagIcon, CheckIcon, AlertIcon, CloseIcon } from './Icons';
import { useCart } from '../context/CartContext';
import { AVAILABLE_COUPONS } from '../data/products';

export default function CouponSection() {
  const { appliedCoupon, couponError, applyCoupon, removeCoupon } = useCart();
  const [inputCode, setInputCode] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyCoupon(inputCode.trim());
      setInputCode('');
    }
  };

  const handleQuickCoupon = (code) => {
    applyCoupon(code);
  };

  return (
    <div className="coupon-section">
      <div className="coupon-header">
        <TagIcon size={16} className="tag-icon" />
        <span className="coupon-heading">Have a Coupon Code?</span>
      </div>

      {appliedCoupon ? (
        <div className="applied-coupon-pill">
          <div className="applied-coupon-info">
            <CheckIcon size={16} className="check-icon" />
            <div>
              <span className="applied-code">{appliedCoupon.code}</span>
              <span className="applied-desc">
                ({appliedCoupon.discountPercent}% OFF applied)
              </span>
            </div>
          </div>
          <button
            type="button"
            className="btn-remove-coupon"
            onClick={removeCoupon}
            title="Remove coupon"
            aria-label="Remove coupon"
          >
            <CloseIcon size={14} /> Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="coupon-input-form">
          <div className="coupon-input-group">
            <input
              type="text"
              className="coupon-input"
              placeholder="e.g. SAVE10, FLAT20"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            />
            <button
              type="submit"
              className="btn-apply-coupon"
              disabled={!inputCode.trim()}
            >
              Apply
            </button>
          </div>

          {couponError && (
            <div className="coupon-error-msg" role="alert">
              <AlertIcon size={14} />
              <span>{couponError}</span>
            </div>
          )}

          {/* Quick Click Coupons */}
          <div className="quick-coupons-row">
            <span className="quick-coupon-label">Available:</span>
            {Object.keys(AVAILABLE_COUPONS).map((code) => (
              <button
                key={code}
                type="button"
                className="coupon-chip"
                onClick={() => handleQuickCoupon(code)}
              >
                {code} ({AVAILABLE_COUPONS[code].discountPercent}%)
              </button>
            ))}
          </div>
        </form>
      )}
    </div>
  );
}
