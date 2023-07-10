import { Component } from '@angular/core';
import { combineLatest, timer, concat, interval, forkJoin, merge, fromEvent, race, of, zip } from 'rxjs';
import { take, mapTo, map, startWith, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-combinational-operators',
  templateUrl: './combinational-operators.component.html',
  styleUrls: ['./combinational-operators.component.css']
})
export class CombinationalOperatorsComponent {
  public combinationalOperators = [
    "combineLatest",
    "concat",
    "forkJoin",
    "merge",
    "race",
    "zip",
    "startWith",
    "withLatestFrom"
  ]
  constructor() { }
  showAction(operator) {
    switch (operator) {
      //combineLatest
      case this.combinationalOperators[0]:
        this.combineLatestOperator();
        break;
      case this.combinationalOperators[1]:
        this.concatOperator();
        break;
      case this.combinationalOperators[2]:
        this.forkJoinOperator();
        break;
      case this.combinationalOperators[3]:
        this.mergeOperator();
        break;
      case this.combinationalOperators[4]:
        this.raceOperator();
        break;
      case this.combinationalOperators[5]:
        this.zipOperator();
        break;
      case this.combinationalOperators[6]:
        this.startWithOperator();
        break;
      case this.combinationalOperators[7]:
        this.withLatestFromOperator();
        break;
      default:
        return false;
    }
  }

  /**
   * @name combineLatestOperator
   * @description combineLatest rxjs operator combines 
   * only the latest value of each observable emitted at each time
   * @returns void
   */
  combineLatestOperator() {
    const firstTimer = timer(0, 1000);
    const secondTimer = timer(500, 1000);
    const combinedTimers = combineLatest(firstTimer, secondTimer).pipe(take(3));
    combinedTimers.subscribe(value => console.log("Combine Latest", value));
  }

  /**
   * @name concatOperator
   * @description concat rxjs operator will complete emitting the result of first observable
   * and pass to another observable and goes on...
   * @returns void
   */
  concatOperator() {
    const firstInterval = interval(1000).pipe(take(3));
    const secondInterval = interval(3000).pipe(take(3));
    const concatIntervals = concat(firstInterval, secondInterval);
    concatIntervals.subscribe(value => console.log("Concat Operator", value));
  }

  /**
  * @name forkJoinOperator
  * @description forkJoin rxjs operator Wait for Observables to complete 
  * and then combine last values they emitted.
  * @returns void
  */
  forkJoinOperator() {
    const firstTimer = timer(0, 1000).pipe(take(3));
    const secondTimer = timer(500, 1000).pipe(take(3));
    const forkJoinTimers = forkJoin(firstTimer, secondTimer);
    forkJoinTimers.subscribe(value => console.log("forkJoin Operator", value));
  }

  /**
   * @name mergeOperator
   * @description merge rxjs operator - Turn multiple observables into a single observable
   * @returns void
   */
  mergeOperator() {
    const clicks = fromEvent(document, 'click');
    const timer = interval(1000).pipe(take(2));
    const clicksOrTimer = merge(clicks, timer);
    clicksOrTimer.subscribe(x => console.log('merge operator', x));
  }

  /**
   * @name raceOperator
   * @description race rxjs operator - It will emits the first emiited event 
   * from the observable inputs
   * @returns void
   */
  raceOperator() {
    const firstInterval = interval(1000).pipe(mapTo('First one'));
    const secondInterval = interval(2000).pipe(mapTo('Second one'));
    const raceTimers = race(firstInterval, secondInterval).pipe(take(1));
    raceTimers.subscribe((value) => console.log("race Operator", value));
  }

  /**
  * @name zipOperator
  * @description zip rxjs operator - combines all the given observables, 
  * whose values are calculated from the values, in order, of each of its input Observables.
  * @returns void
  */
  zipOperator() {
    let age$ = of<number>(27, 25, 29, 30);
    let name$ = of<string>('Foo', 'Bar', 'Beer');
    let isDev$ = of<boolean>(true, true, false);

    zip(age$, name$, isDev$).pipe(
      map(([age, name, isDev]) => ({ age, name, isDev })),
    )
      .subscribe(x => console.log("zip operator", x));
  }

  /**
   * @name startWithOperator
   * @description startWith rxjs/operators operator - First emits its arguments in order,
   *  and then any emissions from the source.
   * @returns void
   */
  startWithOperator() {
    let age$ = of<number>(27, 25, 29, 30);
    age$
      .pipe(startWith('Foo', 'Bar'))
      .subscribe(x => console.log("startWith operators", x));
  }

  /**
    * @name withLatestFromOperator
    * @description withLatestFromOperator rxjs/operators operator - combines each value from the source Observable (the instance) with the latest values
    * from the other input Observables only when the source emits a value
    * @returns void
    */
  withLatestFromOperator() {
    const firstInterval = interval(1000).pipe();
    const secondInterval = interval(500).pipe();
    const raceTimers = firstInterval.pipe(withLatestFrom(secondInterval), take(3));
    raceTimers.subscribe((value) => console.log("withLatestFrom Operator", value));
  }

}
