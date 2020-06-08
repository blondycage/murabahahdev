import React from 'react';

import Product from './Product';

const ProductList = ({ products }) => {
  return products.map(p => {
    console.log(p.id);
    return <Product product={p} key={p.id} />
    
  });
};

export default ProductList;
