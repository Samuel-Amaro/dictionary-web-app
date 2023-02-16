import { useEffect, useState } from "react";

export default function useFetch<Type>(url: string) {
    const [data, setData] = useState<Type | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(url);
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                setData((await response.json()) as Type);
                setError(false);
            } catch (error) {
                setData(null);
                setError(true);
            }
        })();
    }, []);

    return {data, error};
}