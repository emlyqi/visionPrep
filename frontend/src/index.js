/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves to route the different pages on the program.
History:
May 28, 2024: Last changes made
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import reportWebVitals from './reportWebVitals';
import UploadPage from './pages/UploadPage';
// import SubmitSelectionsPage from './pages/SubmitSelectionsPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage/>,
  },
  {
    path: "login",
    element: <LoginPage/>,
  },
  {
    path: "about",
    element: <AboutPage/>,
  },
  {
    path: "upload",
    element: <UploadPage/>,
  },
  // {
  //   path: "submit",
  //   element: <SubmitSelectionsPage/>,
  // },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
