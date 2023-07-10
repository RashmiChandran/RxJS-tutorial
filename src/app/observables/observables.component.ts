import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})
export class ObservablesComponent {
  observables = [
    "Synchronous Observables",
    "Asynchronous Observables"
  ]

  showAction(observer) {
    switch (observer) {
      case this.observables[0]:
        this.createSynchrounousObservables();
        break;
      case this.observables[1]:
        this.createAsynchrounousObservables();
        break;
        default:
          return false;
    }
  }

  /**
  * @name createSynchrounousObservables
  * @description observable that can return the values synchrounously to the subscribe method
  * @returns void
  */
  createSynchrounousObservables() {
    // This function runs when subscribe() is called
    function sequenceSubscriber(observer) {
      // synchronously deliver 1, 2, and 3, then complete
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.error("Error occured");
      //This will not be printed as error occured
      observer.next(5);
      return {
        unsubscribe() {
          console.log("Subscription unsubscribed")
        }
      };
    }
    // Create a new Observable that will deliver the above sequence
    const sequence$ = new Observable(sequenceSubscriber);
    // execute the Observable and print the result of each notification
    let observSub = sequence$.subscribe({
      next(num) { console.log("Observer Emitted value", num); },
      error(err) { console.log("Error from observer", err)},
      complete() { console.log('Finished sequence'); }
    });
    //Unsubscribe the subscription
    observSub.unsubscribe();   
  }

  /**
  * @name createAsynchrounousObservables
  * @description observable that can return the values asynchrounously to the subscribe method
  * @returns void
  */
  createAsynchrounousObservables() {
    // This function runs when subscribe() is called
    function sequenceSubscriber(observer) {
      // synchronously value
      observer.next("Sync value");
      observer.next("Sync value");
      //To call observer async
      setTimeout(() => {
       observer.next("Async value: emitted after 1 sec");
       observer.complete();    
      }, 1000);      
    }
    // Create a new Observable that will deliver the above sequence
    const sequence$ = new Observable(sequenceSubscriber);
    // execute the Observable and print the result of each notification
    sequence$.subscribe({
      next(num) { console.log("Observer Emitted value", num); },
      complete() { console.log('Finished sequence'); }
    }); 
  }

}
