import React from 'react';
import Subscribed from './Subscribed';
import { act } from 'react-dom/test-utils';
import {Subject, of, from, Observable, Observer} from 'rxjs';
import { map } from 'rxjs/operators';
import {render, waitForElement} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


it('renders onloading by default', () => {
    const div = document.createElement('div');
    const loadingText = "Loading values..."
    const  stream = new Subject<string>();
    const onLoading = () => (<div>{ loadingText}</div>)
    const { getByText} = render((<Subscribed onLoading={onLoading} observable={stream} />));
    expect(getByText(loadingText)).toBeInTheDocument();
});

it('accepts observable item and subscribe on it', async(done)=>{
    const div = document.createElement('div');
    const loadingText = "Loading values...";
    const onLoading = () => (<div>{loadingText}</div>)
    const onNext = (item: string) => (<div>{item}</div>);
    const  stream = new Subject();
    const {getByText} = render(
        (  <Subscribed 
            onLoading={onLoading} 
            observable={stream} 
            onNext={onNext}
            />
        ));
    const initialItem= await waitForElement(() => getByText(loadingText));
    expect(initialItem).toBeDefined();
    const item= "new item";
    act( ()=>stream.next(item)); // this should rerender component
    const newItemElement = await waitForElement(() => getByText(item));
    expect(newItemElement).toBeDefined();
    done();
})

it('it renders error if any error occurs in the streaming in inital emitting', async(done) =>{
    const  stream = new Subject<string>();
  
    const newStream =from([ "test", ""]).pipe(map<string, string>( (x:string)=>{
        if(x === "")
         throw "empty value";
        return x + " mapped..";
    }))
    
    const {getByText} = render(
        (  <Subscribed 
            onLoading = {()=>(<div>loading..</div>)} 
            observable = {newStream} 
            onNext = {(item)=>(<div>{item}</div>)}
            onError = { (err)=>(<div>{err}</div>)}
            />
        ));
    //right way of using the <rx className=""></rx>
    
    const newItemElement = await waitForElement(() => getByText("empty value"));
    expect(newItemElement).toBeDefined();

    done();
});

it('it renders onError if any error occurs in the streaming after emitting values', async(done) =>{
    const  stream = new Subject<string>();
    let emitter:any;
    const newStream =  Observable.create( (e:any)=>emitter=e).pipe(map<string, string>( (x:string)=>{
        if(x === "")
         throw "empty value";
        return x + " mapped...";
    }))
    const {getByText} = render(
        (  <Subscribed 
            onLoading = {()=>(<div>loading..</div>)} 
            observable = {newStream} 
            onNext = {(item)=>(<div>{item}</div>)}
            onError = { (err)=>(<div>{err}</div>)}
            />
        ));
    act( () =>emitter.next('foo') );
    const newItemElement1 = await waitForElement(() => getByText("foo mapped..."));
    expect(newItemElement1).toBeDefined();

    act( ()=>emitter.next(""));
    
    const newItemElement2 = await waitForElement(() => getByText("empty value"));
    expect(newItemElement2).toBeDefined();
    done();
});


it('it renders onCompleted props when observervable stream is completed', async(done) =>{
    let emitter:Observer<number>;
    const pricingStream =  Observable.create(
                                (e:Observer<number>) => emitter=e
                          );
    const {getByText} = render(
        (  <Subscribed 
            onLoading = {()=>(<div>loading..</div>)} 
            observable = {pricingStream} 
            onNext = {(item)=>(<div>{item}</div>)}
            onError = { (err)=>(<div>{err}</div>)}
            onComplete= {() =>(<div>pricing stream is completed</div>) }
            />
        ));
 
    act( ()=>emitter.next(2));
    act( () =>emitter.complete());
    const element = await waitForElement(() => getByText("pricing stream is completed"));
    expect(element).toBeDefined();
    done();
});


it('it renders onFinialized props when observervable stream is completed', async(done) =>{
    let emitter:Observer<number>;
    const pricingStream =  Observable.create(
                                (e:Observer<number>) => emitter=e
                          );
    const {getByText} = render(
        (  <Subscribed 
            onLoading = {()=>(<div>loading..</div>)} 
            observable = {pricingStream} 
            onNext = {(item)=>(<div>{item}</div>)}
            onError = { (err)=>(<div>{err}</div>)}
            onComplete= {() =>(<div>pricing stream is completed</div>) }
            onFinalized = {()=>(<div>finialized</div>)}
            />
        ));
 
    act( ()=>emitter.next(2));
    act( () =>emitter.complete());
    const element = await waitForElement(() => getByText("finialized"));
    expect(element).toBeDefined();
    done();
});


it('it renders onFinialized props when observervable stream is throw error', async(done) =>{
    let emitter:Observer<number>;
    const pricingStream =  Observable.create(
                                (e:Observer<number>) => emitter=e
                          );
    const {getByText} = render(
        (  <Subscribed 
            onLoading = {()=>(<div>loading..</div>)} 
            observable = {pricingStream} 
            onNext = {(item)=>(<div>{item}</div>)}
            onError = { (err)=>(<div>{err}</div>)}
            onComplete= {() =>(<div>pricing stream is completed</div>) }
            onFinalized = {()=>(<div>finialized</div>)}
            />
        ));
    act( ()=>emitter.next(2));
    act( () =>emitter.error("errrrr"));
    const element = await waitForElement(() => getByText("finialized"));
    expect(element).toBeDefined();
    done();
});


it('it adds single observable operator to component', async(done) =>{
    let emitter:Observer<number>;
    const pricingStream =  Observable.create(
                                (e:Observer<number>) => emitter=e
                          );
    const {getByText} = render(
        (  <Subscribed 
            observable = {pricingStream} 
            map = {(value:number) =>( `${value}.00 GBP`) }
            onNext = {(item)=>(<div>{item}</div>)}
            onLoading = {()=>(<div>loading..</div>)} 
            />
        ));
    act( ()=>emitter.next(20));
    const element = await waitForElement(() => getByText("20.00 GBP"));
    expect(element).toBeDefined();
    done();
});



it('it adds multiple observable operators to reactive stream component', async(done) =>{
    let emitter:Observer<number> ;
    const pricingStream = Observable.create(
                            (e:Observer<number>) => emitter=e
                          );

    const {getByText} = render(
        (  <Subscribed 
            observable = {pricingStream} 
            filter =  {(item:number) => item %2 ===0}
            map = {(value:number) => {return `${value}.00 GBP`; } }
            tap = { (item:any) =>{  expect(`20.00 GBP`).toBe(item); }}
            onNext = {(item)=> { return (<div>{item}</div>) }}
            onLoading = {()=>(<div>loading..</div>)} 
            />
        ));
    const nextValue = () =>emitter.next(13);
    nextValue();
    act( ()=>emitter.next(20));
    const element = await waitForElement(() => getByText("20.00 GBP"));
    expect(element).toBeDefined();
    done();
});