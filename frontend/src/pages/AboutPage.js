/** 
VisionPrep
ICS4U-03
Emily Qi and Jamie Xiao
This file serves to display the about page and its components.
History:
May 28, 2024: Last changes made
*/

import React, { PureComponent } from 'react'
import Navbar from '../components/Navbar'

export class AboutPage extends PureComponent {
  render() {
    const aboutText = "This is information about ‘visionPrep."

    return (
      <div style={{height: '100vh', backgroundColor: '#34363D'}}>
        <Navbar></Navbar>
        <p style={{position: 'absolute', left:'50%', top:'50%', transform: 'translate(-50%,-50%)', color: 'white'}}>
          {aboutText}
        </p>
      </div>
    )
  }
}

export default AboutPage
