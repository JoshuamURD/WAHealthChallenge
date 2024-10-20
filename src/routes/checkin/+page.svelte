<script>
  import { Breadcrumb, BreadcrumbItem, Button, Range, Heading, P } from 'flowbite-svelte';
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import StepBubbles from './StepBubbles.svelte'; // Adjust the import path as needed

  // State management
  let currentStep = 1;
  let responses = {
    nervous: 0, hopeless: 0, restless: 0,
    depressed: 0, effort: 0, worthless: 1
  };

  // Color state for each step
  let colorState = { 1: {}, 2: {} };

  // Constants
  const TOTAL_STEPS = 2;
  const QUESTIONS_PER_STEP = 3;

  const questions = [
    { key: 'nervous', text: '...nervous?' },
    { key: 'hopeless', text: '...hopeless?' },
    { key: 'restless', text: '...restless or fidgety?' },
    { key: 'depressed', text: '...so depressed that nothing could cheer you up?' },
    { key: 'effort', text: '...that everything was an effort?' },
    { key: 'worthless', text: '...worthless?' },
  ];

  const options = [
    { value: 0, label: 'None of the time', emoji: '🗿' },
    { value: 1, label: 'A little of the time', emoji: '👀' },
    { value: 2, label: 'Some of the time', emoji: '😐' },
    { value: 3, label: 'Most of the time', emoji: '😅' },
    { value: 4, label: 'All of the time', emoji: '💯' },
  ];

  $: currentQuestions = questions.slice(
    (currentStep - 1) * QUESTIONS_PER_STEP, 
    currentStep * QUESTIONS_PER_STEP
  );

  // Functions
  function updateSliderColor(question, value) {
    if (!browser) return;

    value = parseFloat(value);
    const percentage = (value / 4) * 100;
    const hue = ((1 - value / 4) * 120).toFixed(0); // 120 is green, 0 is red
    colorState[currentStep][question] = { hue, percentage };
    colorState = { ...colorState }; // Trigger reactivity
  }

  function handleInput(question, value) {
    if (browser) updateSliderColor(question, value);
  }

  function handleChange(question, value) {
    const roundedValue = Math.floor(parseFloat(value) + 0.5);
    responses[question] = roundedValue;
    responses = { ...responses }; // Trigger reactivity
    
    if (browser) updateSliderColor(question, roundedValue);
  }

  function navigateStep(step) {
    currentStep = step;
  }

  function calculateScore() {
    return Object.values(responses).reduce((sum, value) => sum + value, 0);
  }

  function isStepComplete(step) {
    const startIndex = (step - 1) * QUESTIONS_PER_STEP;
    const endIndex = step * QUESTIONS_PER_STEP;
    return questions.slice(startIndex, endIndex)
      .every(q => responses[q.key] !== null);
  }

  function submitForm() {
    alert(`Your K6 score is: ${calculateScore()}`);
    // Here you would typically send the data to a server
  }


  // Lifecycle
  onMount(() => {
    if (browser) {
      currentQuestions.forEach(question => 
        updateSliderColor(question.key, responses[question.key])
      );
    }
  });

  $: if (currentStep && browser) {
    currentQuestions.forEach(question => 
      updateSliderColor(question.key, responses[question.key])
    );
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
  <div class="bg-white rounded-xl shadow-lg max-w-6xl mx-auto p-8">
    <header class="mb-12 text-center">
      <Heading tag="h2" class="text-4xl font-bold text-slate-800 mb-2">
        Kessler Psychological Distress Scale (K6)
      </Heading>
      <P class="text-lg text-slate-600 max-w-2xl mx-auto">
        The following questions ask about how you have been feeling during the 
        <strong class="font-medium">past two weeks</strong>. 
        For each question, please move the slider to the option that best describes 
        how often you had this feeling.
      </P>
    </header>

    <nav class="mb-8">
      <Breadcrumb>
        {#each Array(TOTAL_STEPS) as _, index}
          <BreadcrumbItem 
            href="/" 
            active={currentStep === index + 1}
          >
            <button 
              on:click|preventDefault={() => navigateStep(index + 1)}
              class="text-lg font-semibold cursor-pointer bg-transparent border-none p-0"
            >
              Step {index + 1}
            </button>
          </BreadcrumbItem>
        {/each}
      </Breadcrumb>
    </nav>

    <div class="space-y-6">
      {#each currentQuestions as question}
        <div class="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
          <div class="px-6 py-4">
            <Heading class="text-center font-semibold text-xl text-slate-800 mb-4">
              {question.text}
            </Heading>
            <div class="mb-4">
              <Range 
                id={question.key} 
                min={0} 
                max={4} 
                step={0.01} 
                bind:value={responses[question.key]}
                on:input={(e) => handleInput(question.key, e.target.value)}
                on:change={(e) => handleChange(question.key, e.target.value)}
                class="custom-range"
                style="--slider-hue: {colorState[currentStep][question.key]?.hue || 120}; 
                       --slider-percentage: {colorState[currentStep][question.key]?.percentage || 0}%;"
              />
            </div>
            <div class="flex justify-between text-sm">
              {#each options as option}
                <div class="text-center w-1/5">
                  <div class="text-2xl">{option.emoji}</div>
                  <div class="text-xs mt-2 break-words text-slate-600">{option.label}</div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="flex justify-between mt-12">
      {#if currentStep > 1}
        <Button on:click={() => navigateStep(currentStep - 1)} color="light" class="bg-slate-100 text-slate-700 hover:bg-slate-200">Previous</Button>
      {:else}
        <div></div>
      {/if}
      {#if currentStep < TOTAL_STEPS}
        <Button on:click={() => navigateStep(currentStep + 1)} disabled={!isStepComplete(currentStep)} class="bg-blue-600 text-white hover:bg-blue-700">Next</Button>
      {:else}
        <Button on:click={submitForm} disabled={!isStepComplete(currentStep)} class="bg-green-600 text-white hover:bg-green-700">Submit</Button>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Custom styles for the slider */
  :global(.custom-range) {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    outline: none;
    opacity: 0.7;
    transition: opacity .2s, background .2s;
    background: linear-gradient(to right, 
      hsl(var(--slider-hue, 120), 100%, 40%) 0%, 
      hsl(var(--slider-hue, 120), 100%, 40%) var(--slider-percentage, 0%), 
      #e2e8f0 var(--slider-percentage, 0%), 
      #e2e8f0 100%);
  }

  :global(.custom-range:hover) {
    opacity: 1;
  }

  :global(.custom-range::-webkit-slider-thumb) {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    border: 2px solid hsl(var(--slider-hue, 120), 100%, 40%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
  }

  :global(.custom-range::-moz-range-thumb) {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
    border: 2px solid hsl(var(--slider-hue, 120), 100%, 40%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
  }

  :global(.custom-range::-webkit-slider-thumb:hover),
  :global(.custom-range::-moz-range-thumb:hover) {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* Ensure proper wrapping of labels */
  :global(.text-xs) {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }
</style>
