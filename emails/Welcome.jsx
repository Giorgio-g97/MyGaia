import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

export default function Welcome({ nomeCliente, nomeOperatore, dataApp, ora, logo}) {
  return (
    <Html>
      <Head />
      <Preview>Prenotazione appuntamento</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px] flex justify-center items-center">
              <Img
                className="flex items-center justify-center text-center"
                src="https://my-gaia.vercel.app/_next/image?url=%2Flogo.jpg&w=256&q=75"
                width={200}
                height={100}
                alt="logo"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Prenotazione appuntamento con {nomeCliente}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Ciao {nomeOperatore},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Il cliente {nomeCliente} ha prenotato con te un appuntamento, di
              seguito i dettagli:
              <p>
                <strong>Data appuntamento: </strong>
                {dataApp}
              </p>
              <p>
                <strong>Ora: </strong> {ora}
              </p>
            </Text>
            <Section></Section>
            <Section className="text-center mt-[32px] mb-[32px]"></Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{" "}
              <span className="text-black"></span>. This invite was sent from{" "}
              <span className="text-black"></span> located in{" "}
              <span className="text-black"></span> Se non si aspettava questo
              invito, si può ignorare questa e-mail. Se se si è preoccupati per
              la sicurezza del proprio account, si prega di rispondere a questa
              e-mail "(domain email)" per mettervi in contatto con noi.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
