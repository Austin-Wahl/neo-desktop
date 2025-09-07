import { nativeTheme } from 'electron'
import Store from 'electron-store'

interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
}

// Default theme settings
const defaultPreferences: UserPreferences = {
  theme: 'system'
}

const store = new Store<UserPreferences>({
  name: 'app-config',
  defaults: defaultPreferences
})

console.log(store)

// Function to get a preference
function getPreference<K extends keyof UserPreferences>(key: K): UserPreferences[K] {
  return store.get(key) as UserPreferences[K]
}

function setPreference<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]): void {
  store.set(key, value)
}

function getSystemTheme(): 'light' | 'dark' {
  return nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
}

export { getPreference, setPreference, getSystemTheme }
export type { UserPreferences }
