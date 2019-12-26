import { OperatorFunction, Observable } from 'rxjs';


 declare module 'rxjs' {
  interface Observable <T>  {
    addOperators(
        this: Observable<T>, 
        ...operators: OperatorFunction<T,T>[]
    ): Observable<T>;
  }
}

 function addOperators( 
    this: Observable<any>,
    ...operators: OperatorFunction<any,any>[]
    ) : Observable<any> {

    if(operators!= undefined){
        if(operators && operators.length ===1)
            return this.pipe(operators[0])
        if(operators && operators.length ===2)
            return this.pipe(operators[0], 
                             operators[1])
        if(operators && operators.length ===3)
            return this.pipe(operators[0], 
                             operators[1], 
                             operators[2])
        if(operators && operators.length ===4)
            return this.pipe(operators[0], 
                             operators[1], 
                             operators[2], 
                             operators[3])
        if(operators && operators.length ===5)
            return this.pipe(operators[0], 
                             operators[1], 
                             operators[2], 
                             operators[3], 
                             operators[4])
        if(operators && operators.length ===6)
            return this.pipe(operators[0], 
                             operators[1], 
                             operators[2], 
                             operators[3], 
                             operators[4], 
                             operators[5])
        if(operators && operators.length ===7)
            return this.pipe(operators[0], 
                             operators[1], 
                             operators[2], 
                             operators[3], 
                             operators[4], 
                             operators[5], 
                             operators[6])
        if(operators && operators.length ===8)
            return this.pipe(operators[0], 
                             operators[1], 
                             operators[2], 
                             operators[3], 
                             operators[4], 
                             operators[5], 
                             operators[6], 
                             operators[7])
        if(operators && operators.length ===9) 
            return this.pipe(operators[0], 
                             operators[1], 
                             operators[2], 
                             operators[3], 
                             operators[4], 
                             operators[5], 
                             operators[6], 
                             operators[7], 
                             operators[8])
        if(operators && operators.length >=10) {
            const [ operator1, 
                    operator2, 
                    operator3, 
                    operator4, 
                    operator5, 
                    operator6, 
                    operator7, 
                    operator8, 
                    operator9, 
                    ...rest] = operators;
           
                    return this.pipe( 
                                    operator1, 
                                    operator2, 
                                    operator3, 
                                    operator4, 
                                    operator5, 
                                    operator6, 
                                    operator7, 
                                    operator8, 
                                    operator9,
                                    ...rest
                                    );
        }
    }
    return this;
}


Observable.prototype.addOperators  = addOperators;



