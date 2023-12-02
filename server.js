import path from 'path';
import express from 'express';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.VITE_ENV || 'development';
const DIST_DIR = path.join(__dirname, 'dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const PORT = process.env.PORT || 5000;

function forceSsl(req, res, next) {
  if (env !== 'production') return next();
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.hostname, req.url].join(''));
  }
  return next();
}

const app = express();

app.set('port', PORT);
app.use('/assets', express.static(path.join(DIST_DIR, 'assets')));
app.use('/', express.static('public'));
app.use(forceSsl);

app.get('*', function (req, res) {
  res.setHeader('Last-Modified', new Date().toUTCString());
  res.sendFile(HTML_FILE);
});

app.listen(app.get('port'), function () {
  console.log('Client is running on port ', app.get('port'));
});
