/**
 * Compute map centre based on a list of markers
 * @param markers Map markers to compute the centre of
 * @returns Map centre (longitude and latitude)
 */
export function getMapCentre(markers) {
    const lats = markers.map(marker => marker.lngLat.lat)
    const lngs = markers.map(marker => marker.lngLat.lng)
    const latMin = Math.min(...lats)
    const latMax = Math.max(...lats)
    const lngMin = Math.min(...lngs)
    const lngMax = Math.max(...lngs)
    return { lng: (lngMin + lngMax) / 2, lat: (latMin + latMax) / 2 }
}

/**
 * Compute map bounds based on a list of markers
 * @param markers Map markers to compute the bounds of
 * @returns Map bounds [minLng, minLat, maxLng, maxLat]
 */
export function getMapBounds(markers) {
    const lats = markers.map(marker => marker.lngLat.lat)
    const lngs = markers.map(marker => marker.lngLat.lng)
    const latMin = Math.min(...lats)
    const latMax = Math.max(...lats)
    const lngMin = Math.min(...lngs)
    const lngMax = Math.max(...lngs)
    return [lngMin, latMin, lngMax, latMax]
}

/**
 * Compute the distance between two markers using the Haversine formula
 * @param markers Array containing exactly two markers to compute the distance between
 * @returns Distance between the two markers in meters
 */
export function getDistance(markers) {
    if (markers.length !== 2) {
        throw new Error('This function requires exactly two markers')
    }

    const R = 6371e3 // Earth's radius in meters
    const phi1 = markers[0].lngLat.lat * Math.PI / 180 // Convert latitude to radians
    const phi2 = markers[1].lngLat.lat * Math.PI / 180
    const dPhi = (markers[1].lngLat.lat - markers[0].lngLat.lat) * Math.PI / 180
    const dLambda = (markers[1].lngLat.lng - markers[0].lngLat.lng) * Math.PI / 180

    const a = Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(dLambda / 2) * Math.sin(dLambda / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distance = R * c // in meters

    return distance
}

/**
 * Check if a marker is within a certain distance of the user's location
 * @param userLocation User's current location as {lng, lat}
 * @param marker Marker to check against the user's location
 * @param threshold Distance threshold in meters
 * @returns True if marker is within the distance threshold, else false
 */
export function isWithinDistance(userLocation, marker, threshold) {
    const distance = getDistance([{ lngLat: userLocation }, marker])
    return distance <= threshold
}

/**
 * Calculate the area of a polygon (GeoJSON feature) using the Shoelace formula
 * @param geojsonFeature GeoJSON feature representing a polygon
 * @returns Area of the polygon in square meters
 */
export function getPolygonArea(geojsonFeature) {
    if (geojsonFeature.geometry.type !== 'Polygon') {
        throw new Error('The provided GeoJSON feature must be a Polygon')
    }

    const coordinates = geojsonFeature.geometry.coordinates[0] // Get the outer ring
    const R = 6371000 // Earth's radius in meters

    let area = 0
    for (let i = 0; i < coordinates.length - 1; i++) {
        const [lon1, lat1] = coordinates[i]
        const [lon2, lat2] = coordinates[i + 1]

        // Convert latitude and longitude to radians
        const phi1 = lat1 * Math.PI / 180
        const phi2 = lat2 * Math.PI / 180
        const deltaLambda = (lon2 - lon1) * Math.PI / 180

        // Calculate the area using the spherical excess formula
        area += deltaLambda * (2 + Math.sin(phi1) + Math.sin(phi2))
    }

    area = Math.abs(area * R * R / 2) // Final area in square meters

    return area
}