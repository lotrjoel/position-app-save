<script>
    import { onMount } from "svelte";
    import Geolocation from "svelte-geolocation";
    import { MapLibre, Marker, Popup, GeoJSON, Control, ControlGroup, ControlButton, MapEvents, FillLayer, LineLayer } from "svelte-maplibre";
    import { getDistance, getMapBounds } from '$lib';
    // Initial states
    let markers = [
        // Health markers
        {
            lngLat: { lng: 144.9638347277324, lat: -37.80967960080751 },
            label: "Health",
            name: "Gain 30 seconds",
            sprite: "assets/Artifact_Vial_of_Lifeblood.gif",
            extendsTime: true,
            action: "add"
        },
        {
            lngLat: { lng: 144.9648347277324, lat: -37.81067960080751 },
            label: "Health",
            name: "Gain 30 seconds",
            sprite: "assets/Artifact_Vial_of_Lifeblood.gif",
            extendsTime: true,
            action: "add"
        },
        // Enemy markers
        {
            lngLat: { lng: 144.9638347277324, lat: -37.81167960080751 },
            label: "Skeleton",
            name: "Fight for a chance to gain a clue",
            sprite: "assets/Skeleton_(adventure_map).gif",
            extendsTime: true,
            action: "subtract",
            level: 4
        },
        {
            lngLat: { lng: 144.9628347277324, lat: -37.81267960080751 },
            label: "Ice Elemental",
            name: "Fight for a chance to gain a clue",
            sprite: "assets/Ice_Elemental_(adventure_map).gif",
            extendsTime: true,
            action: "subtract",
            level: 8
        },
        {
            lngLat: { lng: 144.9618347277324, lat: -37.81367960080751 },
            label: "Skeleton",
            name: "Fight for a chance to gain a clue",
            sprite: "assets/Skeleton_(adventure_map).gif",
            extendsTime: true,
            action: "subtract",
            level: 4
        },
        {
            lngLat: { lng: 144.9608347277324, lat: -37.81467960080751 },
            label: "Skeleton",
            name: "Fight for a chance to gain a clue",
            sprite: "assets/Skeleton_(adventure_map).gif",
            extendsTime: true,
            action: "subtract",
            level: 4
        },
        {
            lngLat: { lng: 145.2211822, lat: -37.8852336 },
            label: "Skeleton",
            name: "Fight for a chance to gain a clue",
            sprite: "assets/Skeleton_(adventure_map).gif",
            extendsTime: true,
            action: "subtract",
            level: 4
        }
        // Additional markers...
    ];

    let bounds = getMapBounds(markers);
    let getPosition = false;
    let success = false;
    let error = '';
    let position = {};
    let coords = [];
    let accuracy = null;
    let watchPosition = false;
    let watchedPosition = {};
    let watchedMarker = {};
    let initialMarkers = [...markers]; // Keep a copy of the initial markers
    let count = 0;

    // Timer related states
    let timeLeft = 300; // Initial time in seconds
    let timerActive = false;
    let timerInterval;

    // Health bar initial state
    let health = 100;

    // Game state
    let gameOver = false;

    // Reference to MapLibre instance
    let mapInstance;

    // Variable for current enemy encounter
    let currentEnemy = null;

    //hoverstatefilter Function
    function hoverStateFilter(purple, yellow) {
        return purple || yellow;
    }

    // Function to roll a 12-sided die
    function rollDice() {
        return Math.floor(Math.random() * 12) + 1;
    }

    // Function to handle combat
    function handleCombat(enemy) {
        const rollResult = rollDice();
        if (rollResult > enemy.level) {
            // Add a "clue" marker at the enemy's location
            markers = [
                ...markers,
                {
                    lngLat: enemy.lngLat,
                    label: 'Clue',
                    name: 'Clue Found!',
                    sprite: 'path_to_clue_marker_sprite.png',
                    extendsTime: false,
                    action: ''
                }
            ];
        } else {
            // Penalize the player by reducing the timer
            timeLeft -= 45;
        }
        currentEnemy = null;  // Reset current enemy after the action
        enemy.engaged = false;  // Reset enemy engagement status
    }

    // Function to add a marker
    function addMarker(e, label, name, sprite, action) {
        markers = [
            ...markers,
            {lngLat: e.detail.lngLat, label, name, sprite, extendsTime: true, action},
        ];
    }

    const options = {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0,
    };

    // Function to start the game, combining geolocation watch and timer
    function startGame() {
        watchPosition = true;
        timerActive = true;
        gameOver = false;
        timeLeft = 300; // Reset time
        health = 100;  // Reset health
        count = 0; // Reset score
        markers = [...initialMarkers]; // Reset markers

        if (timerInterval) clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            if (timeLeft > 0 && health > 0) {
                timeLeft -= 1;
                health -= 0.5; // Decrease the health over time
            } else {
                gameOver = true;
                clearInterval(timerInterval);
                timerActive = false;
                watchPosition = false;
            }
        }, 1000);
    }

    $: if (watchedPosition.coords && !timerActive) {
        zoomToPlayer();
    }

    function zoomToPlayer() {
        if (mapInstance && watchedPosition.coords) {
            mapInstance.setCenter([watchedPosition.coords.longitude, watchedPosition.coords.latitude]);
            mapInstance.setZoom(14); // Set to desired zoom level
        }
    }

    // Show or hide GeoJSON data
    let showGeoJSON = false;
    let geojsonData;

    onMount(async () => {
        const response = await fetch('melbourne.geojson');
        geojsonData = await response.json();
    });

    $: if (watchedPosition.coords) {
        watchedMarker = { lngLat: { lng: watchedPosition.coords.longitude, lat: watchedPosition.coords.latitude } };

        markers.forEach((marker) => {
            const distance = getDistance([watchedMarker, marker]);
            const threshold = 10;

            if (distance <= threshold && marker.extendsTime && !marker.engaged) {
                if (marker.action === 'add') {
                    timeLeft += 30; // Extend time by 30 seconds
                } else if (marker.action === 'subtract') {
                    // Trigger dice roll combat for enemies
                    currentEnemy = marker;
                    marker.engaged = true;  // Mark the enemy as engaged to avoid retriggering combat
                }
                marker.extendsTime = false; // Prevent multiple actions from the same marker
                count += 1;
            }
        });
    }
