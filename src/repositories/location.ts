import Storage from "expo-sqlite/kv-store"

import { LocationObject } from "expo-location"

export const locationRepository = {
  get: async () => {
    const value = await Storage.getItem("user_ocation")

    if (!value) return null

    const entity = JSON.parse(value) as LocationObject

    return entity
  },

  set: async (location: LocationObject) => {
    await Storage.setItem("user_ocation", JSON.stringify(location))
  },

  remove: async () => {
    await Storage.removeItem("user_ocation")
  },
}
