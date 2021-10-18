import Head from 'next/head'

import Image from 'next/image'
export default function Home() {

  return (
    <div className="container">
      <Head>
        <title>E-Commerce App</title>
        <meta name="keyword" content="E commerce app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Home Page
      
    </div>
  )
}

/*export async function getServerSideProps({ req }) {
  const cookies=parseCookies(req)
  return {
    props: { cookies: cookies },
  };
}*/