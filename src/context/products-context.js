import { useState } from 'react';

const { createContext } = require('react');

export const ProductsContext = createContext({
  products: [],
  toggleFavorite: (id) => {}
});

export default function ProductsContextProvider ({ children }) {
  const [productsList, setProductsList] = useState([
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    }
  ]);

  function handleToggleFavorite (id) {
    setProductsList(prevState => {
      const updatedProducts = structuredClone(prevState);
      const selectedProduct = updatedProducts.find((product) => product.id === id);
      selectedProduct.isFavorite = !selectedProduct.isFavorite;

      return updatedProducts;
    });
  }

  const context = {
    products: productsList,
    toggleFavorite: handleToggleFavorite
  };

  return (
    <ProductsContext.Provider value={context}>
      {children}
    </ProductsContext.Provider>
  );
}
