import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";
import { SnackbarNotif } from "../interface/snackbar-notif.interface";

@Component({
    template: `
    <div fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="10px">
      <p class="overflow-clip overflow-hidden" [ngClass]="{danger:'text-red', info:'text-cyan', success:'text-green', warn: 'text-orange'}[data.type]" [innerHTML]="data.message">
      </p>
      <button fxFlex="100px" mat-stroked-button color="accent" (click)="snackBarRef.dismissWithAction()">{{ data.action || 'CLOSE' }}</button>
    </div>
    `,
  })
export class SnackbarNotifComponent {
    constructor(public snackBarRef: MatSnackBarRef<SnackbarNotifComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarNotif) { }
}
