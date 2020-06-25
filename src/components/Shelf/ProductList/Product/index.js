import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Thumb from '../../../Thumb';
import { formatPrice } from '../../../../services/util';
import { addProduct } from '../../../../services/cart/actions';

const Product = ({ product, addProduct }) => {
  product.quantity = 1;
  
  let formattedPrice = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'NGN' }).format(product.price);

  let productInstallment;

  if (!!product.installments) {
    const installmentPrice = product.price / 0.3;

    productInstallment = (
      <div className="installment">
        <span>or {6} x</span>
        <b>
          {product.currencyFormat}
          {formatPrice(installmentPrice, product.currencyId)}
        </b>
      </div>
    );
  }

  return (
    <div
      className="shelf-item"
      onClick={() => addProduct(product)}
      data-sku={product.sku}
      onMouseEnter={()=>{console.log("enter")}}
      onMouseLeave={()=>{console.log("EXIT")}}
    >
      {product.isNew && (
        <div className="shelf-stopper">Brand New </div>
      )}

    {!product.thumburlbig &&  (<Thumb
        classes="shelf-item__thumb"

        src={require(`../../../../static/products/${product.sku}_1.jpg`)}
        alt={product.title}
      />)}
      {!!product.thumburlbig && (<Thumb
        classes="shelf-item__thumb"

        src={`${product.thumburlbig}`}
        alt={product.title}
      />)}

      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val">
         
          <b>{formattedPrice.substring(0,11)}</b>
          
        </div>
        
      </div>
      <div className="shelf-item__buy-btn">Add to cart</div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProduct }
)(Product);
