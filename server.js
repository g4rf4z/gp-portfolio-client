const path = require("path");
const express = require("express");

const env = process.env.VITE_ENV || "development";
const DIST_DIR = path.join(__dirname, "dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");
const PORT = process.env.PORT || 5000;

// Redirect to an https page.
function forceSsl(req, res, next) {
  if (env !== "production") return next();
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(["https://", req.hostname, req.url].join(""));
  }
  return next();
}

const app = express();

app.set("port", PORT);
app.use("/assets", express.static(path.join(DIST_DIR, "assets")));
app.use("/", express.static("public"));
app.use(forceSsl);

app.get("*", function (req, res) {
  res.setHeader("Last-Modified", new Date().toUTCString());
  res.sendFile(HTML_FILE);
});

app.listen(app.get("port"), function () {
  console.log("Front-end is running on port ", app.get("port"));
});
