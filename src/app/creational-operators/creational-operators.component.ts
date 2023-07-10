import { Component, OnInit } from '@angular/core';
import { from, fromEvent, of } from 'rxjs';

@Component({
  selector: 'app-creational-operators',
  templateUrl: './creational-operators.component.html',
  styleUrls: ['./creational-operators.component.css']
})
export class CreationalOperatorsComponent {
  public fromFetchData: any;
  public ofFetchData : any;
  public creationalOperators = [
    "from",
    "fromEvent",
    "of",
    "Difference between of and from"
  ]
  constructor() { }
  showAction(operator) {
    switch (operator) {
      //debounce
      case this.creationalOperators[0]:
        this.fromOperator();
        break;
      case this.creationalOperators[1]:
        this.fromEventOperator();
        break;
      case this.creationalOperators[2]:
        this.ofEventOperator();
        break;
        case this.creationalOperators[3]:
        this.diffBwofAndfromEventOperator();
        break;
        default:
          return false;

    }
  }

  /**
   * @name fromOperator
   * @description from operator converts promise, array to observable
   * @returns void
   */

  fromOperator() {
    // Create an Observable out of a promise
    this.fromFetchData = from(fetch('http://dummy.restapiexample.com/api/v1/employees'));
    // Subscribe to begin listening for async result
    this.fromFetchData.subscribe({
      next(response) { console.log('From operators promise', response); },
      error(err) { console.error('Error: ' + err); },
      complete() { console.log('Completed'); }
    });
  }

  /**
   * @name fromEventOperator
   * @description fromEvent operator converts DOMEvent to observables
   * @returns void
   */
  fromEventOperator() {
    const el = document.getElementById('divElement');
    // Create an Observable that will publish mouse movements
    const mouseMoves = fromEvent(el, 'mousemove');
    // Subscribe to start listening for mouse-move events
    const subscription = mouseMoves.subscribe((evt: MouseEvent) => {
      // Log coords of mouse movements
      console.log(`Coords: ${evt.clientX} X ${evt.clientY}`);
      // When the mouse is over the upper-left of the screen,
      // unsubscribe to stop listening for mouse movements
      if (evt.clientX < 40 && evt.clientY < 40) {
        subscription.unsubscribe();
      }
    });
  }

   /**
   * @name ofEventOperator
   * @description of operator converts numbers to observables
   * @returns void
   */
  ofEventOperator(){
     // Create an Observable out of a promise
     this.ofFetchData = of([1,2,3]);
     // Subscribe to begin listening for async result
     this.ofFetchData.subscribe({
       next(response) { console.log('of operators', response); },
       error(err) { console.error('Error: ' + err); },
       complete() { console.log('Completed'); }
     });
  }
  /**
   * @name diffBwofAndfromEventOperator
   * @description Diff b/w of and from operators 
   * @returns void
   */
  diffBwofAndfromEventOperator(){
    // Create an Observable out of a promise
    let ofFetchData = of([1,2,3]);
    // Subscribe to begin listening for async result
    ofFetchData.subscribe({
      next(response) { console.log('of operator', response + 'hello'); },
      error(err) { console.error('Error: ' + err); },
      complete() { console.log('Completed'); }
    });
    // Create an Observable out of a promise
    let fromFetchData = from([1,2,3]);
    // Subscribe to begin listening for async result
    fromFetchData.subscribe({
      next(response) { console.log('from operator', response + 'hello'); },
      error(err) { console.error('Error: ' + err); },
      complete() { console.log('Completed'); }
    });
 }
}
