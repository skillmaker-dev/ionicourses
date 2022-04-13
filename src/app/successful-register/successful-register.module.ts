import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessfulRegisterPageRoutingModule } from './successful-register-routing.module';

import { SuccessfulRegisterPage } from './successful-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessfulRegisterPageRoutingModule
  ],
  declarations: [SuccessfulRegisterPage]
})
export class SuccessfulRegisterPageModule {}
