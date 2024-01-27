import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarNotifComponent } from './snackbar-notif-component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [SnackbarNotifComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [SnackbarNotifComponent],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 7500 } }
  ]
})
export class NotificationModule { }
