export type Links = {
  main: string;
  about: string;
};

export type GoodsData = {
  default: {
    goods: {
      id: string;
      title: string;
      review: string;
      rating: string;
      price: string;
      stock: string;
      delivery: string;
      logo: string;
      img: string;
      description: {
        info: string[];
      };
    }[];
  };
  goods: {
    id: string;
    title: string;
    review: string;
    rating: string;
    price: string;
    stock: string;
    delivery: string;
    logo: string;
    img: string;
    description: {
      info: string[];
    };
  }[];
};

export type AboutData = {
  default: {
    aboutData: {
      description: string;
    }[];
  };
  aboutData: {
    description: string;
  }[];
};

export type Positions = {
  id: string;
  title: string;
  review: string;
  rating: string;
  price: string;
  stock: string;
  delivery: string;
  logo: string;
  img: string;
  description: {
    info: string[];
  };
};

export type HandleResult = { (): void };

export type SearchText = { (event: { target: { value: string } }): void };
