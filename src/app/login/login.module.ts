import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatTooltipModule,
    FormsModule
  ]
})
export class LoginModule { }
