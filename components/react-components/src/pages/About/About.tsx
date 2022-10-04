import React from 'react';
import './About.css';

interface IAboutProps {
  p1: string;
  p2: string;
}

const About: React.FC<IAboutProps> = (props) => {
  return (
    <>
      <h2 className="About-title">About Us</h2>
      <p className="About-text">{props.p1}</p>
      <hr className="About-line" />
      <p className="About-text">{props.p2}</p>
    </>
  );
};

export default About;
