import Welcome from "@/emails/Welcome.jsx";
import { Resend } from "resend";

// RESEND API
const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(req) {
  const { email, nomeCliente, nomeOperatore, dataApp, ora } = await req.json();

  await resend.emails.send({
    from: "giorgio.g97@gmail.com", // Ricordati che in produzione dovrai usare un account vero!
    to: email,
    subject: "Prenotazione appuntamento",
    react: (
      <Welcome
        nomeCliente={nomeCliente}
        nomeOperatore={nomeOperatore}
        dataApp={dataApp}
        ora={ora}
      />
    ),
  });
}
