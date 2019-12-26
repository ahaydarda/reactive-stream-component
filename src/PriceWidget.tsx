import React from 'react';

import  {ReactiveStreamComponent} from './components';

export const PriceWidget = ()=>{

    return (
        <ReactiveStreamComponent 
          stream = "prices"
          filter =  { (item:number) =>{
            return item >= 2;
          }}
          map = {(price:number) => price.toFixed(2)}
          onLoading = { ()=>(<div>loading prices..</div>)}
          onNext = {
              (price:number)=>{
              return (<div>{price}</div>)
              }
          }
        />
    )
}