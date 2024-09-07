import { gql, request } from "graphql-request";

const MASTER_URL =
  "https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/" +
  process.env.NEXT_PUBLIC_MASTER_URL_KEY +
  "/master";

const getServizi = async () => {
  const query = gql`
    query GetServizi {
      servizis {
        id
        nome
        path
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
  const query = gql`
    query GetSettori {
      settores {
        id
        nome
        descrizione
        immagine {
          url
        }
        color
      }
    }
  `;
  const res = await request(MASTER_URL, query);
  return res;
};

const getOperatori = async () => {
  const query = gql`
    query GetOperatori {
      operatoris {
        email
        id
        nomeOperatore
        settore {
          nome
          id
        }
      }
    }
  `;

  const res = await request(MASTER_URL, query);
  return res;
};

/**
 * La query interroga l'array di operatori che hanno un determinato idSettore
 * (che passo come parametro alla funct async che passerò come urlParams nella route
 * dinamica)
 */
const getOperatoriBySettori = async (settore) => {
  const query = gql`
  query GetOperatori {
  operatoris(where: {settore: {id: "${settore}"}}) {
    email
    id
    nomeOperatore
    settore {
      nome
      id
    }
  }
}
  `;

  const res = await request(MASTER_URL, query);
  return res;
};

const createPrenot = async (operatoreId, data, ora, email, nome) => {
  const mutation = gql`
    mutation CreatePrenot {
      createPrenotazione(
        data: {
          statoPrenotazione: prenotato
          operatori: { connect: { id: "${operatoreId}" } }
          ora: "${data}"
          data: "${ora}"
          email: "${email}"
          nome: "${nome}"
        }
      ) {
        id
      }
      publishManyPrenotaziones(to: PUBLISHED) {
        count
      }
    }
  `;

  const res = await request(MASTER_URL, mutation);
  return res;
};

const GetPrenByIdEData = async (operatoreId, data) => {
  const query = gql`
  query PrenotByIdEData {
  prenotaziones(where: {operatori: {id: "${operatoreId}"}, data: "${data}"}) {
    data
    ora
  }
}
`
const res = await request(MASTER_URL, query);
return res;
}

export default {
  getServizi,
  getSettori,
  getOperatori,
  getOperatoriBySettori,
  createPrenot,
  GetPrenByIdEData
};
