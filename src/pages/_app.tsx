/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { AppProps } from 'next/app'
import { gobalStyles } from '../styles/global'
import logoSvg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app';

gobalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <img src={logoSvg.src} />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
