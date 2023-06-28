import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Header from '../../components/Header';
import { AboutData, Links } from '../../types/types';
import { LinksItems } from '../../types/enums';

export interface PropsTypes {
  storeName: string;
  links: Links;
  aboutData: AboutData;
}

const About: NextPage<{ storeName: string; links: Links; aboutData: AboutData }> = ({
  storeName,
  links,
  aboutData,
}: PropsTypes): React.JSX.Element => {
  const [aboutData1, aboutData2] = aboutData.aboutData;
  return (
    <>
      <Header storeName={storeName} links={links} />
      <hr className="About-line__common" />
      <h2 className="About-title">About Us</h2>
      <p className="About-text">{aboutData1.description}</p>
      <hr className="About-line" />
      <p className="About-text">{aboutData2.description}</p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const storeName = 'smartphone universe';
  const links: Links = {
    main: LinksItems.Goods,
    about: LinksItems.About,
  };
  const aboutData: AboutData = JSON.parse(
    JSON.stringify(await import('../../data/about.json', { assert: { type: 'json' } }))
  );

  return {
    props: {
      storeName,
      links,
      aboutData,
    },
  };
};

export default About;
