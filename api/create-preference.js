const { MercadoPagoConfig, Preference } = require("mercadopago");

module.exports = async function handler(req, res) {

  // ===============================
  // CORS (OBLIGATORIO)
  // ===============================
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: "Producto Test",
            quantity: 1,
            unit_price: 1000,
            currency_id: "ARS",
          }
        ]
      }
    });

    res.status(200).json({
      init_point: result.body.init_point,
    });

  } catch (error) {
    console.error("MP ERROR REAL:", error);
    res.status(500).json({
      error: error.message || "MercadoPago error"
    });
  }
};
