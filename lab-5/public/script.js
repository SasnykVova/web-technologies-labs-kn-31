document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const response = await fetch("/settime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Помилка: ${response.status}`);
      }

      const result = await response.json();
      console.log("Відповідь сервера:", result);

      alert("Час успішно встановлено!");
    } catch (error) {
      console.error("Помилка при відправці:", error);
      alert("Сталася помилка. Спробуйте ще раз.");
    }
  });
});
