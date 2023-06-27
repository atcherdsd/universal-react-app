import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
// import { getAllPosts, getOnePost, Post } from '../../services/post';
import Head from 'next/head';
import React from 'react';
import { StorageItems } from '../../types/enums';
import { GoodsData, Links, Positions } from '../../types/types';
import Header from '../../components/Header';
import Card from '../../components/Card';

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

export const getStaticProps: GetStaticProps = async () => {
  //   const post = await getOnePost(context.params.id);
  const storeName = 'smartphone universe';
  const links: Links = {
    main: '/',
    about: '/about',
  };
  const goodsData: GoodsData = await import('../../data/goods.json', { assert: { type: 'json' } });
  const unit = goodsData.goods.find(
    (elem) => elem.id === (localStorage.getItem(StorageItems.SelectedUnit) as string)
  ) as Positions;

  return {
    props: {
      // post: post,
      storeName,
      links,
      unit,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const goodsData: GoodsData = await import('../../data/goods.json', { assert: { type: 'json' } });

  return {
    paths: goodsData.goods.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: false,
  };
};

export default GoodsUnit;
