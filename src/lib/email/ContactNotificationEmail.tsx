import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export type ContactNotificationEmailProps = {
  name: string;
  email: string;
  message: string;
};

const main = { backgroundColor: "#fbf7f0", fontFamily: "Georgia, serif" };
const container = { margin: "0 auto", padding: "24px", maxWidth: "560px" };
const card = {
  backgroundColor: "#ffffff",
  border: "1px solid #e4d9c8",
  borderRadius: "12px",
  padding: "28px",
};
const muted = { color: "#6b5f52", fontSize: "14px", lineHeight: "22px" };

export function ContactNotificationEmail({
  name,
  email,
  message,
}: ContactNotificationEmailProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Nouveau message depuis le site</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <Heading style={{ color: "#2e2620", fontSize: "20px", margin: "0 0 12px" }}>
              Nouveau message depuis mabelleplanche.fr
            </Heading>
            <Text style={{ ...muted, color: "#2e2620", margin: 0 }}>
              <strong>{name}</strong> — {email}
            </Text>
            <Hr style={{ borderColor: "#e4d9c8", margin: "16px 0" }} />
            <Text style={{ ...muted, whiteSpace: "pre-wrap", margin: 0 }}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotificationEmail;
