import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { getProductUseCase } from "../../usecases/get-product";
import { Product } from "../../usecases/list-products";

type ProductProps = {
  product: Product;
};

const ProductPage: React.FC<ProductProps> = ({ product }) => {
  const { isFallback } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (isFallback) {
    return <p>Loading...</p>;
  }

  async function handleByProduct() {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/api/checkout", {
        priceId: product.defaultPriceId,
      });

      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert("Ocorreu um erro");
    }
  }

  return (
    <ProductContainer>
      <Head>
        <title>{product.name} | IgniteShop</title>
      </Head>
      <ImageContainer>
        <Image src={product.imageUrl} alt={""} width={520} height={480} />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button disabled={isLoading} onClick={handleByProduct}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { id: "" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;
  const product = await getProductUseCase(productId as string);

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 1,
  };
};

export default ProductPage;
