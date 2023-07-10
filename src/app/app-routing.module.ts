import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreationalOperatorsComponent } from "./creational-operators/creational-operators.component";
import { CombinationalOperatorsComponent } from "./combinational-operators/combinational-operators.component";
import { FilteringOperatorsComponent } from "./filtering-operators/filtering-operators.component";
import { TransformingOperatorsComponent } from "./transforming-operators/transforming-operators.component";
import { ObservablesComponent } from "./observables/observables.component";
import { ErrorHandlingComponent } from "./error-handling/error-handling.component";
import { SubjectsComponent } from "./subjects/subjects.component";

const routes: Routes = [
  {
    path: "observables",
    component: ObservablesComponent,
  },
  {
    path: "creational-operators",
    component: CreationalOperatorsComponent,
  },
  {
    path: "combinational-operators",
    component: CombinationalOperatorsComponent,
  },
  {
    path: "filtering-operators",
    component: FilteringOperatorsComponent,
  },
  {
    path: "transforming-operators",
    component: TransformingOperatorsComponent,
  },
  {
    path: "error-handling",
    component: ErrorHandlingComponent,
  },
  {
    path: "subjects",
    component: SubjectsComponent,
  },
  {
    path: "",
    redirectTo: "observables",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
