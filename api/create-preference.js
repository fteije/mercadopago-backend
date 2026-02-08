const { MercadoPagoConfig, Preference } = require("mercadopago");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
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
            title: "Producto de prueba",
            quantity: 1,
            unit_price: 1000,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "https://google.com",
          failure: "https://google.com",
          pending: "https://google.com",
        },
        auto_return: "approved",
      },
    });

    res.status(200).json({
      init_point: result.init_point,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "MercadoPago error" });
  }
};
