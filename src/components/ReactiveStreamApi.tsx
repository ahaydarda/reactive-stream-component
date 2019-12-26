
import React from 'react';
import {IReactiveStreamContextProps} from './interfaces';
import {ReactiveStreamContext} from './ReactiveStreamContext';


export function ReactiveStreamApi ({value,children}:IReactiveStreamContextProps) { 
    return (   
        <ReactiveStreamContext.Provider value={value}>
        { children }
        </ReactiveStreamContext.Provider>
    );
};
