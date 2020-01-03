import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatMenuModule, MatButtonModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';

import { GamePageRoutingModule } from './game-page-routing.module';
import { GamePageComponent } from './game-page.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { CardComponent } from 'src/app/components/card/card.component';

@NgModule({
  declarations: [
    GamePageComponent,
    ModalComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    GamePageRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class GamePageModule { }
