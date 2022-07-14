import { Injectable }   from '@angular/core';
import { Subject ,  Observable }      from 'rxjs';
import { filter, map } from 'rxjs/operators';


interface BroadcastEvent {
  key: any;
  data?: any;
}

export class BroadcastServiceModule
{
    private _eventBus: Subject<BroadcastEvent>;

    constructor() {
        this._eventBus = new Subject<BroadcastEvent>();
    }

    emit(key: any, data?: any) {
        this._eventBus.next({key, data});
    }

    on<T>(key: any): Observable<T> {
        return this._eventBus.asObservable()
          .pipe(filter(event => event.key === key))
          .pipe(map(event => <T>event.data))
    }
}

export let BroadcastService = new BroadcastServiceModule();
