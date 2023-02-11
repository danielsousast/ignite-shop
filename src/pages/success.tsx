import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

type SuccessPageProps = {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
};

const SuccessPage: React.FC<SuccessPageProps> = ({ product, customerName }) => {
  return (
    <SuccessContainer>
      <Head>
        <title>Compra efetuada | IgniteShop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>Compra efetuada!</h1>
      <ImageContainer>
        <Image src={product.imageUrl} width={120} height={110} alt="" />
      </ImageContainer>
      <p>
        Uhuul <strong>Daniel Sousa</strong>, sua camiseta ja esta a caminho da
        sua casa
      </p>
      <Link href="/">Voltar ao catalogo</Link>
    </SuccessContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });
  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};

export default SuccessPage;
