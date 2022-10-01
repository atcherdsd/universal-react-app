import React from 'react';
import about from './data/about.json';
import './About.css';

const [aboutData1, aboutData2] = about.aboutData;

function About() {
  return (
    <>
      <h2 className="About-title">About Us</h2>
      <p className="About-text">{aboutData1.description}</p>
      <hr className="About-line" />
      <p className="About-text">{aboutData2.description}</p>
    </>
  );
}

export default About;
