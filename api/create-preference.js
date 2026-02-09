const { MercadoPagoConfig, Preference } = require("mercadopago");

module.exports = async function handler(req, res) {

  // ✅ CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
@@ -12,20 +22,20 @@ module.exports = async function handler(req, res) {

    const preference = new Preference(client);

    const items = req.body.items.map(item => ({
      title: item.name,
      quantity: item.qty,
      unit_price: item.price,
      currency_id: "USD",
    }));

    const result = await preference.create({
      body: {
        items: [
          {
            title: "Producto de prueba",
            quantity: 1,
            unit_price: 1000,
            currency_id: "ARS",
          },
        ],
        items,
        back_urls: {
          success: "https://google.com",
          failure: "https://google.com",
          pending: "https://google.com",
          success: "https://TU-SITIO.com/gracias",
          failure: "https://TU-SITIO.com/error",
          pending: "https://TU-SITIO.com/pendiente",
        },
        auto_return: "approved",
      },
