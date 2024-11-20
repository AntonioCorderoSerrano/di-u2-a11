import { useImmer } from 'use-immer';
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Queso',
  count: 5,
}, {
  id: 2,
  name: 'Espaguetis',
  count: 2,
}];

export default function ShoppingCart() {
  const [products, setProducts] = useImmer(initialProducts);

  function handleIncreaseClick(productId) {
    setProducts(draft => {
      const product = draft.find(p => p.id === productId);
      if (product) {
        product.count += 1;
      }
    });
  }

  function handleDecreaseClick(productId) {
    setProducts(draft => {
      const product = draft.find(p => p.id === productId);
      if (product) {
        product.count -= 1;
        // Elimina el producto si su contador llega a 0
        if (product.count === 0) {
          const index = draft.findIndex(p => p.id === productId);
          draft.splice(index, 1);
        }
      }
    });
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => handleIncreaseClick(product.id)}>
            +
          </button>
          <button onClick={() => handleDecreaseClick(product.id)}>
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
