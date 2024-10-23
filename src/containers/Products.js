import React from 'react';

import ProductItem from '../components/Products/ProductItem';
import './Products.css';
import { useStore } from '../hooks-store/store';

const Products = props => {
  const [store] = useStore();
  return (
    <ul className="products-list">
      {store.products.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
