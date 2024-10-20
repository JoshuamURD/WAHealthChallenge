<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import PocketBase from "pocketbase";
  import Chart from "chart.js/auto";

  // Initialize PocketBase
  const pb = new PocketBase("http://127.0.0.1:8090");

  let patient = null;
  let wellbeingScores = [];
  let hospitalVisits = [];
  let chartCanvas;
  let chart;

  $: patientId = $page.params.id;

  async function fetchPatientData() {
    try {
      patient = await pb.collection("clients").getOne(patientId, {
        expand: "client_feedback(client)",
      });

      wellbeingScores = patient.expand["client_feedback(client)"]
        .sort((a, b) => new Date(a.created) - new Date(b.created))
        .map((feedback) => ({
          date: new Date(feedback.created).toLocaleDateString(),
          score: feedback.wellbeing_score,
        }));

      hospitalVisits = JSON.parse(patient.hospital_visits || "[]");
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  }

  $: if (chartCanvas && wellbeingScores.length > 0) {
    createChart();
  }

  function createChart() {
    if (chart) {
      chart.destroy();
    }

    const ctx = chartCanvas.getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: wellbeingScores.map((score) => score.date),
        datasets: [
          {
            label: "Wellbeing Score",
            data: wellbeingScores.map((score) => score.score),
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Wellbeing Score Over Time",
            font: {
              size: 16,
              weight: "bold",
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "Wellbeing Score",
            },
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    });
  }

  onMount(() => {
    fetchPatientData();
  });

  const diagnosisColors = {
    depression: "bg-blue-100 text-blue-800",
    anxiety: "bg-green-100 text-green-800",
    schizophrenia: "bg-purple-100 text-purple-800",
    bipolar: "bg-yellow-100 text-yellow-800",
    adhd: "bg-pink-100 text-pink-800",
    ocd: "bg-indigo-100 text-indigo-800",
  };
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
  <div class="bg-white rounded-xl shadow-lg max-w-6xl mx-auto p-8">
    {#if patient}
      <h1 class="text-4xl font-bold text-center text-slate-800 mb-6">
        {patient.first_name}
        {patient.last_name}
      </h1>

      <div class="flex items-center justify-center mb-8">
        <img
          src={patient.Avatar
            ? pb.getFileUrl(patient, patient.Avatar)
            : "/placeholder-avatar.png"}
          alt="{patient.first_name} {patient.last_name}"
          class="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
        />
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-slate-700 mb-4">Diagnosis</h2>
        <div class="flex flex-wrap gap-2">
          {#each patient.diagnosis as diagnosis}
            <span
              class={`px-3 py-1 rounded-full text-sm font-medium ${diagnosisColors[diagnosis]}`}
            >
              {diagnosis}
            </span>
          {/each}
        </div>
      </div>

      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-slate-700 mb-4">
          Wellbeing Score Trend
        </h2>
        <div class="w-full h-64">
          <canvas bind:this={chartCanvas}></canvas>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-semibold text-slate-700 mb-4">
          Hospital Visits
        </h2>
        {#if hospitalVisits.length > 0}
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
              {#each hospitalVisits as visit}
                <li class="px-6 py-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-slate-900">
                        {new Date(visit.date).toLocaleDateString()}
                      </p>
                      <p class="text-sm text-slate-500">{visit.reason}</p>
                    </div>
                    <p class="text-sm text-slate-500">{visit.duration} days</p>
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        {:else}
          <p class="text-slate-500">No hospital visits recorded.</p>
        {/if}
      </div>
    {:else}
      <p class="text-center text-slate-600">Loading patient data...</p>
    {/if}
  </div>
</div>
