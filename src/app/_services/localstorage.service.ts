import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';   

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    currentUserLocalStorageData = new BehaviorSubject(this.currentUserLocalStorage);
    
    set currentUserLocalStorage(value) {
        this.currentUserLocalStorageData.next(value);
        localStorage.setItem('currentUserLocalStorage', value);
    }
    
    get currentUserLocalStorage() {
        return localStorage.getItem('currentUserLocalStorage');
    }
}