import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

 function Review({ cartProducts, cartTotal, authUser }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List style={{display:"flex",flexDirection:'column'}} >
        {cartProducts.map((product) => (
          <ListItem className={classes.listItem} key={product.title}>
            <ListItemText primary={product.title} secondary={product.description} />

            <Typography variant="body2">{`NGN ${product.price} x ${product.quantity}`}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Shipping Fee" />
          <Typography variant="subtitle1" className={classes.total}>
       NGN 5000
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
         {`NGN${cartTotal.totalPrice +5000}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${authUser.address.address.firstname} ${authUser.address.address.lastname}`}</Typography>
          <Typography gutterBottom>{`${authUser.address.address.address} ${authUser.address.address.state} ${authUser.address.address.city}`}</Typography>
        </Grid>
      
      </Grid>
    </React.Fragment>
  );
}const mapStateToProps = (state) => ({
  cartProducts: state.cart.products,
  authUser: state.sessionState.authUser,
  cartTotal: state.total.data,
});
export default connect(mapStateToProps, {})(Review);
