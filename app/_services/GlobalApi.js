import { gql, request } from "graphql-request";

const MASTER_URL =
  'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/'+process.env.NEXT_PUBLIC_MASTER_URL_KEY+'/master';

const getServizi = async () => {
  const query = gql`
    query GetServizi {
      servizis {
        id
        nome
        immagine {
          url
        }
      }
    }
  `;

  const res = await request(MASTER_URL, query);
  return res;
};

const getSettori = async () => {
  const query=gql`
  query GetSettori {
  settores {
    id
    nome
    descrizione
    immagine {
      url
    }
    coloreSettore {
      hex
    }
  }
}
`
  const res = await request(MASTER_URL, query);
  return res;

}

export default {
  getServizi,
  getSettori
};
