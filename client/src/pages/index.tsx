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
      {data?.map((item: any, index) => (
        <>
          <div className="shadow p-4 border w-[400px] m-4">
            <h1>{item?.title}</h1>
            <h5>{item?.price}</h5>
            <p>{item?.description}</p>
          </div>
        </>
      ))}
    </main>
  );
}

interface data {
  data: [];
}
