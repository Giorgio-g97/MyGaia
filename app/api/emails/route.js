import Welcome from "@/emails/Welcome.jsx";
import { Resend } from "resend";

// RESEND API
const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, nomeCliente, nomeOperatore, dataApp, ora } =
      await req.json();

    await resend.emails.send({
      from: "mosihom618@barakal.com", // Ricordati che in produzione dovrai usare un account vero!
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
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
