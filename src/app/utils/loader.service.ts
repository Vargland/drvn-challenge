import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export default class LoaderService {
    private isLoadingSubject = new BehaviorSubject<boolean>(false);

    public isLoading$ = this.isLoadingSubject.asObservable();

    public show(): void {
        this.isLoadingSubject.next(true);
    }

    public hide(): void {
        this.isLoadingSubject.next(false);
    }
}
