import Welcome from "@/emails/Welcome.jsx";
// import { Resend } from "resend";

// // RESEND API
// const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

// export async function POST(req) {
//   try {
//     const { email, nomeCliente, nomeOperatore, dataApp, ora } =
//       await req.json();

//     await resend.emails.send({
//       from: "maildiprova@gmail.com", // Ricordati che in produzione dovrai usare un account vero!
//       to: email,
//       subject: "Prenotazione appuntamento",
//       react: (
//         <Welcome
//           nomeCliente={nomeCliente}
//           nomeOperatore={nomeOperatore}
//           dataApp={dataApp}
//           ora={ora}
//         />
//       ),
//     });
//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }
//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }

import { render } from "@react-email/components";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, nomeCliente, nomeOperatore, dataApp, ora } =
      await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PWD,
      },
    });

    const bodyMail = await render(
      <Welcome
        nomeCliente={nomeCliente}
        nomeOperatore={nomeOperatore}
        dataApp={dataApp}
        ora={ora}
      />
    );

    const options = {
      from: "mail da creare",
      to: email,
      subject: "Prenotazione appuntamento",
      html: bodyMail,
    };

    await transporter.sendMail(options);
  } catch {
    (err) => console.log(err);
  }
}
