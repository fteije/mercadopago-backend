import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { items } = req.body;

  const preference = {
    items,
    back_urls: {
      success: "https://TU-SITIO.webflow.io/success",
      failure: "https://TU-SITIO.webflow.io/error"
    },
    auto_return: "approved"
  };

  const response = await mercadopago.preferences.create(preference);

  res.status(200).json({
    init_point: response.body.init_point
  });
}
