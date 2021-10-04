import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-monto',
  templateUrl: './confirm-monto.component.html',
  styleUrls: ['./confirm-monto.component.scss']
})
export class ConfirmMontoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmMontoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  cancelar() {
    this.dialogRef.close();
  }

}
