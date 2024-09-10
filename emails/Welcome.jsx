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

export default function Welcome({ nomeCliente, nomeOperatore, data, selectedTime}) {
  

  return (
    <Html>
      <Head />
      <Preview>Prenotazione appuntamento</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              {/* <Image
                src={logo}
                width="100"
                height="50"
                alt="icon"
                className="my-0 mx-auto"
              /> */}
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
                {data}
              </p>
              <p><strong>Ora: </strong> {selectedTime}</p>
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  
                </Column>
                <Column align="center">
                  {/* <Img
                    src={`${baseUrl}/static/vercel-arrow.png`}
                    width="12"
                    height="9"
                    alt="invited you to"
                  /> */}
                </Column>
                <Column align="left">
                  
                </Column>
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{" "}
              <span className="text-black"></span>. This invite was
              sent from <span className="text-black"></span>{" "}
              located in{" "}
              <span className="text-black"></span>. If you
              were not expecting this invitation, you can ignore this email. If
              you are concerned about your account's safety, please reply to
              this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
