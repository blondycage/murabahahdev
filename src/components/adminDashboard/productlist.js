import React from 'react';

import Product from './products';

const ProductList = ({ products }) => {
  return products.map(p => {
    console.log(p.id);
    return <Product product={p} key={p.id} />
    
  });
};

export default ProductList;