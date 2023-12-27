import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { Layer1Component } from './contents/layer1/layer1.component';


const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];
@NgModule({
  declarations: [
    AboutComponent,
    Layer1Component
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ComponentsModule,
  ]
})
export class AboutModule { }
