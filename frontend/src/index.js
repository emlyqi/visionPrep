/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves to route the different pages on the program.
History:
May 28, 2024: Last changes made
*/

/** IMPORT LIBRARIES */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WelcomePage from './pages/WelcomePage';
import AboutPage from './pages/AboutPage';
import reportWebVitals from './reportWebVitals';
import UploadPage from './pages/UploadPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// routing system
const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage/>,
  },
  {
    path: "about",
    element: <AboutPage/>,
  },
  {
    path: "upload",
    element: <UploadPage/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
