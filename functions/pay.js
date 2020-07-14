import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';
export function handler(event, context, callback) {
    const headers = {
        'Access-Control-Allow-Headers': "Authorization",
      "Accept":'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer FLWSECK_TEST-d5d039c7cfa21ed2a6838f6ca1514e5d-X',
     'Access-Control-Allow-Origin':"*"
        
      }
    const randtx=uuidv1();
  axios(
    {
      method: 'post',
   
      url:'https://api.flutterwave.com/v3/payments',
      data:{ tx_ref: `MRBTX- ${randtx}`,
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
      },},
      headers
     
    },
   
  )
    .then((response) => {
      console.log(response.data);
      callback(null, {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: response.data,
      });
    })
    .catch((err) => console.log(err));
}
