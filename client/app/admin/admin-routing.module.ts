import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LogoutComponent } from './auth/logout/logout.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    children: [
      { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
      { path: 'logout', component: LogoutComponent },
      { path: '', redirectTo: 'index', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
