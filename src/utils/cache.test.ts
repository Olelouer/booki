import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest';
import { TTL, getCacheTTL, setCacheTTL } from './cache'; 
import { type BookGoogle } from '../types/book.schema';

const key = "harry";
const zolaKey = "zola";

const data: BookGoogle[] = [
    {"id":"fD1VEAAAQBAJ","volumeInfo":{"title":"Harry Potter et l'Histoire","publishedDate":"2025-03-27","language":"fr","pageCount":125}},
    {"id":"YjxVEAAAQBAJ","volumeInfo":{"title":"Agir et penser comme Harry Potter","publishedDate":"2021-10-14","language":"fr","pageCount":145}},
    {"id":"jLm9EQAAQBAJ","volumeInfo":{"title":"Harry Potter. À l'école des sciences morales et politiques","publishedDate":"2014-05-22","language":"fr","pageCount":81}},
];

const zolaData: BookGoogle[] = [
    {"id":"sLkeCwAAQBAJ","volumeInfo":{"title":"Emile Zola - Les oeuvres complètes (édition augmentée)","publishedDate":"2014-01-05","language":"fr","pageCount":10964}},
    {"id":"LHlAEAAAQBAJ","volumeInfo":{"title":"Coffret Émile Zola","publishedDate":"2021-09-01","language":"fr","pageCount":1782}},
    {"id":"d-q7ywEACAAJ","volumeInfo":{"title":"La Terre","publishedDate":"2019-01-30","language":"fr","pageCount":366}}
];

describe('gère la mise en cache TTL des données', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test('aucune recherche précédente sur la requête', () => {
        const searchStorage = getCacheTTL(key);
        expect(searchStorage).toBeNull();
    });

    test('récupère les données mises en cache relatives à la requête', () => {
        setCacheTTL(key, data);
        const searchStorage = getCacheTTL(key);
        expect(searchStorage).toEqual(data);
    });
    
    test('une donnée trop ancienne ne doit pas être retournée', () => {
        setCacheTTL(key, data);
        vi.advanceTimersByTime(TTL + 1);
        const searchStorage = getCacheTTL(key);
        expect(searchStorage).toBe(null);
    });

    test('une donnée à la limite doit être retournée', () => {
        setCacheTTL(key, data);
        vi.advanceTimersByTime(TTL - 1);
        const searchStorage = getCacheTTL(key);
        expect(searchStorage).toEqual(data);
    });

    test('des données corrompues ne doivent pas être retournées', () => {
        localStorage.setItem('search:harry', 'Pas je json');
        const search = getCacheTTL(key);
        expect(search).toBeNull();
    });

    test('des clés différentes doivent retourner des données différentes', () => {
        setCacheTTL(key, data);
        setCacheTTL(zolaKey, zolaData);
        const searchHarry = getCacheTTL(key);
        const searchZola = getCacheTTL(zolaKey);
        expect(searchZola).toEqual(zolaData);
        expect(searchHarry).toEqual(data);
    });
});