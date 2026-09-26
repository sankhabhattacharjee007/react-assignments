# Assignment 5: Online Shopping Cart

A responsive Online Shopping Cart web application built with **React**, **Vite**, **Context API**, and **useReducer** state management in a **Matte Black & Crimson Red** aesthetic.

---

## 🎯 Problem Statement & Requirements Fulfilled

| Feature / Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **Pre-requisite: useReducer** | Pure reducer (`cartReducer.js`) handles state transitions (`ADD_TO_CART`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `APPLY_COUPON`, `REMOVE_COUPON`, `CLEAR_CART`) | ✅ |
| **Pre-requisite: Context API** | Centralized `CartContext` & custom `useCart()` hook provides state & dispatchers across all components | ✅ |
| **Product List** | Responsive catalog grid with high-resolution imagery, pricing, discounts, and category filters | ✅ |
| **Add to Cart** | One-click add action with instant badge counter and toast notification feedback | ✅ |
| **Remove Item** | Dedicated delete button on each cart item with instantaneous state update | ✅ |
| **Quantity Update** | Stepper controls (`+` and `-`) with auto-removal if decremented below 1 | ✅ |
| **Coupon Code System** | Coupon input supporting percentage discounts (`SAVE10` = 10%, `FLAT20` = 20%, `FESTIVE25` = 25%), error feedback, and removal | ✅ |
| **GST Calculation** | Accurate 18% GST calculation (split into 9% CGST + 9% SGST) applied on taxable amount | ✅ |
| **Grand Total** | Itemized financial summary: Subtotal → Discount → Taxable Subtotal → GST (18%) → Grand Total | ✅ |
| **Theme** | Matte Black & Crimson Red native app UI theme | ✅ |

---

## 🧮 Calculation Logic

```text
Subtotal        = Σ (Item Price × Item Quantity)
Coupon Discount = (Subtotal × Coupon Percentage) / 100
Taxable Amount  = Subtotal - Coupon Discount
CGST (9%)       = Taxable Amount × 0.09
SGST (9%)       = Taxable Amount × 0.09
GST Total (18%) = CGST + SGST
Grand Total     = Taxable Amount + GST Total
```

---

## 🎟️ Available Coupon Codes

- `SAVE10`: 10% discount on order subtotal
- `FLAT20`: 20% discount on order subtotal
- `FESTIVE25`: 25% discount on order subtotal

---

## 🚀 Running the Project Locally

```bash
cd Assignment_5
npm install
npm run dev
```

Server URL: **http://localhost:5178/**
