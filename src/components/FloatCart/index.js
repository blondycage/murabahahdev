import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  loadCart,
  removeProduct,
  changeProductQuantity,
} from '../../services/cart/actions';
import { updateCart } from '../../services/total/actions';
import CartProduct from './CartProduct';
import { formatPrice } from '../../services/util';
import Portal from '../portal';
import Payment from './paymenpicker';
import './style.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Pricing from '../pricing';
import Paper from '@material-ui/core/Paper';

class FloatCart extends Component {
  static propTypes = {
    loadCart: PropTypes.func.isRequired,
    updateCart: PropTypes.func.isRequired,
    cartProducts: PropTypes.array.isRequired,
    newProduct: PropTypes.object,
    removeProduct: PropTypes.func,
    productToRemove: PropTypes.object,
    changeProductQuantity: PropTypes.func,
    productToChange: PropTypes.object,
  };

  state = {
    isOpen: false,
    showmodal: false,
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ showmodal: false });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }

    if (nextProps.productToChange !== this.props.productToChange) {
      this.changeProductQuantity(nextProps.productToChange);
    }
  }

  openFloatCart = () => {
    this.setState({ isOpen: true });
  };

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  };

  addProduct = (product) => {
    const { cartProducts, updateCart } = this.props;
    let productAlreadyInCart = false;

    cartProducts.forEach((cp) => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
    this.openFloatCart();
  };

  removeProduct = (product) => {
    const { cartProducts, updateCart } = this.props;

    const index = cartProducts.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  };

  proceedToCheckout = () => {
    const {
      totalPrice,
      productQuantity,
      currencyFormat,
      currencyId,
    } = this.props.cartTotal;

    if (!productQuantity) {
      alert('Add some product in the cart!');
    } else {
      // alert(
      //   `Checkout - Subtotal: ${currencyFormat} ${formatPrice(
      //     totalPrice,
      //     currencyId
      //   )}`
      // );
      this.setState({ showmodal: true });
      //this.handleClickOpen()
    }
  };

  changeProductQuantity = (changedProduct) => {
    const { cartProducts, updateCart } = this.props;

    const product = cartProducts.find((p) => p.id === changedProduct.id);
    product.quantity = changedProduct.quantity;
    if (product.quantity <= 0) {
      this.removeProduct(product);
    }
    updateCart(cartProducts);
  };

  render() {
    const {
      cartTotal,
      cartProducts,
      removeProduct,
      changeProductQuantity,
    } = this.props;

    const products = cartProducts.map((p) => {
      return (
        <CartProduct
          product={p}
          removeProduct={removeProduct}
          changeProductQuantity={changeProductQuantity}
          key={p.id}
        />
      );
    });

    let classes = ['float-cart'];

    if (!!this.state.isOpen) {
      classes.push('float-cart--open');
    }

    return (
      <div className={classes.join(' ')}>
        {/* If cart open, show close (x) button */}
        {this.state.isOpen && (
          <div
            onClick={() => this.closeFloatCart()}
            className="float-cart__close-btn"
          >
            X
          </div>
        )}

        {/* If cart is closed, show bag with quantity of product and open cart action */}
        {!this.state.isOpen && (
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{cartTotal.productQuantity}</span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">{cartTotal.productQuantity}</span>
            </span>
            <span className="header-title">Cart</span>
          </div>

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <p className="shelf-empty">
                Add some products in the cart <br />
                :)
              </p>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {`${cartTotal.currencyFormat} ${formatPrice(
                  cartTotal.totalPrice,
                  cartTotal.currencyId
                )}`}
              </p>
              <small className="sub-price__installment">
                {!!cartTotal.installments && (
                  <span>
                    {`OR UP TO ${6} x ${cartTotal.currencyFormat} ${formatPrice(
                      cartTotal.totalPrice * 0.3,
                      cartTotal.currencyId
                    )}`}
                  </span>
                )}
              </small>
            </div>
            <div onClick={() => this.proceedToCheckout()} className="buy-btn">
              Checkout
            </div>
          </div>
        </div>
        {
          //this.state.showmodal &&( <Payment/> )
        }
        <Dialog
          open={this.state.showmodal}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div className="pricecont" style={{display:'flex',flexWrap:"wrap"}}>
         
            <div className="pcard" style={{padding:"5px",flexBasis:"300px",textAlign:"center"}}>
            <Paper elevation={3} >
                <h3 className="pheader" style={{backgroundColor:"purple",width:"100%",color:"white"}}>ONE-TIME-PAYMENT</h3>
              <p className="ptext">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, sint architecto excepturi ipsa quae totam veniam voluptas! Quasi repellendus atque, tempore modi natus praesentium adipisci numquam reprehenderit porro vel nihil debitis aspernatur, facilis nam dolor sapiente eum suscipit autem. Iure eius delectus molestiae ipsa sit consequatur enim odio nostrum rerum?</p>
              <Button variant="outlined" color="primary" href="/checkout">
             PAY NOW
            </Button>
            </Paper >
            </div>
           
           
            <div className="pcard"  style={{padding:"5px",flexBasis:"300px",textAlign:"center"}}>
            <Paper elevation={3} >
            <h3 className="pheader" style={{backgroundColor:"purple",width:"100%",color:"white"}}>MURABAHAH PLAN</h3>
              <p className="ptext">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit alias quibusdam doloremque praesentium accusamus perspiciatis voluptatum sed, modi itaque earum soluta enim molestiae numquam ipsa neque ex nesciunt harum optio incidunt tempora officiis quas eaque hic. Accusamus et ea quae vel veniam nemo, libero dolor magni quibusdam doloremque itaque hic?</p>
              <Button variant="outlined" color="primary" href="/checkout2">
            START PLAN
            </Button>
            </Paper>
            </div>
          
          </div>
          

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartProducts: state.cart.products,
  newProduct: state.cart.productToAdd,
  productToRemove: state.cart.productToRemove,
  productToChange: state.cart.productToChange,
  cartTotal: state.total.data,
});

export default connect(mapStateToProps, {
  loadCart,
  updateCart,
  removeProduct,
  changeProductQuantity,
})(FloatCart);
