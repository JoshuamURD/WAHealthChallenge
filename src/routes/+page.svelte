<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import PocketBase from "pocketbase";
  import RiskDistributionChart from "$lib/RiskDistributionChart.svelte";

  // Initialize PocketBase
  const pb = new PocketBase("http://127.0.0.1:8090");

  let clients = [];
  let expandedCategory = null;

  const riskCategories = {
    HIGH: {
      name: "High Risk",
      threshold: 7,
      color: "text-red-700",
      bg: "bg-red-50",
    },
    MEDIUM: {
      name: "Medium Risk",
      threshold: 4,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    LOW: {
      name: "Low Risk",
      threshold: 0,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
    },
  };

  function getRiskCategory(wellbeingScore) {
    if (wellbeingScore <= 40) return "HIGH";
    if (wellbeingScore <= 60) return "MEDIUM";
    return "LOW";
  }

  async function fetchClients() {
    try {
      const records = await pb.collection("clients").getFullList({
        sort: "-created",
        expand: "client_feedback(client)",
      });

      clients = records.map((record) => {
        const latestFeedback = record.expand?.["client_feedback(client)"]?.sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        )[0];

        return {
          id: record.id,
          name: `${record.first_name} ${record.last_name}`,
          avatar: record.Avatar ? pb.getFileUrl(record, record.Avatar) : null,
          diagnosis: record.diagnosis || [],
          wellbeingScore: latestFeedback?.wellbeing_score || 5,
          riskCategory: getRiskCategory(latestFeedback?.wellbeing_score || 5),
        };
      });
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  function toggleCategory(category) {
    expandedCategory = expandedCategory === category ? null : category;
  }

  function getSortedClientsForCategory(category) {
    return clients
      .filter((c) => c.riskCategory === category)
      .sort((a, b) => a.wellbeingScore - b.wellbeingScore);
  }

  onMount(() => {
    fetchClients();
    // Set up real-time updates
    pb.collection("clients").subscribe("*", fetchClients);
    pb.collection("client_feedback").subscribe("*", fetchClients);
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
    <h1 class="text-4xl font-bold text-center text-slate-800 mb-2">
      Risk Identification Dashboard
    </h1>
    <p class="text-lg text-center text-slate-600 mb-12">
      Comprehensive Risk Assessment for Personalized Care
    </p>

    <div class="mb-12">
      <RiskDistributionChart {clients} />
    </div>

    <div class="space-y-6">
      {#each Object.entries(riskCategories) as [category, { name, threshold, color, bg }]}
        <div
          class="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200"
        >
          <button
            class="w-full px-6 py-4 text-left font-semibold text-lg flex justify-between items-center transition-colors duration-200 hover:bg-slate-50"
            on:click={() => toggleCategory(category)}
          >
            <span class={`${color} font-medium`}>{name}</span>
            <span class="text-sm text-slate-500"
              >Clients: {clients.filter((c) => c.riskCategory === category)
                .length}</span
            >
          </button>
          {#if expandedCategory === category}
            <div transition:slide={{ duration: 300 }} class={`p-6 ${bg}`}>
              <table class="w-full bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr class="bg-slate-100">
                    <th class="text-left px-4 py-3 text-slate-700">Client</th>
                    <th class="text-left px-4 py-3 text-slate-700">Diagnosis</th
                    >
                    <th class="text-left px-4 py-3 text-slate-700"
                      >Wellbeing Score</th
                    >
                  </tr>
                </thead>
                <tbody>
                  {#each getSortedClientsForCategory(category) as client}
                    <tr
                      class="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150"
                    >
                      <td class="px-4 py-3 text-slate-800">
                        <a
                          href="/{client.id}"
                          class="flex items-center hover:underline"
                        >
                          <img
                            src={client.avatar || "/placeholder-avatar.png"}
                            alt={client.name}
                            class="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                          {client.name}
                        </a>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex flex-wrap gap-1">
                          {#each client.diagnosis as diagnosis}
                            <span
                              class={`px-2 py-1 rounded-full text-xs font-medium ${diagnosisColors[diagnosis]}`}
                            >
                              {diagnosis}
                            </span>
                          {/each}
                        </div>
                      </td>
                      <td class="px-4 py-3 font-medium {color}"
                        >{client.wellbeingScore}</td
                      >
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