</script>

<!-- UI -->
<div class="flex flex-col h-[calc(100vh-80px)] w-full">
    <div class="grid grid-cols-4">
        <div class="col-span-4 md:col-span-1 text-center">
            <h1 class="font-bold">Click button to get a one-time current position and add it to the map</h1>

            <!-- Get current geolocation -->
            <button class="btn btn-neutral" on:click={() => { getPosition = true; }}>Get geolocation</button>

            <Geolocation
                    {getPosition}
                    options={options}
                    bind:position
                    let:loading
                    bind:success
                    bind:error
                    let:notSupported
            >
                {#if notSupported}
                    Your browser does not support the Geolocation API.
                {:else}
                    {#if loading}
                        Loading...
                    {/if}
                    {#if success}
                        Success!
                    {/if}
                    {#if error}
                        An error occurred. Error code {error.code}: {error.message}.
                    {/if}
                {/if}
            </Geolocation>

            <p class="break-words text-left">Coordinates: {coords}</p>
            <p class="break-words text-left">Position: {JSON.stringify(position)}</p>
            <p class="break-words text-left">Accuracy: {accuracy ? `${accuracy} meters` : 'Not available'}</p>

            <div class="text-center font-medium text-red-500">
                Note that in some browsers, you cannot repeatedly request the current location.
                If you need to continuously update the location, use the watch option below.
            </div>
        </div>

        <div class="col-span-4 md:col-span-1 text-center">
            <h1 class="font-bold">Automatically updated position when moving</h1>

            <Geolocation
                    getPosition={watchPosition}
                    options={options}
                    watch={true}
                    on:position={(e) => { watchedPosition = e.detail; }}
            />

            <p class="break-words text-left">watchedPosition: {JSON.stringify(watchedPosition)}</p>
        </div>

        <div class="col-span-4 md:col-span-1 text-center">
            <h1 class="font-bold">Toggle Melbourne Suburbs</h1>

            <button class="btn btn-neutral" on:click={() => { showGeoJSON = !showGeoJSON; }}>Toggle</button>
        </div>

        <div class="col-span-4 md:col-span-1 text-center">
            <h1 class="font-bold">Found {count} markers</h1>
            The count will go up by one each time you are within 10 meters of a marker.
        </div>
    </div>
    <br>

    <!-- Combat section for dice roll -->
    {#if currentEnemy}
        <div class="combat-section text-center">
            <h3 class="font-bold">You have encountered an enemy! Roll the dice to determine the outcome.</h3>
            <button class="btn btn-neutral" on:click={() => handleCombat(currentEnemy)}>Roll Dice</button>
        </div>
    {/if}

    <!-- Timer and Health Bar Section -->
    <div class="timer-health-container text-center">
        <h1 class="font-bold">Time Left: {timeLeft} seconds</h1>
        {#if gameOver}
            <div class="game-over-screen">Game Over</div>
        {/if}
        <div class="health-bar">
            <div class="health-bar-inner" style="width: {Math.max((health / 100) * 100, 0)}%;"></div>
        </div>
        {#if !timerActive}
            <button class="btn btn-neutral" on:click={startGame}>{gameOver ? 'Restart Game' : 'Start Game'}</button>
        {/if}
    </div>

    <!-- Map section -->
    <MapLibre
            bind:this={mapInstance}
            center={[144.97, -37.81]}
            class="map flex-grow min-h-[500px]"
            standardControls
            style="https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            bind:bounds
            zoom={14}
    >
        <Control class="flex flex-col gap-y-2">
            <ControlGroup>
                <ControlButton on:click={() => { bounds = getMapBounds(markers); }}>
                    Fit
                </ControlButton>
            </ControlGroup>
        </Control>

        <MapEvents
                on:click={event => addMarker(event, 'New Marker', 'This is a new marker', 'path_to_new_marker_sprite.png', 'add')}/>

        {#if showGeoJSON}
            <GeoJSON id="geojsonData" data={geojsonData} promoteId="name">
                <FillLayer paint={{ 'fill-color': hoverStateFilter('purple', 'yellow'), 'fill-opacity': 0.3 }}
                           beforeLayerType="symbol" manageHoverState>
                    <Popup openOn="hover" let:data>
                        {@const props = data?.properties}
                        {#if props}
                            <div class="flex flex-col gap-2"><p>{props.name}</p></div>
                        {/if}
                    </Popup>
                </FillLayer>
                <LineLayer layout={{ 'line-cap': 'round', 'line-join': 'round' }}
                           paint={{ 'line-color': 'purple', 'line-width': 3 }} beforeLayerType="symbol"/>
            </GeoJSON>
        {/if}

        {#each markers as {lngLat, label, name, sprite, action}, i (i)}
            <Marker {lngLat} class="custom-marker-{label.toLowerCase()}">
                <img src={sprite} alt="{label}" class="{label.toLowerCase() === 'clue' ? 'custom-clue' : ''}" />
                <Popup openOn="hover" offset={[0, -10]}>
                    {#if label === 'Clue'}
                        <!-- Display clue text box on hover -->
                        <div class="clue-popup">
                            <p>Clue Found: {name}</p>
                        </div>
                    {/if}
                    <div class="text-lg font-bold">{name}</div>
                </Popup>
            </Marker>
        {/each}

        {#if watchedMarker.lngLat}
            <Marker lngLat={watchedMarker.lngLat} class="custom-player-marker">
                <img src="assets/PlayerKnight_(E).gif" alt="Player"/>
                <Popup offset={[0, -10]}>
                    <div class="text-lg font-bold">You</div>
                </Popup>
            </Marker>
        {/if}
    </MapLibre>
</div>

<!-- Styles -->
<style>
    .map {
        width: 100%;
        height: 500px;
    }

    .custom-marker img {
        width: 32px;
        height: 32px;
    }

    .custom-player-marker img {
        width: 58px;
        height: 61px;
        border: 2px solid blue;
        border-radius: 50%;
    }

    .custom-clue {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
    .custom-clue:hover .clue-popup {
        display: block;
    }
    .clue-popup {
        display: none;
        position: absolute;
        background-color: white;
        border: 1px solid black;
        padding: 10px;
        border-radius: 5px;
        width: 200px;
    }

    .btn {
        padding: 10px 20px;
        margin: 5px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    .btn-neutral {
        background-color: #f0f0f0;
        color: #333;
    }

    .font-bold {
        font-weight: bold;
    }

    .text-center {
        text-align: center;
    }

    .game-over-screen {
        color: red;
        font-size: 24px;
        font-weight: bold;
    }

    .timer-health-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }

    .health-bar {
        width: 80%;
        height: 50px;
        background-color: #e0e0e0;
        border-radius: 25px;
        margin: 20px auto;
        overflow: hidden;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        position: relative;
    }

    .health-bar-inner {
        height: 100%;
        background-color: #6c0505;
        transition: width 1s linear;
    }
</style>