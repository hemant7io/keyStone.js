import { gql } from "@apollo/client";
import client from "../lib/apollo-client";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Query {
        products {
          id
          description
          price
          title
        }
      }
    `,
  });

  return {
    props: {
      data: data.products,
    },
  };
}

export default function Home(props: data) {
  const { data } = props;

  return (
    <main>
      <h1>hello world</h1>
    </main>
  );
}

interface data {
  data: [];
}
