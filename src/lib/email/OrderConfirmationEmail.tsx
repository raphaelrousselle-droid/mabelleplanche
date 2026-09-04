import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components";

export type OrderEmailLine = {
  description: string;
  quantity: number;
  amount: string;
};

export type OrderConfirmationEmailProps = {
  customerName?: string;
  orderRef: string;
  lines: OrderEmailLine[];
  shipping?: string;
  total: string;
  shippingAddress?: string[];
};

const main = { backgroundColor: "#fbf7f0", fontFamily: "Georgia, 'Times New Roman', serif" };
const container = { margin: "0 auto", padding: "24px", maxWidth: "560px" };
const card = { backgroundColor: "#ffffff", border: "1px solid #e4d9c8", borderRadius: "12px", padding: "28px" };
const muted = { color: "#6b5f52", fontSize: "14px", lineHeight: "22px" };
const heading = { color: "#2e2620", fontSize: "22px", margin: "0 0 8px" };

export function OrderConfirmationEmail({
  customerName,
  orderRef,
  lines,
  shipping,
  total,
  shippingAddress,
}: OrderConfirmationEmailProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Votre commande Ma belle planche est confirmée</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={{ ...muted, textTransform: "uppercase", letterSpacing: "1px" }}>
            Ma belle planche
          </Text>
          <Section style={card}>
            <Heading style={heading}>Merci{customerName ? `, ${customerName}` : ""} !</Heading>
            <Text style={muted}>
              Votre commande <strong>{orderRef}</strong> est confirmée et votre
              paiement bien reçu. Chaque planche étant fabriquée à la main, un
              court délai de préparation peut s&apos;ajouter avant l&apos;expédition
              en France métropolitaine.
            </Text>

            <Hr style={{ borderColor: "#e4d9c8", margin: "20px 0" }} />

            {lines.map((line, i) => (
              <Row key={i} style={{ marginBottom: "6px" }}>
                <Column style={{ ...muted, color: "#2e2620" }}>
                  {line.description}
                  {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                </Column>
                <Column style={{ ...muted, color: "#2e2620", textAlign: "right" }}>
                  {line.amount}
                </Column>
              </Row>
            ))}

            {shipping && (
              <Row style={{ marginBottom: "6px" }}>
                <Column style={muted}>Livraison</Column>
                <Column style={{ ...muted, textAlign: "right" }}>{shipping}</Column>
              </Row>
            )}

            <Hr style={{ borderColor: "#e4d9c8", margin: "16px 0" }} />

            <Row>
              <Column style={{ ...heading, fontSize: "18px", margin: 0 }}>Total</Column>
              <Column style={{ ...heading, fontSize: "18px", margin: 0, textAlign: "right" }}>
                {total}
              </Column>
            </Row>

            {shippingAddress && shippingAddress.length > 0 && (
              <>
                <Hr style={{ borderColor: "#e4d9c8", margin: "20px 0" }} />
                <Text style={{ ...muted, margin: 0 }}>
                  <strong>Adresse de livraison</strong>
                  <br />
                  {shippingAddress.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </Text>
              </>
            )}
          </Section>

          <Text style={{ ...muted, textAlign: "center", marginTop: "16px" }}>
            Une question ? Répondez simplement à cet email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default OrderConfirmationEmail;
