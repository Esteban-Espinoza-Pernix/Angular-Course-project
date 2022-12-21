import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alert: MatSnackBar) { }

  showAlert(message: string): void {
    this.alert.open(message, '×', {
      duration: 5000,
      verticalPosition: 'top'
    })
  }
}
