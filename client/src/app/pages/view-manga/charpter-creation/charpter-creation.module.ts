import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CharpterCreationPageRoutingModule } from './charpter-creation-routing.module';
import { CharpterCreationPage } from './charpter-creation.page';
import { ComponentsModule  } from '../../../components/components.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharpterCreationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CharpterCreationPage]
})
export class CharpterCreationPageModule {}
