const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function getDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString("uk-UA");
  const time = now.toLocaleTimeString("uk-UA");
  return { now, date, time };
}

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/time", (_, res) => {
  const { date, time } = getDateTime();
  res.type("html").send(`<h2>Поточна дата - ${date} та час - ${time}</h2>`);
  fs.appendFileSync("log.txt", `Поточна дата - ${date} та час - ${time}\n`);
});
app.get("/time/json", (req, res) => {
  const { date, time } = getDateTime();
  const dateAndTime = {
    date,
    time,
  };
  res.type("json").send(dateAndTime);
});

app.post("/settime", (req, res) => {
  const { date, time } = req.body;

  if (!date || !time) {
    return res.status(400).json({ error: "Будь ласка введіть дату та час!" });
  }

  fs.writeFileSync(
    "custom.txt",
    `Передані дані дати та часу користувачем: ${date} - ${time}`
  );

  res.status(200).json({ message: `Час успішно записано: ${date} ${time}` });
});

app.listen(PORT, () => {
  console.log(`Express сервер запущено на  http://localhost:${PORT}`);
});

app.listen;
