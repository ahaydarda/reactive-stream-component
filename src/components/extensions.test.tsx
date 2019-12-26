
import { Observable, Observer} from 'rxjs';
import  './extensions';
import {map, finalize} from 'rxjs/operators'

test('AddOperators adds operator to an Observable', (done) => {
    let emitter: Observer<number>;
    const pricingStream =  Observable.create(
                               (e:Observer<number>) => emitter=e
                            );
    pricingStream.addOperators(map((item:number) => (item * 2)))
    .subscribe((value)=>{
        expect(value).toBe(10);
        done();
    })
    emitter.next(5);
   
});

test('AddOperators multiple operators get added on an Observable', (done) => {
    let emitter: Observer<number>;
    const pricingStream =  Observable.create(
                               (e:Observer<number>) => emitter=e
                            );
    pricingStream.addOperators(
          map((item:number) => (item * 2)),
          finalize( () => {
            done();
          })
          )
    .subscribe((value)=>{
        expect(value).toBe(10);
    })
    emitter.next(5);
    emitter.error("err");
});


//2,4,8,16,32,64,128,256,512,1024,2048
[2,4,8,16,32,64,128,256,512,1024,2048].forEach( (item,index, arr) =>{
    test(`AddOperators adds ${index+1} operators to observable`, (done) => {
        let emitter: Observer<number>;
         const pricingStream =  Observable.create(
                               (e:Observer<number>) => emitter=e
                            );
        var slicedArr = arr.slice(0, index);
        const operators =  slicedArr.map( a=>map((item:number) => {
            expect(item).toBe(a);
            return (item * 2);
        }));
        operators.push(finalize( () => done()));
        pricingStream.addOperators(...operators)
        .subscribe((value)=>{
            expect(value).toBe(item);
        });
        emitter.next(1);
        emitter.error("err");

    })
});