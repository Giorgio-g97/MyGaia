import {
  Heading,
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

export default function Welcome({ nomeCliente, nomeOperatore, dataApp, ora }) {
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };

  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };

  const logo = {
    margin: "0 auto",
  };

  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };

  const btnContainer = {
    textAlign: "center",
  };

  const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    padding: "12px",
  };

  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };

  const footer = {
    color: "#8898aa",
    fontSize: "12px",
  };

  return (
    <Html>
      <Head />
      <Preview>Prenotazione Appuntamento</Preview>
      <Tailwind>
        <Body style={main}>
          <Container style={container} className="shadow-xl rounded-md">
            <Img
              src="https://my-gaia.vercel.app/_next/image?url=%2Flogo.jpg&w=256&q=75"
              width="200"
              height="100"
              alt="logo"
              style={logo}
            />
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Prenotazione appuntamento con <strong>{nomeCliente}</strong>
            </Heading>
            <Text className="p-5" style={paragraph}>
              Ciao {nomeOperatore},
            </Text>
            <Text className="p-5" style={paragraph}>
              Il cliente <strong>{nomeCliente}</strong> ha prenotato con te un
              appuntamento, di seguito i dettagli:
            </Text>
            <Section style={btnContainer}>
              <Text>
                <p className="text-left p-5 text-[20px]">
                  <strong>Data appuntamento: </strong>
                  {dataApp}
                </p>
                <p className="text-left p-5 text-[20px]">
                  <strong>Ora: </strong> {ora}
                </p>
              </Text>
              <Hr style={hr} />
              <Text className="text-slate-600 text-left p-5">
                Se non l'avete richiesto, ignorate questa e-mail.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
