
import React, {useState, useCallback, useEffect} from 'react';
import {rendered, createOperators} from './util';
import { Observable, OperatorFunction} from 'rxjs';
import { finalize } from 'rxjs/operators';
import {ISubsribedProps} from './interfaces';
import  './extensions';


enum Stage{ loading, subscribed, error, completed, finialized};

export default function Subscribed(props: ISubsribedProps) {
     const [stage, setStage ] = useState(Stage.loading); 
     const [result, setResult ] = useState(undefined); 
     const [error, setError ] = useState(undefined); 
     const {    
            onLoading, 
            observable, 
            onNext,
            onError, 
            onComplete,
            onFinalized,
            ...operatorDefinitions
            } = props;
    
     const operators = createOperators(operatorDefinitions);
     useEffect(()=> {
        observable
        .pipe(
            finalize(()=>{
                onFinalized && setStage(Stage.finialized);
            })
        )    
        .addOperators(...operators)
        .subscribe( 
            (result)=>{
                setStage(Stage.subscribed);
                setResult(result);
            }, 
            (err) =>{
                setStage(Stage.error);
                setError(err);
            },
            () => {
                setStage(Stage.completed)
            }
        );
     
     },[observable]);
     
     switch(stage){
        case Stage.loading :
            return rendered(onLoading && onLoading());
        case Stage.subscribed:
            return rendered(onNext && onNext(result))
        case Stage.error:
            return rendered(onError&& onError(error))
        case Stage.completed:
            return rendered(onComplete&& onComplete())
        case Stage.finialized:
            return rendered(onFinalized && onFinalized())
        default:
          return rendered(onLoading && onLoading())
     }
}