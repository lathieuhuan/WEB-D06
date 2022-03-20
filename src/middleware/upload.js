const path = require("path");
const fs = require("fs");

function upload(req, res, next) {
  if (!req.files || Object.keys(req.files).length === 0) {
    // No files were uploaded.
    return next();
  }
  const image = req.files.image;
  const imgPath = path.join(__dirname, "../../public/upload", image.name);
  image.mv(imgPath, (err) => {
    if (err) return res.status(500).send(err);
    req.body.image = {
      name: image.name,
      contentType: image.mimetype,
      data: fs.readFileSync(imgPath),
    };
    return next();
  });
}

module.exports = upload;
