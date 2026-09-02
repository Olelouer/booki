export function handleCacheTTL() {
    const TTL = 8 * 60 * 60 * 1000; // 8 heures

    function createSearchKey(key: string) {
        return `search:${key.toLowerCase()}`;
    }

    function setCacheTTL<T>(key: string, value: T ) {
        const searchKey = createSearchKey(key);
        localStorage.setItem(searchKey, JSON.stringify({ value, storedAt: Date.now() }));
    }

    function getCacheTTL(key: string) {
        const searchKey = createSearchKey(key);
        const storedSearch = localStorage.getItem(searchKey);
        if(storedSearch !== null) {
            try {
                const parsedSearch = JSON.parse(storedSearch);
                if (Date.now() - parsedSearch.storedAt >= TTL) {
                    localStorage.removeItem(searchKey);
                    return null;
                }
                return parsedSearch.value;
            } catch(error) {
                console.warn("Entrée cassée dans le local storage");
                localStorage.removeItem(searchKey);
                return null;
            }
        }
        return null;
    }

    return {
        setCacheTTL,
        getCacheTTL
    };
}