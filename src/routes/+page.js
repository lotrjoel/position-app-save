// This script is used to preload and fetch data before rendering the page.
// It's useful for loading large datasets or preparing the page for rendering.

export const load = async({ fetch }) => {
    // Example: Fetching a GeoJSON file
    const response = await fetch('/melbourne.geojson');
    const geojsonData = await response.json();

    // You can also fetch other game-related data, such as markers, user progress, etc.
    // For now, we're returning the GeoJSON data for use in the page.
    return {
        geojsonData
    };
};