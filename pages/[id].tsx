import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { LinksItems } from '../types/enums';
import { GoodsData, Links, Positions } from '../types/types';
import Header from '../components/Header';
import Card from '../components/Card';

interface PropsTypes {
  storeName: string;
  links: Links;
  unit: Positions;
}

const GoodsUnit: NextPage<{ storeName: string; links: Links; unit: Positions }> = ({
  storeName,
  links,
  unit,
}: PropsTypes): React.JSX.Element => {
  const { back } = useRouter();

  const goBack = () => back();
  return (
    <>
      <Head>
        <title>{unit.title}</title>
      </Head>
      <div>
        <Header storeName={storeName} links={links} />
        <Card
          key={unit.id}
          id={unit.id}
          title={unit.title}
          review={unit.review}
          rating={unit.rating}
          price={unit.price}
          stock={unit.stock}
          delivery={unit.delivery}
          logo={unit.logo}
          img={unit.img}
          description={unit.description}
        />
        <div className="GoodsUnit-button__back">
          <button className="GoodsUnit-button" onClick={goBack}>
            Back to goods
          </button>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const storeName = 'smartphone universe';
  const links: Links = {
    main: LinksItems.Goods,
    about: LinksItems.About,
  };
  const goodsData: GoodsData = JSON.parse(
    JSON.stringify(await import('../data/goods.json', { assert: { type: 'json' } }))
  );
  const unit = goodsData.goods.find((el) => el.id === params!.id) as Positions;

  return {
    props: {
      storeName,
      links,
      unit,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const goodsData: GoodsData = JSON.parse(
    JSON.stringify(await import('../data/goods.json', { assert: { type: 'json' } }))
  );

  return {
    paths: goodsData.goods.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: false,
  };
};

export default GoodsUnit;
