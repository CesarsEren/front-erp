import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Crear o actualizar un item en el localStorage
  setItem(key: string, value: any): void {
    const stringValue = JSON.stringify(value); // Convertimos el valor a un string JSON
    localStorage.setItem(key, stringValue);
  }

  // Leer un item del localStorage
  getItem<T>(key: string): T | null {
    const stringValue = localStorage.getItem(key);
    if (stringValue) {
      return JSON.parse(stringValue) as T; // Convertimos el string JSON de vuelta a un objeto
    }
    return null;
  }

  // Actualizar un item en el localStorage (es lo mismo que setItem en este caso)
  updateItem(key: string, value: any): void {
    this.setItem(key, value); // Sobrescribe el valor anterior
  }

  // Eliminar un item del localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo el localStorage
  clear(): void {
    localStorage.clear();
  }

  // Verificar si un item existe en el localStorage
  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
