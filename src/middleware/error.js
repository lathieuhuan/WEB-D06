const errorHandler = (err, req, res, next) => {
  if (err.kind === "ObjectId") {
    return res.status(400).send({ error: "Id khong hop le." });
  } else if (err.details) {
    return res
      .status(400)
      .send({ error: err.details.map(({ message }) => message).join(" ") });
  }
  const { code, msg } = err;
  if (code && [400, 401, 404].includes(code)) {
    const defaultError = {
      400: "Yeu cau khong hop le.",
      401: "Khong co quyen yeu cau.",
      404: "Khong tim thay thong tin duoc yeu cau.",
    };
    res.status(code).send({ error: msg || defaultError[code] });
  } else {
    console.log(err);
    res.status(500).send({ error: "Loi he thong." });
  }
};

module.exports = { errorHandler };
