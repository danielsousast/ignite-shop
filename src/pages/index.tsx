import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { HomeContainer, Product as ProductWrapper } from "../styles/pages/home";
import { GetStaticProps } from "next";
import { listProductsUseCase, Product } from "../usecases/list-products";
import Link from "next/link";
import Head from "next/head";

type HomeProps = {
  products: Product[];
};

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Head>
        <title>Home | IgniteShop</title>
      </Head>
      {products?.map((product) => {
        return (
          <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
            <ProductWrapper className="keen-slider__slide">
              <Image src={product.imageUrl} alt={""} width={520} height={480} />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </ProductWrapper>
          </Link>
        );
      })}
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await listProductsUseCase();
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, //2 hours
  };
};
