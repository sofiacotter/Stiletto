import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'category/:category',
    loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryPageModule)
  },
  {
    path: 'comments',
    loadChildren: () => import('./pages/comments/comments.module').then(m => m.CommentsPageModule)
  },
  {
    path: 'post/:idpost',
    loadChildren: () => import('./pages/post/post.module').then(m => m.PostPageModule)
  },
  {
    path: 'profileedit',
    loadChildren: () => import('./pages/profileedit/profileedit.module').then( m => m.ProfileeditPageModule)
  },
  {
    path: 'register1',
    loadChildren: () => import('./pages/register1/register1.module').then( m => m.Register1PageModule)
  },
  {
    path: 'profileother/:uid',
    loadChildren: () => import('./pages/profileother/profileother.module').then( m => m.ProfileotherPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
