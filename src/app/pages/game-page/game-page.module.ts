import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatMenuModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

import { GamePageRoutingModule } from './game-page-routing.module';
import { GamePageComponent } from './game-page.component';
import { GameModalComponent } from 'src/app/components/modal/game-modal.component';
import { CardComponent } from 'src/app/components/card/card.component';

@NgModule({
  declarations: [
    GamePageComponent,
    GameModalComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    GamePageRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ]
})
export class GamePageModule { }
