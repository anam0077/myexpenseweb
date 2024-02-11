import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { Two2faComponent } from "./two2fa/two2fa.component";


const routes: Routes = [
    {
      path: '2fa',
      component: Two2faComponent
    }
  ];
@NgModule(
    {
        imports:[
            RouterModule.forChild(routes),
            CommonModule,
            ReactiveFormsModule
        ],
        declarations:[
            Two2faComponent
        ]
    }
)
export class VerificationModule{

}