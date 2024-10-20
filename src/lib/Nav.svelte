<script>
  import { page } from "$app/stores";
  import { slide } from "svelte/transition";

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  $: currentPath = $page.url.pathname;

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Patient Feedback", path: "/check-in" },
    { name: "Patients", path: "/patients" },
  ];
</script>

<nav class="bg-slate-800 shadow-lg">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <span class="text-white text-xl font-bold">HealthPriority</span>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            {#each navItems as item}
              <a
                href={item.path}
                class="{currentPath === item.path
                  ? 'bg-slate-900 text-white'
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </a>
            {/each}
          </div>
        </div>
      </div>
      <div class="-mr-2 flex md:hidden">
        <button
          on:click={toggleMenu}
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="{isOpen ? 'hidden' : 'block'} h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            class="{isOpen ? 'block' : 'hidden'} h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  {#if isOpen}
    <div
      transition:slide={{ duration: 300 }}
      class="md:hidden"
      id="mobile-menu"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {#each navItems as item}
          <a
            href={item.path}
            class="{currentPath === item.path
              ? 'bg-slate-900 text-white'
              : 'text-gray-300 hover:bg-slate-700 hover:text-white'} block px-3 py-2 rounded-md text-base font-medium"
          >
            {item.name}
          </a>
        {/each}
      </div>
    </div>
  {/if}
</nav>
