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
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    // ===============================
    // ITEMS (lo que llega del carrito)
    // ===============================
    const items = req.body.items.map(item => ({
      title: item.name,
      quantity: item.qty,
      unit_price: Number(item.price),
      currency_id: "ARS",
    }));

    // ===============================
    // CREAR PREFERENCE
    // ===============================
    const result = await preference.create({
      body: {
        items,
        back_urls: {
          success: "https://TU-SITIO.com/gracias",
          failure: "https://TU-SITIO.com/error",
          pending: "https://TU-SITIO.com/pendiente",
        },
        auto_return: "approved",
      },
    });

    // 👈 ESTA LÍNEA ES CLAVE
    res.status(200).json({
      init_point: result.body.init_point,
    });

  } catch (error) {
    console.error("MP ERROR:", error);
    res.status(500).json({ error: "MercadoPago error" });
  }
};
