
import { OperatorFunction } from 'rxjs';
import  * as Operators from 'rxjs/operators';

export function rendered( value:any, ...args:any[]){
    return typeof value === 'function'? value(...args) : value;
}


export function createOperators(operators:any)
: OperatorFunction<any,any>[]{
   return operators && Object.entries(operators).map(
       ([key, value]) =>{
            return createOperatorInstance(key,value);
       }
   )
}

export function createOperatorInstance(operatorName: string, ...args: any[])
 : OperatorFunction<any,any>
{
    return  (<any>Operators)[operatorName](...args);
}