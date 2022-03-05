const http = require("http");

http
  .createServer((req, res) => {
    if (req.url === "/index") {
      res.write("trang chu");
    } else if (req.url === "/about") {
      res.write("thong tin");
    } else {
      res.write("trang ko ton tai");
    }
    res.end();
  })
  .listen(8080);
