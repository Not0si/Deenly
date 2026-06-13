import Storage from 'expo-sqlite/kv-store';

import { LocationObject } from 'expo-location';

export const getCachedLocation = async () => {
    const value = await Storage.getItem('user_ocation');

    if (!value) return null;

    const entity = JSON.parse(value) as LocationObject;

    return entity
}

export const setCachedLocation = async (location: LocationObject) => {
    await Storage.setItem('user_ocation', JSON.stringify(location));
} 