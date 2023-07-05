import { Injectable, Inject } from '@angular/core';
@Injectable()
export class LocalStorageService {
  constructor(@Inject('LOCAL_STORAGE') private storage: Storage) {}

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}
