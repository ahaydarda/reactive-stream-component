import { rendered, createOperatorInstance, createOperators } from './util';
import { OperatorFunction, Observable, Observer } from 'rxjs';

it('rendered calls function if it callable', () => {
    let value = 0;
    const func1 = () =>{  return value = 1; }
    const newValue = rendered(func1);
    expect(newValue).toBe(1);
});

it('rendered calls function if it callable with args ', () => {
    let value = 1;
    const func1 = ( add: number) =>{  return value = value + add; }
    const newValue = rendered(func1, 5);
    expect(newValue).toBe(6);
});

it('rendered returns first value if it is not function', () => {
    let value = 1;
    const newValue= rendered(value);
    expect(newValue).toBe(1);
});


it('creates an operator function from string key name and sets its arguments correctly', (done) => {
    let emitter :any;
    let operatorName = "map"
    let operatorFunc = (item:number) => (item * 2);
    const operator:OperatorFunction<any,any> = createOperatorInstance(operatorName, operatorFunc);

    
    const pricingStream =  Observable.create(
                               (e:Observer<number>) => emitter=e
                            );
    pricingStream.pipe(operator)
    .subscribe((value:number)=>{
        expect(value).toBe(10);
    })
    emitter.next(5);
    emitter.error("err");
    done();
});

it('creates array of operators from operator object key/value pair', (done) => {
    let emitter :any;
    let operatorDefinitions : any=  {};
    operatorDefinitions["map"] = (item:number) => (item * 2);
    let recieved:any;
   
    operatorDefinitions["finalize"] = () => { 
        done();
    };

    operatorDefinitions["catchError"] =  (err:any) =>{
         expect(err).toBe("err")
      }
    const operators: OperatorFunction<any,any>[] =  createOperators(operatorDefinitions);
    
    const pricingStream =  Observable.create(
                               (e:Observer<number>) => emitter=e
                            );
    pricingStream.pipe(operators[0], operators[1])
    .subscribe((value:number)=>{
        expect(value).toBe(10)
    })
    emitter.next(5);
    emitter.error();
  
});



