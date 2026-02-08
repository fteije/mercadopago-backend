const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const preference = {
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
    };

    const response = await mercadopago.preferences.create(preference);

    res.status(200).json({
      init_point: response.body.init_point,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "MercadoPago error" });
  }
};
