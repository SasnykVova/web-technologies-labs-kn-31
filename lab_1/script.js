const ctx = document.getElementById("myChart").getContext("2d");

const myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Робота", "Навчання", "Ігри", "Інше"],
    datasets: [
      {
        label: "Статистика часу за комп’ютером — В. Сасник",
        data: [40, 30, 20, 10],
        backgroundColor: [
          "rgba(46, 134, 193, 0.7)",
          "rgba(88, 214, 141, 0.7)",
          "rgba(241, 196, 15, 0.7)",
          "rgba(231, 76, 60, 0.7)",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Статистика часу за комп’ютером (В. Сасник)",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  },
});
