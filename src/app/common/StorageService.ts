import {Injectable} from 'react.di';

@Injectable
export class StorageService {

  get<T>(key: string): T | undefined {
    const unparsedValue = localStorage.getItem(key);
    if (unparsedValue) {
      return JSON.parse(unparsedValue);
    }
  }

  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  has(key: string): boolean {
    return !!localStorage.getItem(key);
  }
}
