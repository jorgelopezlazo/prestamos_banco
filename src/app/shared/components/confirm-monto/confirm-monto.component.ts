import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-monto',
  templateUrl: './confirm-monto.component.html',
  styleUrls: ['./confirm-monto.component.scss']
})
export class ConfirmMontoComponent implements OnInit {
  submitForm: FormGroup = this.form.group({
    monto: ['', [Validators.required, Validators.min(10000), Validators.max(100000)]],
  })
  constructor(
    private form: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmMontoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void { }

  cancelar() {
    this.dialogRef.close();
  }

  onSubmitCant() {
    if (!this.submitForm.valid) {
      return;
    }
    this.dialogRef.close(this.submitForm.value);
  }

}
