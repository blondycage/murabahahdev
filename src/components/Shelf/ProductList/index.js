import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Product from './Product';
import { connect } from 'react-redux';
import Slider from 'react-slick';
const ProductList = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return(<div style={{display:'flex',flexWrap: 'wrap',justifyContent:'center', marginTop:'30px'}}> 
    
  { products.map(p => {
    console.log(p.id);
    return <Product product={p} key={p.id} />
   
  })}
  </div>)
};
export  const productslide = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return  <div>  <Slider {...settings} style={{ maxWidth: '100vw',marginTop:'30px' }}>
 { products.map(p => {
    console.log(p.id);
    return <Product product={p} key={p.id} />
   
  })}
  </Slider>
  </div>
};
const mapStateToProps = (state) => ({
  products: state.shelf.products,
  
});
 connect(mapStateToProps)(productslide);
export default ProductList;
