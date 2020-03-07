import React from 'react';
import PropTypes from 'prop-types';

import Sort from '../Sort';

const ShelfHeader = props => {
  return (
    <div className="shelf-container-header">
      <h1>kabirs app development stage</h1>
      <small className="products-found">
        <span>{props.productsLength} Product(s) found.</span>
      </small>
      <Sort />
    </div>
  );
};

ShelfHeader.propTypes = {
  productsLength: PropTypes.number.isRequired
};

export default ShelfHeader;
