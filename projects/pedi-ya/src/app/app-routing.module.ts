import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { AuthComponent } from './core/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'order',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'order',
    loadChildren: () =>
    import('./features/order/order.module').then((m) => m.OrderModule)
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.module').then((m) => m.AboutModule)
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./features/settings/settings.module').then(
        (m) => m.SettingsModule
      )
  },
  {
    path: 'user-orders',
    loadChildren: () =>
      import('./features/user-orders/user-orders.module').then(
        (m) => m.UserOrdersModule
      ),
      canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: 'order'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
