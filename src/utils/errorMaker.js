const systemError = (res) =>
  res.status(500).send({ errors: ["Loi he thong."] });

module.exports = { systemError };
