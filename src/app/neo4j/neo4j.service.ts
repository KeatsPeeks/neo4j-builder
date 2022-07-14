import { Injectable }               from '@angular/core';
import { HttpResponse }                 from '@angular/common/http';
import { HttpHeaders, HttpClient }            from '@angular/common/http';
import { Debug, SettingsService }   from '../service';
import { PropertyAccess }           from '../core';
import { ResultSet, Transaction }   from './orm';
import { filter, map } from 'rxjs/operators';


@Injectable()
export class Neo4jService
{
    private url: string;
    private headers: HttpHeaders;

    static DEBUG = true
    static NO_DEBUG = false

    constructor(private http: HttpClient, private settings: SettingsService)
    {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': this.settings.get('client.authBasic')
        })

        const endpoint = this.settings.get('client.apiEndpoint');
        this.url = `${endpoint}/transaction/commit`;

        const debugEnabled = this.settings.get('debug');
        Debug.debug(debugEnabled)
    }

    commit(trans: Transaction, rawRes: boolean = false): Promise<any>
    {
        Debug.group('neo4j.service.commit').log(trans.getStatements(), 'Statements info', 'info')

        return new Promise((resolve, reject) => {
            this.http.post(this.url, { statements: trans.getStatements() }, { headers: this.headers })
              .pipe(map(res => {
                if (res) {
                  return res
                } else {
                  reject(res)
                }
              }))
                .toPromise()
                .then((response: any) => {

                    if (rawRes === true) {
                        resolve(response.results)
                        return;
                    }

                    const result = this.handleResults(response)

                    if (response.errors.length > 0) {
                        Debug.log(response.errors, 'Transaction error', 'critical')
                        reject(response.errors)
                    } else {
                        Debug.log(result, 'Transaction success', 'info')
                        resolve(result)
                    }

                }).catch(err => {
                    Debug.log(err, 'Caught error', 'critical')
                    reject(err)
                })
        })

    }

    handleResults(response: any)
    {
        let resultSets = [];

        for (let i in response.results) {
            resultSets.push(new ResultSet(response.results[i]))
        }

        for (let i in response.errors) {

        }

        return resultSets;
    }

    ping(): Promise<boolean>
    {
        const trans = new Transaction()
        trans.add('MATCH (n) RETURN ID(n) LIMIT 1')

        return new Promise((resolve, reject) => {
            this.http.post(this.url, { statements: trans.getStatements() }, { headers: this.headers })
              .pipe(map(res => {
                if (res) {
                  return res
                } else {
                  reject(res)
                }
              }))
                .toPromise()
                .then((response: HttpResponse<any>) => {
                    resolve(true)
                }).catch(err => {
                    reject(err)
                })
        })

    }
}
