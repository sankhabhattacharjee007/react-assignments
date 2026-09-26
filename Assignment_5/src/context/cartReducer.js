export const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

export const INITIAL_CART_STATE = {
  items: []
};

/**
 * Calculates cart financial totals:
 * Subtotal -> GST (18%) [9% CGST + 9% SGST] -> Grand Total
 */
export function calculateCartTotals(items) {
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Standard 18% GST (9% CGST + 9% SGST)
  const gstRate = 0.18;
  const gstAmount = Math.round(subtotal * gstRate);
  const cgstAmount = Math.round(gstAmount / 2);
  const sgstAmount = gstAmount - cgstAmount;

  const grandTotal = subtotal + gstAmount;

  return {
    totalItemCount,
    subtotal,
    gstAmount,
    cgstAmount,
    sgstAmount,
    grandTotal
  };
}

/**
 * Reducer function for useReducer state management
 */
export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const product = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === product.id);

      let updatedItems;
      if (existingIndex > -1) {
        updatedItems = state.items.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItems = [...state.items, { ...product, quantity: 1 }];
      }

      return {
        ...state,
        items: updatedItems
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const productId = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== productId)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id)
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return INITIAL_CART_STATE;
    }

    default:
      return state;
  }
}
