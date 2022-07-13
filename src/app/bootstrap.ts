import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SettingsService } from './service';

/**
 * @return Promise
 */
export function bootstrap(http: HttpClient, settings: SettingsService)
{
    let promises: Array<Promise<any>> = [];
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    if (true === settings.areSet()) {

        promises[0] = Promise.resolve()

    } else {

        promises[0] =  new Promise((resolve, reject) => {
            http.get('assets/neo4j.settings.json', { headers: headers })
                .toPromise()
                .then(data => {
                    settings.set(data)
                    resolve(data)
                }).catch(err => {
                    throw new Error(err)
                })
        })

    }

    return () => { return Promise.all(promises) };
};
