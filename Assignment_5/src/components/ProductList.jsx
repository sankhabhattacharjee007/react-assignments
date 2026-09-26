import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';

const CATEGORIES = ['All', 'Audio', 'Gaming', 'Wearables', 'Gear'];

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section className="product-list-section">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Premium gaming and audio tech engineered for maximum performance
          </p>
        </div>

        {/* Category Filters */}
        <div className="category-filter-chips">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
