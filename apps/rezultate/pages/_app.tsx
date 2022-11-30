import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';

const fetcher = (url: RequestInfo) => fetch(url).then(r => r.json());

export default function App({ Component, pageProps }: AppProps) {
  return <SWRConfig value={{fetcher: fetcher}}><Component {...pageProps} /></SWRConfig>
}
