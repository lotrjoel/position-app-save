<script>
    let instructions = `
        Welcome to the GNSS Timed Scavenger Hunt!

        Time is Running Out!

        A timer has been started, and is beginning to tick down!
        You have to to visit physical locations marked on the map and pick up items.
        These items will add more time to the timer

        Once you are within 10 meters of an item, you will pick it up and add to the timer.
        The more markers you reach, the higher your score!

        If the time runs out, the game is over!

        You can track your progress in the scoreboard. Use your device's GNSS chip to help you
        navigate to the markers.

        How to Play:
        1. Look at the map and identify the markers.
        2. Pick up the items by walking towards them.
        3. When you're within 10 meters of a item, it will automatically be counted.
        4. Make sure the timer doesn't run out
        5. Check your score on the scoreboard page.

        Good luck and have fun!
    `;
</script>

<!-- Gameplay Instructions -->
<div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold text-center mb-4">Gameplay Instructions</h1>

    <p class="text-lg whitespace-pre-line text-center">
        {instructions}
    </p>

    <div class="text-center mt-10">
        <a href="/scoreboard" class="btn btn-primary">
            Go to Scoreboard
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
