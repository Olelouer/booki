import { describe, test, expect } from 'vitest';
import { handleCacheTTL } from './cache'; 

const key = "harry";

const { getCacheTTL } = handleCacheTTL();

describe('gère la mise en cache TTL des données', () => {
    test('Aucune recherche passée sur la requête', () => {
        const test = getCacheTTL(key);
        expect(test).toBe(null);
    });
});