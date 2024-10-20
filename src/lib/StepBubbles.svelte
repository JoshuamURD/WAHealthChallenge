<script>
    export let currentStep;
    export let totalSteps;
</script>

<div class="flex justify-center items-center">
  {#each Array(totalSteps) as _, index}
    <div class="flex items-center">
      <div 
        class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 shadow-sm"
        class:bg-blue-500={currentStep === index + 1}
        class:text-white={currentStep === index + 1}
        class:bg-gray-100={currentStep !== index + 1}
        class:text-gray-600={currentStep !== index + 1}
      >
        {index + 1}
      </div>
      {#if index < totalSteps - 1}
        <div class="w-8 h-0.5 bg-gray-200 mx-2"></div>
      {/if}
    </div>
  {/each}
</div>
