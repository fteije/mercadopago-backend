const { MercadoPagoConfig, Preference } = require("mercadopago");

module.exports = async function handler(req, res) {

  // ===============================
  // CORS
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
    if (!req.body.items || !Array.isArray(req.body.items)) {
      return res.status(400).json({ error: "Items inválidos" });
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    // 🔥 ITEMS REALES DEL CARRITO
    const items = req.body.items.map(item => ({
      title: item.name,
      quantity: item.qty,
      unit_price: Number(item.price),
      currency_id: "ARS",
    }));

    const result = await preference.create({
      body: {
        items
      }
    });

    // compatible con distintas versiones del SDK
    const initPoint =
      result.init_point ||
      (result.body && result.body.init_point);

    if (!initPoint) {
      throw new Error("No init_point returned from MercadoPago");
    }

    res.status(200).json({
      init_point: initPoint,
    });

  } catch (error) {
    console.error("MP ERROR:", error);
    res.status(500).json({
      error: error.message || "MercadoPago error"
    });
  }
};
