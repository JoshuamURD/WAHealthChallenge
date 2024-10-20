<script>
  import { fade, scale } from "svelte/transition";

  let show = false;
<script>
  let show = false;

  function toggle() {
    show = !show;
  }
</script>

{#if show}
  <div
    class="bg-slate-300/40 rounded-xl shadow-lg max-w-3xl mx-auto p-8 fixed z-10 w-full h-full flex justify-center items-center"
  >
    <div class="bg-white rounded-xl shadow-lg max-w-3xl mx-auto p-8">
      <h1>Alert</h1>
      <button on:click={toggle}>Close</button>
    </div>
  </div>
{/if}
<div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
  <div class="bg-white rounded-xl shadow-lg max-w-3xl mx-auto p-8">
    <h1 class="text-4xl text-center font-bold">
      Did you want to alert your health professional?
    </h1>
    <button
      class="block mx-auto my-10 h-14 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      on:click={toggle}>I'm in need of an immediate booking</button
    >
  </div>
</div>

  function toggle() {
    show = !show;
  }

  function handleConfirm() {
    // Add your confirmation logic here
    console.log("Confirmed");
    toggle();
  }
</script>

{#if show}
  <div
    class="fixed inset-0 bg-slate-800/75 backdrop-blur-sm z-50 flex justify-center items-center"
    transition:fade={{ duration: 200 }}
  >
    <div
      class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4"
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      <div class="p-6">
        <h2 class="text-2xl font-bold text-slate-800 mb-4">Confirmation</h2>
        <p class="text-slate-600 mb-6">
          Are you sure you want to alert your health professional for an
          immediate booking?
        </p>
        <div class="flex justify-end space-x-4">
          <button
            on:click={toggle}
            class="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
          >
            Close
          </button>
          <button
            on:click={handleConfirm}
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          >
            I'm Sure
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
  <div class="bg-white rounded-xl shadow-lg max-w-3xl mx-auto p-8">
    <h1 class="text-4xl text-center font-bold text-slate-800 mb-8">
      Did you want to alert your health professional?
    </h1>
    <button
      class="block mx-auto h-14 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
      on:click={toggle}
    >
      I'm in need of an immediate booking
    </button>
  </div>
</div>
