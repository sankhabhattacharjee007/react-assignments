import React from 'react';
import { StarIcon, PlusIcon, CheckIcon } from './Icons';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { items, addToCart } = useCart();

  const cartItem = items.find((item) => item.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="product-card glass-panel">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <span className="product-discount-tag">-{discountPercent}%</span>
      </div>

      <div className="product-content">
        <div className="product-meta-row">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <StarIcon size={13} className="star-icon" />
            <span>{product.rating}</span>
            <span className="review-count">({product.reviews})</span>
          </div>
        </div>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <div className="product-pricing">
            <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="product-original-price">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            type="button"
            className={`btn-add-cart ${inCartQty > 0 ? 'in-cart' : ''}`}
            onClick={() => addToCart(product)}
          >
            {inCartQty > 0 ? (
              <>
                <CheckIcon size={16} />
                <span>In Cart ({inCartQty})</span>
              </>
            ) : (
              <>
                <PlusIcon size={16} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
