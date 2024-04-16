import React, { useContext } from "react";
import UploadCSV from "../components/Upload";
import SelectDuties from "../components/SelectDuties";
import UploadContext from "../contexts/UploadContext";
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


function Login() {
    // const firebaseConfig = {
    //     apiKey: "AIzaSyBFbLHOATtSsbHDQnkXydDUusJTkin2cZE",
    //     authDomain: "visionprep24.firebaseapp.com",
    //     projectId: "visionprep24",
    //     storageBucket: "visionprep24.appspot.com",
    //     messagingSenderId: "92425337934",
    //     appId: "1:92425337934:web:5579b5e7a9f7570974171f",
    //     measurementId: "G-598PF2WFSC"
    // };

    // const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    // const provider = new GoogleAuthProvider();
    // const auth = getAuth();

    // signInWithRedirect(auth, provider);
    // getRedirectResult(auth)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access Google APIs.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
  
    //     // The signed-in user info.
    //     const user = result.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
    return(
        <Box sx={{ display: 'flex' }}>
            <Button component={Link} to="/upload"> 
                Log In
            </Button>
        </Box>
    );
}

export default Login;