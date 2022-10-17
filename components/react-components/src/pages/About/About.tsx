import React from 'react';
import './About.css';
import about from 'data/about.json';

interface IAboutData {
  description: string;
}

const [aboutData1, aboutData2]: IAboutData[] = about.aboutData;

const About: React.FC = () => {
  return (
    <>
      <hr className="About-line__common" />
      <h2 className="About-title">About Us</h2>
      <p className="About-text">{aboutData1.description}</p>
      <hr className="About-line" />
      <p className="About-text">{aboutData2.description}</p>
    </>
  );
};

export default About;
