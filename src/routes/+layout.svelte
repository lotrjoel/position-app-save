<script>
    // Importing the base path and CSS for the application
    import '../app.css'; // DoNotChange
    import { base } from '$app/paths'; // DoNotChange
</script>

<!-- Website title -->
<svelte:head>
    <title>Position App</title>
</svelte:head>

<!-- Header Navigation -->
<div class="navbar bg-base-300 px-4">
    <a class="btn btn-ghost normal-case text-xl" href="/">
        Home
    </a>
    <a class="btn btn-ghost normal-case text-xl" href="/about">
        About
    </a>
    <a class="btn btn-ghost normal-case text-xl" href="/gameplay">Gameplay</a>
    <a class="btn btn-ghost normal-case text-xl" href="/scoreboard">Scoreboard</a>

</div>

<!-- Main content area -->
<main class="container mx-auto pt-4">
    <slot />
</main>

<!-- Footer -->
<footer class="bg-base-200 text-center py-4 mt-auto">
    <p class="text-sm">
        © 2024 Position App. All rights reserved.
    </p>
</footer>

<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    a:hover {
        color: #1f2937;
    }

    footer {
        background-color: #f4f4f9;
        border-top: 1px solid #eaeaea;
        padding: 1rem;
        text-align: center;
        margin-top: 2rem;
    }

    main {
        padding-bottom: 2rem;
        min-height: calc(100vh - 120px); /* Adjusts for header and footer */
    }

    /* Responsive tweaks */
    @media (max-width: 768px) {
        .navbar {
            flex-direction: column;
        }

        .navbar a {
            padding: 0.5rem 1rem;
        }
    }
</style>
