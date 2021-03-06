// const fs = require('fs');
// const https = require('https');
import http from 'http';
import loader from './loaders/loader';

const setupServer = async () : Promise<void> => {
  const app = await loader();

  // Setup http server
  const httpServer = http.createServer(app);
  httpServer.listen(process.env.PORT, () => console.log(`${process.env.NODE_ENV} HTTP server, running on port ${process.env.PORT}`));

  // Setup https server(may be not needed, causing unecessary overhead)
  /* const httpsCertificate = {
    key: fs.readFileSync('./resources/ssl-tls/certificate.key', 'utf-8'),
    cert: fs.readFileSync('./resources/ssl-tls/certificate.crt', 'utf-8'),
  };
  const httpsServer = https.createServer(httpsCertificate, app);
    httpsServer.listen(process.env.PORT_HTTPS, () => {
    console.log(`${process.env.NODE_ENV} HTTPS server, running on port ${process.env.PORT_HTTPS}`);
  }); */

  // Unexpected error events
  process.on('unhandledRejection', (err, promise) => {
    httpServer.close(() => process.exit(1));
    // httpsServer.close(() => process.exit(1));
  });
  process.on('uncaughtException', (err) => {
    httpServer.close(() => process.exit(1));
    // httpsServer.close(() => process.exit(1));
  });
  process.on('SIGTERM', (signal) => {
    httpServer.close(() => process.exit(1));
    // httpsServer.close(() => process.exit(1));
  });
  process.on('SIGINT', (signal) => {
    httpServer.close(() => process.exit(1));
    // httpsServer.close(() => process.exit(1));
  });
};

setupServer();
