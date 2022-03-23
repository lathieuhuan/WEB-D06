const path = require("path");
// const fs = require("fs");

function upload(req, res, next) {
  if (!req.files || Object.keys(req.files).length === 0) {
    // No files were uploaded.
    return next();
  }
  const image = req.files.image;
  const imgPath = path.join(__dirname, "../../public/upload", image.name);
  image.mv(imgPath, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      req.body.image = image.name;
      // data: fs.readFileSync(imgPath),
      // src="data:image/<%=image.contentType%>;base64,<%=image.data.toString('base64')%>"
      return next();
    }
  });
}

module.exports = upload;
