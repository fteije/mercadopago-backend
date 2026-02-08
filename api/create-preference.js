module.exports = function handler(req, res) {
  res.status(200).json({ ok: true });
};
    res.status(200).json({
      init_point: response.body.init_point,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "MercadoPago error" });
  }
}
