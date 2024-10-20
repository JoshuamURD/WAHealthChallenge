<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let clients = [];

  let chartCanvas;
  let chart;

  $: chartData = {
    labels: ["High Risk", "Medium Risk", "Low Risk"],
    datasets: [
      {
        label: "Number of Patients",
        data: [
          clients.filter((c) => c.riskCategory === "HIGH").length,
          clients.filter((c) => c.riskCategory === "MEDIUM").length,
          clients.filter((c) => c.riskCategory === "LOW").length,
        ],
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(16, 185, 129, 0.7)",
        ],
        borderColor: [
          "rgb(239, 68, 68)",
          "rgb(245, 158, 11)",
          "rgb(16, 185, 129)",
        ],
        borderWidth: 1,
      },
    ],
  };

  $: if (chart) {
    chart.data = chartData;
    chart.update();
  }

  onMount(() => {
    chart = new Chart(chartCanvas, {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Patient Risk Distribution",
            font: {
              size: 16,
              weight: "bold",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  });
</script>

<div class="w-full max-w-2xl mx-auto">
  <canvas bind:this={chartCanvas}></canvas>
</div>
