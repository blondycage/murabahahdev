import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
moment().format();
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(payment, date) {
  return { payment, date };
}
var now = moment();
moment().toString();
const rows = [
  createData('second', now.add(1, 'h').toString()),
  createData('third', now.add(2, 'h').toString()),
  createData('fourth', now.add(3, 'h').toString()),
  createData('fifth', now.add(4, 'h').toString()),
  createData('sixth', now.add(5, 'h').toString()),
  createData('seventh', now.add(6, 'h').toString()),
];

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomizedTables({ cartTotal }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Payments</StyledTableCell>
            <StyledTableCell align="right">Amount(NGN)</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.payment}>
              <StyledTableCell component="th" scope="row">
                {row.payment}
              </StyledTableCell>
              <StyledTableCell align="right">{cartTotal}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
          
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
