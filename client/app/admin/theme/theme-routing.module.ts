import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ThemeComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'admin/index',
        loadChildren: './pages/default/index/index.module#IndexModule'
      },
      {
        path: '',
        redirectTo: 'admin/index',
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: 'index',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {
}
