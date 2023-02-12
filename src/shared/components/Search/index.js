import { useState, useEffect } from "@wordpress/element";
import { search } from "./service";
import Autocomplete from "../Autocomplete";
import { __ } from "@wordpress/i18n";

const useDebounceValue = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}

export default function Search({ onSearch }) {
    const [term, setTerm] = useState("");
    const [results, setResults] = useState([]);
    const debouncedTerm = useDebounceValue(term, 500);
    const [loading, setLoading] = useState(false);

    const handleChange = newValue => {
        if (newValue) {
            setLoading(true);
            setTerm(newValue);
        } else {
            setTerm("");
            setLoading(false);
        };
    };

    const handleSelect = newValue => {
        if (newValue) {
            const { lat, lng, name } = newValue;
            onSearch({ lng: Number(lng), lat: Number(lat) });
            setTerm(name);
        } else {
            setTerm("");
        }
    }

    useEffect(() => {
        if (debouncedTerm) {
            search(debouncedTerm)
                .then((res) => setResults(res))
                .finally(() => setLoading(false));
        } else {
            setResults([]);
        }
    }, [debouncedTerm]);

    return (
        <div>
            <Autocomplete
                placeholder={__("Search for a location", "map-block-leaflet") + "..."}
                onChange={handleChange}
                loading={loading}
                defaultValue={term}
                onSelect={handleSelect}
                options={results}
                notMatchText={__("No matches found", "map-block-leaflet")}
                renderOption={option => option.name}
            />
        </div>
    );
}