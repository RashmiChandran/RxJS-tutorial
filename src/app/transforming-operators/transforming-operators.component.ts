import { Component } from '@angular/core';
import { fromEvent, interval, of, timer } from 'rxjs';
import { bufferTime, take, concatMap, mergeMap, map, switchMap, mapTo, scan, takeUntil, tap, share, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-transforming-operators',
  templateUrl: './transforming-operators.component.html',
  styleUrls: ['./transforming-operators.component.css']
})
export class TransformingOperatorsComponent {
  public transformingOperators = [
    "bufferTime",
    "concatMap",
    "mergeMap",
    "switchMap",
    "scan",
    "tap",
    "share",
    "map",
    "exhaustMap"
  ]
  constructor() { }
  showAction(operator) {
    switch (operator) {
      case this.transformingOperators[0]:
        this.bufferTimeOperator();
        break;
      case this.transformingOperators[1]:
        this.concatMapOperator();
        break;
      case this.transformingOperators[2]:
        this.mergeMapOperator();
        break;
      case this.transformingOperators[3]:
        this.switchMapOperator();
        break;
      case this.transformingOperators[4]:
        this.scanOperator();
        break;
      case this.transformingOperators[5]:
        this.tapOperator();
        break;
      case this.transformingOperators[6]:
        this.shareOperator();
        break;
      case this.transformingOperators[7]:
        this.mapOperator();
        break;
      case this.transformingOperators[8]:
        this.exhaustMapOperator();
        break;
      default:
        return false;
    }
  }

  /**
  * @name bufferTimeOperator
  * @description bufferTime rxjs operator Collect emitted values until provided time has passed, emit as array.
  * @returns void
  */
  bufferTimeOperator() {
    const intervals = interval(500);
    const buffered = intervals.pipe(bufferTime(2000, 1000), take(5));
    buffered.subscribe(x => console.log("bufferTime Operator", x));
  }

  /**
  * @name concatMapOperator
  * @description concatMap rxjs operator Takes a value from the source,
  * maps it into a new observable, 
  * and only runs one observable at a time until it completes. 
  * Then moves on to the next value in the buffer
  * @returns void
  */
  concatMapOperator() {
    const letters = of('a', 'b')
    const result = letters.pipe(
      concatMap(x => interval(1000).pipe(map(i => x + i), take(2)))
    );
    result.subscribe(x => console.log("concatMap Operator", x));
  }

  /**
  * @name mergeMapOperator
  * @description mergeMap rxjs operator Takes every single value, 
  * maps it into an observable, and subscribes to it. 
  * Then, it outputs whatever is coming from those inner observables as a single stream of values.
  * @returns void
  */
  mergeMapOperator() {
    const letters = of('a', 'b')
    const result = letters.pipe(
      mergeMap(x => interval(1000).pipe(map(i => x + i), take(2)))
    );
    result.subscribe(x => console.log("mergeMap Operator", x));
  }

  /**
  * @name switchMapOperator
  * @description switchMap rxjs operator Maps a value to a new observable, 
  * subscribes to that observable, unsubscribes from the previous observable it was subscribed to.
  * @returns void
  */
  switchMapOperator() {
    const letters = of('a', 'b')
    const result = letters.pipe(
      switchMap(x => interval(1000).pipe(map(i => x + i), take(2)))
    );
    result.subscribe(x => console.log("switchtMap Operator", x));
  }

  /**
  * @name exhaustMapOperator
  * @description exhaustMap rxjs operator Maps a value to a new observable, 
  * subscribes to that observable, unsubscribes from the previous observable it was subscribed to.
  * @returns void
  */
  exhaustMapOperator() {
    const letters = of('a', 'b')
    const result = letters.pipe(
      exhaustMap(x => interval(1000).pipe(map(i => x + i), take(2)))
    );
    result.subscribe(x => console.log("exhaustMap Operator", x));
  }

  /**
  * @name scanOperator
  * @description scan rxjs operator Acts as a array reduce function, but emit value when source observable emits
  * @returns void
  */
  scanOperator() {
    const clicks = fromEvent(document, 'click');
    const ones = clicks.pipe(mapTo(1));
    const seed = 0;
    const keypressEvent = fromEvent(document, 'keypress');
    const count = ones.pipe(scan((acc, one) => acc + one, seed), takeUntil(keypressEvent));
    count.subscribe(x => console.log("scan Operator", x));
  }



  /*************************************************** Utility Operators ********************************************************/

  /**
  * @name tapOperator
  * @description tap rxjs operator Acts as a sideeffect fucntion when the observable emits value
  * @returns void
  */
  tapOperator() {
    const clicks = fromEvent(document, 'click');
    const positions = clicks.pipe(
      tap(ev => console.log(ev))
    );
    let postionSubscription =positions.subscribe(x => console.log("tap Operator", x));
    postionSubscription.unsubscribe();
  }

  /**
   * @name mapOperator
   * @description map rxjs operator transform the output data
   * @returns void
   */
  mapOperator() {
    const clicks = fromEvent(document, 'click');
    const positions = clicks.pipe(
      map((ev: any) => ev.clientX)
    );
    positions.subscribe(x => console.log("map Operator", x));
  }
  /*************************************************** Multicasting Operators ********************************************************/

  /**
  * @name tapOperator
  * @description share rxjs operator - It is a multicast which shares the hot obserables. 
  * https://itnext.io/the-magic-of-rxjs-sharing-operators-and-their-differences-3a03d699d255
  * @returns void
  */
  shareOperator() {

    //emit value in 1s
    const source = timer(1000);
    //log side effect, emit result
    const example = source.pipe(
      tap(() => console.log('***SIDE EFFECT***')),
      mapTo('***RESULT***')
    );

    /*
      ***NOT SHARED, SIDE EFFECT WILL BE EXECUTED TWICE***
      output:
      "***SIDE EFFECT***"
      "***RESULT***"
      "***SIDE EFFECT***"
      "***RESULT***"
    */
    const subscribe = example.subscribe(val => console.log(val));
    const subscribeTwo = example.subscribe(val => console.log(val));

    //share observable among subscribers
    const sharedExample = example.pipe(share());
    /*
      ***SHARED, SIDE EFFECT EXECUTED ONCE***
      output:
      "***SIDE EFFECT***"
      "***RESULT***"
      "***RESULT***"
    */
    const subscribeThree = sharedExample.subscribe(val => console.log(val));
    const subscribeFour = sharedExample.subscribe(val => console.log(val));
  }
}
