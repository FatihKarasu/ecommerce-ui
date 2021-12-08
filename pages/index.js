import Head from "next/head";
import Banner from "../components/Home/Banner";
import Carousel from "../components/Home/Carousel";
import { getCampaigns } from "../data/campaign";
export default function Home({_campaigns}) {
  return (
    <>
      <Head>
        <title>E-Commerce App</title>
        <meta name="keyword" content="E commerce app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container home">
        <Carousel items={_campaigns} />
        <Banner />
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const campaigns= await getCampaigns()
  return {
    props: { _campaigns: campaigns },
  };
}
