export function search(term) {
    const normalizedTerm = encodeURIComponent(term.trim());

    return fetch(`https://nominatim.openstreetmap.org/search?q=${normalizedTerm}&format=json`)
        .then(response => response.json())
        .then(data => data.map(item => ({
            name: item.display_name,
            lat: item.lat,
            lng: item.lon,
        })));
}