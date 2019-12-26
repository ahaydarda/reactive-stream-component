import {Subject , Observable} from 'rxjs';
import { timeout, timeInterval } from 'rxjs/operators';
import {IReactiveStreamApi}  from './components';

export const longanemtestaddedherethereberylongname =
 (test:any) =>{

}
export const Api :IReactiveStreamApi = {
    prices : new Observable(subscriber => {
        setInterval(() => {
            const newPrice = getRandomArbitrary(1,10);
            subscriber.next(newPrice);
        }, 2000);
      })
}


function getRandomArbitrary(min:number, max:number) :number {
    return Math.random() * (max - min) + min;
  }