import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllGamesComponent } from './all-games.component';

const routes: Routes = [
  {
    path: "",
    component: AllGamesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllGamesRoutingModule { }
