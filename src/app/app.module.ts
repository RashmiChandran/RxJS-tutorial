import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreationalOperatorsComponent } from './creational-operators/creational-operators.component';
import { CombinationalOperatorsComponent } from './combinational-operators/combinational-operators.component';
import { FilteringOperatorsComponent } from './filtering-operators/filtering-operators.component';
import { TransformingOperatorsComponent } from './transforming-operators/transforming-operators.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { ObservablesComponent } from './observables/observables.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';

@NgModule({
  declarations: [
    AppComponent,
    CreationalOperatorsComponent,
    CombinationalOperatorsComponent,
    FilteringOperatorsComponent,
    TransformingOperatorsComponent,
    ObservablesComponent,
    ErrorHandlingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
  MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
