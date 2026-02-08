const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items } = req.body;

    const preference = {
      items: items.map(item => ({
        title: item.name,
        quantity: item.quantity,
        unit_price: Number(item.price),
        currency_id: "ARS",
      })),
      back_urls: {
        success: "https://tusitio.com/success",
        failure: "https://tusitio.com/failure",
        pending: "https://tusitio.com/pending",
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
}
