import React from 'react';
import about from './data/about.json';
import './About.css';

function About() {
  return (
    <>
      <h2 className="About-title">About Us</h2>
      <p className="About-text">{about.aboutData.map((elem) => elem.description1)}</p>
      <hr className="About-line" />
      <p className="About-text">{about.aboutData.map((elem) => elem.description2)}</p>
    </>
  );
}

export default About;
