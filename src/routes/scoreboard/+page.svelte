<script>
    let visitedMarkers = 0; // Number of markers visited by the player
    let totalMarkers = 3; // Total number of markers in the game (this can be dynamically updated)

    // Example score calculation (you can adjust this based on your game logic)
    let score = visitedMarkers * 10; // 10 points per visited marker

    // Example markers (you could replace this with real markers from the app)
    let markers = [{
        label: "Marker 1",
        status: "Visited"
    }, {
        label: "Marker 2",
        status: "Not Visited"
    }, {
        label: "Marker 3",
        status: "Visited"
    }];

    // You can dynamically fetch real data from your backend or game logic to update the scoreboard
</script>

<!-- Scoreboard Display -->
<div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold text-center mb-6">Scoreboard</h1>

    <div class="text-xl font-semibold text-center mb-4">
        You have visited {visitedMarkers} out of {totalMarkers} markers.
    </div>

    <div class="text-xl font-semibold text-center mb-4">
        Your current score is: <span class="text-blue-500">{score} points</span>
    </div>

    <!-- Marker Status List -->
    <div class="text-lg text-center mb-4">
        <h2 class="text-2xl font-semibold mb-2">Marker Status:</h2>
        <ul class="list-disc list-inside">
            {#each markers as { label, status }}
            <li>{label}: <span class={status==='Visited' ? 'text-green-500' : 'text-red-500'}>{status}</span></li>
            {/each}
        </ul>
    </div>

    <div class="text-center mt-10">
        <a href="/" class="btn btn-primary">
            Go Back to Home
        </a>
    </div>
</div>

<style>
    .container {
        max-width: 600px;
    }
    
    .btn {
        padding: 0.75rem 1.5rem;
        background-color: #3b82f6;
        color: white;
        border-radius: 0.375rem;
        text-decoration: none;
    }
    
    .btn:hover {
        background-color: #2563eb;
    }
</style>