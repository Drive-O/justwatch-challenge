import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IData } from '../IData';

@Injectable() //Optional Decorator
export class ListService{
  private _url = './app/list/data.json';
  constructor(private _http: Http){

  }
  //Get the data from the data.json file
  getList(): Observable<IData[]> {
    return this._http.get(this._url)
    .map((response: Response) => <IData[]> response.json())
    .do(data => console.log('All: ' + JSON.stringify(data)))
    .catch(this.handleError);
  }
  private handleError(error: Response){
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
