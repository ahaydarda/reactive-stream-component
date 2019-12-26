import { Observable } from 'rxjs';
import { ReactNode } from 'react';

export interface ISubscription{
    onLoading: () => JSX.Element;
    onNext?: (item: any) => any;
    onError?: (err: any) => JSX.Element;
    onComplete?: () => JSX.Element;
    onFinalized?: () => JSX.Element;
    [x: string]: any;
    children?: ReactNode;
}

export interface IReactiveStreamComponentProps 
      extends ISubscription {
     stream: string ;
}

export  interface ISubsribedProps extends ISubscription {
    observable: Observable<any>;
}
