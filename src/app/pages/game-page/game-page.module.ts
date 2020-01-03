import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatMenuModule, MatButtonModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';

import { GamePageRoutingModule } from './game-page-routing.module';
import { GamePageComponent } from './game-page.component';

@NgModule({
  declarations: [
    GamePageComponent
  ],
  imports: [
    CommonModule,
    GamePageRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ]
})
export class GamePageModule { }
