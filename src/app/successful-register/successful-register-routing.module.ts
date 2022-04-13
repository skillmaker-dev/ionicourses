import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessfulRegisterPage } from './successful-register.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessfulRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessfulRegisterPageRoutingModule {}
