import React from 'react';
import about from './data/about.json';
import './About.css';

const [aboutData] = about.aboutData.map((elem) => elem);

function About() {
  return (
    <>
      <h2 className="About-title">About Us</h2>
      <p className="About-text">{aboutData.description[0]}</p>
      <hr className="About-line" />
      <p className="About-text">{aboutData.description[1]}</p>
    </>
  );
}

export default About;
