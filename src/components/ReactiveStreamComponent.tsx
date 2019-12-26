
import React from 'react';
import Subscribed from './Subscribed';
import {IReactiveStreamComponentProps} from './interfaces'
import {ReactiveStreamContext} from './ReactiveStreamContext';

export const ReactiveStreamComponent: React.FC<IReactiveStreamComponentProps>
 = (props:IReactiveStreamComponentProps) =>{
    const { stream, ...rest} = props;
    return (
        <ReactiveStreamContext.Consumer>
         { (streamApi) => {
             // eslint-disable-next-line no-restricted-globals
            const ob = streamApi[stream];
            return ( <Subscribed observable={ob} {...rest}/>);
         }}
        </ReactiveStreamContext.Consumer>
    )
}