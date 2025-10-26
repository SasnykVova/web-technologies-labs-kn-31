const fs = require("fs");

fs.readFile("notes.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Помилка при зчитуванні файлу:", err);
    return;
  }

  const header = "Парний варіант — виконано студентом Сасником В.Д.\n\n";
  const result = header + data;

  console.log(result);

  fs.writeFile("output_notes.txt", result, "utf8", (err) => {
    if (err) {
      console.error("Помилка при записі файлу:", err);
      return;
    }
    console.log("Файл успішно створено: output_notes.txt");
  });
});
