import { Routes } from '@angular/router';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { StartGameComponent } from './components/start-game/start-game.component';
import { PlayingGameComponent } from './components/playing-game/playing-game.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'game-mode/start' },
    { path: 'category', component: CategoryTableComponent },
    { path: 'category-form', component: CategoryFormComponent },
    { path: 'category-form/:id', component: CategoryFormComponent },
    { path: 'game-mode/start', component: StartGameComponent },
    { path: 'game-mode/playing', component: PlayingGameComponent },
    { path: 'game-mode/playing/:id', component: PlayingGameComponent },
];
