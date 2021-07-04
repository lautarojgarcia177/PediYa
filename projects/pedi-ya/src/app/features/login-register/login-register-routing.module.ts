import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../core/core.module';
import { LoginComponent } from './login/components/login.component';


const routes: Routes = [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'pedi-ya.login-register.login.title' }
      },
      // {
      //   path: 'register',
      //   component: Register,
      //   data: { title: 'pedi-ya.login-register.menu.stocks' }
      // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRegisterRoutingModule {}
