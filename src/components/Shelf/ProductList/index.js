import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Product from './Product';

const ProductList = ({ products }) => {
  return products.map(p => {
    console.log(p.id);
    return <Product product={p} key={p.id} />
   
  });
  
};

export default ProductList;
