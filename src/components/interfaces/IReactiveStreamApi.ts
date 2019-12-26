import {Observable} from 'rxjs';

export interface  IReactiveStreamApi{
    [x:string]:  Observable<any>;
}