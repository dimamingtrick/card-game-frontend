import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: "./pages/home-page/home-page.module#HomePageModule"
  },
  {
    path: "game",
    loadChildren: "./pages/game-page/game-page.module#GamePageModule"
  },
  {
    path: "all-games",
    loadChildren: "./pages/all-games/all-games.module#AllGamesModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
