import React from 'react';
import './About.scss';
import about from 'data/about.json';
import { IAboutData } from 'types/interfaces';

const [aboutData1, aboutData2, aboutData3]: IAboutData[] = about.aboutData;

const About: React.FC = () => {
  return (
    <>
      <hr className="About-line__common" />
      <h2 className="About-title">About</h2>
      <p className="About-text">{aboutData1.description}</p>
      <hr className="About-line" />
      <p className="About-text">
        {aboutData2.description}
        <span className="About-link">
          <a href="https://github.com/atcherdsd">Link</a>
        </span>
      </p>
      <p className="About-text">
        {aboutData3.description}
        <span className="About-link">
          <a href="https://www.linkedin.com/in/scharniak/">Link</a>
        </span>
      </p>
    </>
  );
};

export default About;
