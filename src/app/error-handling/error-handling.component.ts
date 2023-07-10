import { Component } from '@angular/core';
import { throwError, of, interval, timer } from 'rxjs';
import { catchError, mergeMap, retry, map, retryWhen, tap, delayWhen } from 'rxjs/operators';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent {
  public errorHandlers = [
    "catchError",
    "retry",
    "retryWhen"
  ];
  showAction(errorHandler) {
    switch (errorHandler) {
      case this.errorHandlers[0]:
        this.catchErrorHandler();
        break;
      case this.errorHandlers[1]:
        this.retryHandler();
        break;
      default:
        return false;
    }
  }

  /**
   * @name catchErrorHandler
   * @description catchError Handler Catches errors on the Observable to be handled 
   * by returning a new Observable or throwing an error.
   * @returns void
   */
  catchErrorHandler() {
    //emit error
    const source = throwError('This is an error!');
    //gracefully handle error, returning observable with error message
    const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
    //output: 'I caught: This is an error'
    const subscribe = example.subscribe(val => console.log(val));
  }

  /**
   * @name retryHandler
   * @description retry Handler Catches errors on the Observable to be handled 
   * by returning a new Observable or throwing an error.
   * @returns void
   */
  retryHandler() {
    //emit value every 1s
    const source = interval(1000);
    const example = source.pipe(
      mergeMap(val => {
        //throw error for demonstration
        if (val > 2) {
          return throwError('Error!');
        }
        return of(val);
      }),
      //retry 2 times on error
      retry(2)
    );
    const subscribe = example.subscribe({
      next: val => console.log(val),
      error: val => console.log(`${val}: Retried 2 times then quit!`)
    });
  }

  retryWhenHandler() {
    //emit value every 1s
    const source = interval(1000);
    const example = source.pipe(
      map(val => {
        if (val > 5) {
          //error will be picked up by retryWhen
          throw val;
        }
        return val;
      }),
      retryWhen(errors =>
        errors.pipe(
          //log error message
          tap(val => console.log(`Value ${val} was too high!`)),
          //restart in 6 seconds
          delayWhen(val => timer(val * 1000))
        )
      )
    );
    const subscribe = example.subscribe(val => console.log(val));
  }
}
