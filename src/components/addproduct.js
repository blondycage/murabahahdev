import React, { Component } from 'react';
import { withFirebase } from '../components/Firebase';

import * as ROLES from '../constants/roles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { v1 as uuidv1 } from 'uuid';
import '../components/addproduct.css';
import { NotificationManager } from 'react-notifications';
import {
  withAuthorization,
  withEmailVerification
} from '../components/Session';
import { array } from 'prop-types';

const InitialState = {
  availableSizes: [],
  currencyFormat: 'N',
  currencyId: 'NGN',
  description: '',
  fruites: [],
  Largeimg: '',
  smallimg: '',
  filterss: [],
  shipping: 5000,
  id: 0,
  thumburlbig: '',
  thumburlsmall: '',
  isNew: true,

  price: 0,
  sku: uuidv1(),
  style: '',
  title: ''
};

const filters = ['X', '64', 'USED', 'PRO', 'MAX', 'WHT', 'BLCK', 'CELL', 'LTE'];
let products = [];
let disabled=true;
class addproduct extends Component {
  constructor(props) {
    super(props);

    this.state = { ...InitialState };
  }
  componentDidMount() {
    // Simple GET request using fetch
    fetch('https://halalfinans.firebaseio.com/alltags.json')
      .then(response => response.json())
      .then(data => this.setState({ filterss: data }))
      .then(() => {
        // ...and then:
        var alltagsobject = new Array();

        for (var i = 0; i < this.state.filterss.length; i++) {
          var temp_item = this.state.filterss[i];

          // Maybe, here make something like:
          // temp_item.name = 'some value'

          alltagsobject.push({
            id: i,
            value: temp_item,
            isChecked: false
          });
        }
        this.setState({ fruites: alltagsobject });
      })
      .then(() => {
        this.props.firebase.products().once('value', snapshot => {
          console.log('FireB ', snapshot);
          if (snapshot && snapshot.exists()) {
            products = snapshot.val();
            console.log(products);
          }
        });
      });
  }

