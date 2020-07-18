import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';
export function handler(event, context, callback) {
  const headers = {
    'Access-Control-Allow-Headers': 'Authorization',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer FLWSECK_TEST-d5d039c7cfa21ed2a6838f6ca1514e5d-X',
    'Access-Control-Allow-Origin': '*',
  };
  const parsedbody = JSON.parse(event.body);
  const amount = Number(parsedbody.totalamount) * 0.25 + 5000;

  const randtx = uuidv1();
  var planid = '';

  axios({
    method: 'post',

    url: 'https://api.flutterwave.com/v3/payment-plans',
    data: {
      amount:(Number(parsedbody.totalamount)- (Number(parsedbody.totalamount) * 0.25))/6,
      currency: 'NGN',
     name:"murabahah test",
     interval:"monthly",
     duration:7
    },
    headers,
  })
    .then((response) => {
      console.log(response.data);
      callback(null, {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(response.data),
      });
      })
    .catch((err) => console.log(err));

  function sub() {
    axios({
      method: 'post',

      url: 'https://api.flutterwave.com/v3/payments',
      data: {
        tx_ref: `MRBTX- ${randtx}`,
        amount: amount.toString(),
        currency: 'NGN',
        redirect_url: 'https://boring-yonath-397d65.netlify.app/confirmation',
        payment_options: 'card',
        meta: {
          consumer_id: parsedbody.user.uid,
        },
        customer: {
          email: parsedbody.user.email,
          phonenumber: parsedbody.user.number,
          name: parsedbody.user.username,
        },
        customizations: {
          title: 'Murabahah Payments',
          description: 'Onetime Pay the price',
          logo: 'https://assets.piedpiper.com/logo.png',
        },
      },
      headers,
    })
      .then((response) => {
        console.log(response.data);
        callback(null, {
          statusCode: 200,
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(response.data),
        });
      })
      .catch((err) => console.log(err));
  }
}
