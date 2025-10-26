const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const now = new Date();
  const formattedDate = now.toLocaleDateString("uk-UA");
  const formattedTime = now.toLocaleTimeString("uk-UA");

  const logToFile = (route) => {
    const log = `[${now.toISOString()}] Запит на ${route}\n`;
    fs.appendFileSync("log.txt", log);
  };

  switch (req.url) {
    case "/":
      res.end("<h1>Ласкаво просимо на головну сторінку!</h1>");
      break;

    case "/about":
      res.end("<h1>Про застосунок</h1><p>Це мій перший сервер на Node.js!</p>");
      break;

    case "/time":
      res.end(`<h2>Поточний час: ${formattedDate}, ${formattedTime}</h2>`);
      logToFile("/time");
      break;

    case "/time/json":
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(
        JSON.stringify({ date: formattedDate, time: formattedTime }, null, 2)
      );
      logToFile("/time/json");
      break;

    default:
      res.statusCode = 404;
      res.end("<h1>404 - Сторінку не знайдено</h1>");
      break;
  }
});

server.listen(port, () =>
  console.log(`Сервер запущено на http://localhost:${port}`)
);
