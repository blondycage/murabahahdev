import axios from 'axios';

export function handler(event, context, callback) {
  axios(
    {
      method: 'post',
      url: 'https://api.flutterwave.com/v3/payments',
      tx_ref: 'appppp-tx-196878ki77645tty',
      amount: '10000',
      currency: 'NGN',
      redirect_url: 'https://halalfinans.web.app/',
      payment_options: 'card',
      meta: {
        consumer_id: 23,
        consumer_mac: '92a3-912ba-1192a',
      },
      customer: {
        email: 'yakson500@gmail.com',
        phonenumber: '080****4528',
        name: 'Yemi Desola',
      },
      customizations: {
        title: 'Murabahah Payments',
        description: 'Onetime Pay the price',
        logo: 'https://assets.piedpiper.com/logo.png',
      },
    },
    {
      headers: {
        Authorization: 'Bearer FLWSECK_TEST-d5d039c7cfa21ed2a6838f6ca1514e5d-X',
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => {
      console.log(response);
      callback(null, {
        statusCode: 200,
        body: 'yay',
      });
    })
    .catch((err) => console.log(err));
}
