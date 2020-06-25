import React from 'react';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../components/Firebase';
import Firebase from '../components/Firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { useSelector } from 'react-redux';
function docuploader(props) {
  const allInputs = { imgUrl: '' };
  const image1name = 'national-Id';
  const image2name = 'Utility-Bill';
  const image3name = 'Account-Statement';
  const [imageAsFile, setImageAsFile] = React.useState('hey');
  const [image2AsFile, setImage2AsFile] = React.useState('hey');
  const [image3AsFile, setImage3AsFile] = React.useState('hey');
  const [image1AsUrl, setImage1AsUrl] = React.useState("");
  const [image2AsUrl, setImage2AsUrl] = React.useState("");
  const [image3AsUrl, setImage3AsUrl] = React.useState("");
  const authuser = props.authUser;
  console.log(authuser);
  const handleImageAsFile = e => {
    const image = e.target.files[0];
    setImageAsFile(imageFile => image);
  };
  const handleImage2AsFile = e => {
    const image = e.target.files[0];
    setImage2AsFile(imageFile => image);
  };
  const handleImage3AsFile = e => {
    const image = e.target.files[0];
    setImage3AsFile(imageFile => image);
  };
  const handleFireBaseUpload = e => {
    e.preventDefault();
    console.log('start of upload');
    // async magic goes here...
    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = props.firebase
      .documentstorage(authuser.uid +"-"+authuser.email)
      .child(image1name)
      .put(imageAsFile);
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
          props.firebase.documentstorage(authuser.uid +"-"+authuser.email).child(image1name).getDownloadURL()
       .then(fireBaseUrl => {
       props.firebase.user(authuser.uid).child("iddocurl").set(fireBaseUrl)
        })
      }
    );
  };
  const handleFireBase2Upload = e => {
    e.preventDefault();
    console.log('start of upload');
    // async magic goes here...
    if (image2AsFile === '') {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = props.firebase
      .documentstorage(authuser.uid +"-"+authuser.email)
      .child(image2name)
      .put(image2AsFile);
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
        props.firebase.documentstorage(authuser.uid +"-"+authuser.email).child(image2name).getDownloadURL()
       .then(fireBaseUrl => {
       props.firebase.user(authuser.uid).child("utilitybilldocurl").set(fireBaseUrl)
        })
      }
    );
  };
  const handleFireBase3Upload = e => {
    e.preventDefault();
    console.log('start of upload');
    // async magic goes here...
    if (image3AsFile === '') {
      console.error(`not an image, the image file is a ${typeof image3AsFile}`);
    }
    const uploadTask = props.firebase
      .documentstorage(authuser.uid +"-"+ authuser.email)
      .child(image3name)
      .put(image3AsFile);
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
        props.firebase.documentstorage(authuser.uid +"-"+authuser.email).child(image3name).getDownloadURL()
       .then(fireBaseUrl => {
       props.firebase.user(authuser.uid).child("acctdocurl").set(fireBaseUrl)
        })
      }
    );
  };
  return (
    <div className="upload" style={{margin:'50px 30px'}}>
      <h1>UPLOAD YOUR FILES FOR THE REVIEW PROCESS</h1>
      <form onSubmit={handleFireBaseUpload} >
        <input
          // allows you to reach into your file directory and upload image to the browser
          type="file"
          onChange={handleImageAsFile}
        />
        <Button type="submit" variant="contained" color="Primary">Upload Identification Document</Button>
      </form>
      <form onSubmit={handleFireBase2Upload}>
        <input
          // allows you to reach into your file directory and upload image to the browser
          type="file"
          onChange={handleImage2AsFile}
        />
        <Button type="submit" variant="contained" color="Primary">Upload Utility Bill Document</Button>
      </form>
      <form onSubmit={handleFireBase3Upload}>
        <input
          // allows you to reach into your file directory and upload image to the browser
          type="file"
          onChange={handleImage3AsFile}
        />

        <Button type="submit" variant="contained" color="Primary">Upload 6 month Account Document</Button>
      </form>
    </div>
  );
}
const mapStateToProps = state => ( { 
  authUser: state.sessionState.authUser
});
export default compose(
  connect(mapStateToProps)
)(withFirebase(docuploader))

