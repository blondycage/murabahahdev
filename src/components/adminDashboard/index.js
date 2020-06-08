import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchProducts } from '../../services/shelf/actions';

import Spinner from '../Spinner';
import ShelfHeader from '../Shelf/ShelfHeader';
import ProductList from '../adminDashboard/productlist';

import './style.scss';

class AdminShelf extends Component {
  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    filters: PropTypes.array,
    sort: PropTypes.string
  };

  state = {
    isLoading: false,
show:false
  };
  

  componentDidMount() {
    this.handleFetchProducts();
  }

  componentWillReceiveProps(nextProps) {
    const { filters: nextFilters, sort: nextSort } = nextProps;
    const { filters } = this.props;
    if (nextFilters.length !== filters.length) {
      this.handleFetchProducts(nextFilters, undefined);
    }

    if (nextSort !== this.props.sort) {
      this.handleFetchProducts(undefined, nextSort);
    }
  }
  
  handleFetchProducts = (
    filters = this.props.filters,
    sort = this.props.sort
  ) => {
    this.setState({ isLoading: true });
    this.props.fetchProducts(filters, sort, () => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { products } = this.props;
    const { isLoading } = this.state;
    const { show } = this.state;

    return (
      <React.Fragment>
         <div style={{margin:"20px 15%",fontWeight:"bold",backgroundColor:"black",color:"white",cursor:"pointer"}} onClick={()=>{this.setState({show: !(show)})}}>SHOW/HIDE PRODUCTS PANEL</div>
        { show &&<div>
        {isLoading && <Spinner />}
        <div className="shelf-container">

           <ProductList products={products} />
        </div>
       
        </div> }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.shelf.products,
  filters: state.filters.items,
  sort: state.sort.type
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(AdminShelf);