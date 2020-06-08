import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirebase } from '../Firebase';
import Thumb from '../Thumb';
import { formatPrice } from '../../services/util';
import { addProduct } from '../../services/cart/actions';
import firebase from '../Firebase/firebase';
const Product = ({ product, firebase }) => {
  product.quantity = 1;
  const itemsRef = firebase.db.ref('products/products/'  );
  const query = itemsRef.orderByChild('sku').equalTo(product.sku);

  let formattedPrice = formatPrice(product.price, product.currencyId);
  const [text, setText] = React.useState(0.00);
  let productInstallment;

  if (!!product.installments) {
    const installmentPrice = product.price / 0.3;

    productInstallment = (
      <div className="installment">
        <span>admin {6} x</span>
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
    >
      {product.isNew && <div className="shelf-stopper">Brand New </div>}
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../static/products/${product.sku}_1.jpg`)}
        alt={product.title}
      />

      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>{product.currencyFormat}</small>
  <h3><span>{formattedPrice}</span></h3>
          <input
            value={text}
            name="price"
            type="number"
            step="any"
            min="0"
            onChange={
              event => setText(Number(event.target.value))

              // If you are using babel, you can use ES 6 dictionary syntax
              // let change = { [e.target.name] = e.target.value }
            }
          />
        </div>
      </div>
      <button
        onClick={() => {
          query.on('value', function(snapshot) {
            snapshot.forEach(function(weekSnapshot) {
                console.log(weekSnapshot.val());
                weekSnapshot.ref.update({ price: Number(text )});
            });
        },  function(error) {
          if (error) {
            // The cowrite failed...
            console.log(error);
          } else {
            // Data saved successfully!
            console.log('correct');
          }
        });
      }}
      >
        update price
      </button>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired
};

export default withFirebase(Product);
