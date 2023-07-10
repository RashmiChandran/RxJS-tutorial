import { Component } from '@angular/core';
import { fromEvent, of, interval } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, take, takeUntil, takeWhile, first } from 'rxjs/operators';

@Component({
  selector: 'app-filtering-operators',
  templateUrl: './filtering-operators.component.html',
  styleUrls: ['./filtering-operators.component.css']
})
export class FilteringOperatorsComponent {
  public filteringOperators = [
    "debounceTime",
    "distinctUntilChanged",
    "filter",
    "take",
    "takeUntil",
    "takeWhile",
    "first"
  ]
  constructor() { }
  showAction(operator) {
    switch (operator) {
      //debounce
      case this.filteringOperators[0]:
        this.debounceTimeOperator();
        break;
      case this.filteringOperators[1]:
        this.distinctUntilChangedOperator();
        break;
      case this.filteringOperators[2]:
        this.filterOperator();
        break;
      case this.filteringOperators[3]:
        this.takeOperator();
        break;
      case this.filteringOperators[4]:
        this.takeUntilOperator();
        break;
      case this.filteringOperators[5]:
        this.takeWhileOperator();
        break;
      case this.filteringOperators[6]:
        this.firstOperator();
        break;
      default:
        return false;
    }
  }

  /**
  * @name debounceTimeOperator
  * @description debounceTime rxjs operator waits for the specified period to emit event from obersvable
  * @returns void
  */
  debounceTimeOperator() {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(debounceTime(1000));
    result.subscribe(x => console.log("debounceTime Operator", x));
  }

  /**
  * @name distinctUntilChangedOperator
  * @description distinctUntilChanged rxjs operator 
  * checks the previous value with the current value, if both are same, will remove the object
  * @returns void
  */
  distinctUntilChangedOperator() {
    of(
      { age: 4, name: 'Foo' },
      { age: 7, name: 'Bar' },
      { age: 5, name: 'Foo' },
      { age: 6, name: 'Foo' },
    ).pipe(
      distinctUntilChanged((p, q) => p.name === q.name),
    )
      .subscribe(x => console.log("distinctUntilChanged operator", x));
  }

  /**
  * @name filterOperator
  * @description filter rxjs operator 
  * checks the previous value with the current value, if both are same, will remove the object
  * @returns void
  */
  filterOperator() {
    const clicks = fromEvent(document, 'click');
    const clicksOnDivs = clicks.pipe(filter((ev: any) => ev.target.tagName === 'LI'));
    clicksOnDivs.subscribe(x => console.log("filter operator", x));
  }

  /**
  * @name takeOperator
  * @description take rxjs operator 
  * Emits only the first count values emitted by the source Observable.
  * @returns void
  */
  takeOperator() {
    const intervalCount = interval(1000);
    const takeFive = intervalCount.pipe(take(5));
    takeFive.subscribe(x => console.log("take operator", x));
  }

  /**
  * @name takeUntilOperator
  * @description takeUntil rxjs operator 
  * Emits only the first count values emitted by the source Observable.
  * @returns void
  */
  takeUntilOperator() {
    console.log("To stop subscription press any keys")
    const source = interval(1000);
    const keypressEvent = fromEvent(document, 'keypress');
    const result = source.pipe(takeUntil(keypressEvent));
    result.subscribe(x => console.log("takeUntil operator", x));
  }

  /**
 * @name takeWhileOperator
 * @description takeWhile rxjs operator 
 * Emits values emitted by the source observable 
 * so long as each value satisfies the given predicate and 
 * then completes as soon as this predicate is not satisfied.
 * @returns void
 */
  takeWhileOperator() {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(takeWhile((ev: any) => ev.clientX > 200));
    result.subscribe(x => console.log("takeWhile Operator",x));
  }

  /**
 * @name firstOperator
 * @description first rxjs operator 
 * Emits only the first value (or the first value that meets 
 * some condition) emitted by the source Observable, 
 * or a default value. If no default value is provided, 
 * it will error if it does not get a first value.
 * @returns void
 */
  firstOperator() {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(first());
    result.subscribe(x => console.log(x));
  }
}
