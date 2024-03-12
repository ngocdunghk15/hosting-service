class StorageService {
  public static set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static get<T>(key: string, defaultValue: T) {
    try {
      const item = localStorage.getItem(key) || JSON.stringify(defaultValue);
      return JSON.parse(item);
    } catch {
      return defaultValue;
    }
  }

  public static remove(key: string) {
    localStorage.removeItem(key);
  }

  public static clear() {
    localStorage.clear();
  }
}

export default StorageService;
