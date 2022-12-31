import type { AppProps } from 'next/app'
import { gobalStyles } from '../styles/global'

gobalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
