import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';

import { AllGamesRoutingModule } from './all-games-routing.module';
import { AllGamesComponent } from './all-games.component';


@NgModule({
  declarations: [
    AllGamesComponent
  ],
  imports: [
    CommonModule,
    AllGamesRoutingModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class AllGamesModule { }
