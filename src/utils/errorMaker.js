const systemError = (res) =>
  res.status(500).send({ errors: ["Loi he thong."] });

const badRequest = (res, err) =>
  res.status(400).send({
    errors: err.details.map(({ message }) => message),
  });

module.exports = { systemError, badRequest };