  handleFireBaseUpload = e => {
    e.preventDefault();
    console.log('start of upload');
    // async magic goes here...

    if (this.state.largeimg === '') {
      console.error(
        `not an image, the image file is a ${typeof this.state.largeimg}`
      );
    }
    const uploadTask = this.props.firebase
      .productstorage()
      .child('bigthumb')
      .put(this.state.largeimg);
    //initiates the firebase side uploading
    uploadTask.on(
      'state_changed',
      snapShot => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
        
      },
      err => {
        //catches the errors
        console.log(err);
        NotificationManager.error(
          'unable to upload new image!',
          'error!',
          2000
        );
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        //  props.firebase.documentstorage.ref('/images').child(imageAsFile.name).getDownloadURL()
        // .then(fireBaseUrl => {
        // setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
        // })
        this.props.firebase
          .productstorage()
          .child('bigthumb')
          .getDownloadURL()
          .then(fireBaseUrl => {
            this.setState({ thumburlbig: fireBaseUrl });
            console.log(this.state.thumburlbig);
            NotificationManager.success(
              'You have added a new image!',
              'Successful!',
              2000
            );
          });
      }
    );
  };
  handleFireBase2Upload = e => {
    e.preventDefault();
    console.log('start of upload');
    // async magic goes here...
    if (this.state.smallimg === '') {
      console.error(
        `not an image, the image file is a ${typeof this.state.largeimg}`
      );
    }
    const uploadTask = this.props.firebase
      .productstorage()
      .child('smallthumb')
      .put(this.state.smallimg);
    //initiates the firebase side uploading
    uploadTask.on(
      'state_changed',
      snapShot => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      err => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        //  props.firebase.documentstorage.ref('/images').child(imageAsFile.name).getDownloadURL()
        // .then(fireBaseUrl => {
        // setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
        // })
        this.props.firebase
          .productstorage()
          .child('smallthumb')
          .getDownloadURL()
          .then(fireBaseUrl => {
            this.setState({ thumburlsmall: fireBaseUrl });
            NotificationManager.success(
              'You have added a new image!',
              'Successful!',
              2000
            );
          });
      }
    );
  };
  handleSubmit = e => {
    e.preventDefault();
    products.push(this.state);
    console.log(products);
    if(this.state.description===""||this.state.title===""|| this.state.thumburlbig===""
    ||this.state.thumburlsmall===""|| this.state.shipping===""){
      NotificationManager.error(
        'please make sure all inputs are filled',
        'error!',
        2000
      );
    }
    else{
      this.props.firebase.products().set(products).catch((error)=>{
        NotificationManager.error(
          error,
          'error!',
          2000
        );
      }).then(()=>{
        NotificationManager.success(
          'You have added a new product!',
          'Successful!',
          2000
        );
      })
    }

  };
  handleAllChecked = event => {
    let fruites = this.state.fruites;
    fruites.forEach(fruite => (fruite.isChecked = event.target.checked));
    this.setState({ fruites: fruites });
    this.setState({ availableSizes: this.state.filterss });
  };
  handleImageAsFile = e => {
    const image = e.target.files[0];
    this.setState({ largeimg: image });
  };
  handleImage2AsFile = e => {
    const image = e.target.files[0];
    this.setState({ smallimg: image });
  };
  handleCheckChieldElement = event => {
    let fruites = this.state.fruites;
    let arr = [];
    fruites.forEach(fruite => {
      if (fruite.value === event.target.value)
        fruite.isChecked = event.target.checked;
    });
    this.setState({ fruites: fruites });
    fruites.forEach(fruite => {
      if (fruite.isChecked) {
        arr.push(fruite.value);
        // this.setState({availableSizes:arr})
      }
    });

    this.state.availableSizes = arr;
    console.log(this.state.availableSizes);
  };

  render() {
    return (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <form className="form2">
            Title:
            <input
              required
              type="text"
              placeholder="enter title"
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
            />
            Description:
            <textarea
              required
              placeholder="enter title"
              onChange={e => {
                this.setState({ description: e.target.value });
              }}
            />
            Price:
            <input
              required
              type="number"
              pattern="^-?[0-9]\d*\.?\d*$"
              placeholder="enter price"
              step='any'
              onChange={e => {
                this.setState({ price: e.target.value });
              }}
            />
            Shipping-Price:
            <input
              required
              type="number"
              pattern="^-?[0-9]\d*\.?\d*$"
              placeholder="enter shipping-price"
              step='any'
              onChange={e => {
                this.setState({ shipping: e.target.value });
              }}
            
            />
            New Product SkU:{this.state.sku}
            <br />
            Pick productPic(Large):
            <input
              required
              type="file"
              placeholder="choose"
              onChange={this.handleImageAsFile.bind(this)}
            />
            Upload now:(upload before submitting!!!)
            <button onClick={this.handleFireBaseUpload}>
              upload big image
            </button>
            Pick productPic(small):
            <input
              type="file"
              placeholder="choose"
              onChange={this.handleImage2AsFile.bind(this)}
              required
            />
            Upload now:(upload before subbmitting!!!)
            <button onClick={this.handleFireBase2Upload}>
              upload small image
            </button>
          </form>
          <div className="Adp">
            <h1>Pick Product Tags</h1>
            Check / Uncheck All
            <input
              required
              type="checkbox"
              onClick={this.handleAllChecked}
              value="checkedall"
            />{' '}
            <ul className="headache">
              {this.state.fruites.map(fruite => {
                return (
                  <CheckBox
                    handleCheckChieldElement={this.handleCheckChieldElement}
                    {...fruite}
                  />
                );
              })}
            </ul>
            <button type="submit" onClick={this.handleSubmit} >
              ADD NEW PRODUCT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function CheckBox(props) {
  return (
    <div>
      <li style={{ display: 'flex', justifyContent: 'centre' }}>
        {props.value}
        <input
          key={props.id}
          onClick={props.handleCheckChieldElement}
          type="checkbox"
          checked={props.isChecked}
          value={props.value}
        />{' '}
      </li>
    </div>
  );
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});
export default compose(
  connect(mapStateToProps),
  withAuthorization(condition)
)(withFirebase(addproduct));
