export const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(3).replace('.', ',');
    default:
      return x.toFixed(3);
  }
};

export const productsAPI =
  'https://halalfinans.firebaseio.com/products.json';
// export const productsAPI = "http://localhost:8001/api/products";
