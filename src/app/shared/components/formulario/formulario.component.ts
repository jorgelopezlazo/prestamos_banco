import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  // email = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  // clienteForm : FormGroup;
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // this.clienteForm = new FormGroup(
    //   email: new FormControl('', Validators.required, Validators.email)
    // )
  }

  submitForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cedula: ['', [Validators.required]],
    monto: ['', [Validators.required, Validators.min(10000), Validators.max(100000)]],
  })


  onSubmit() {
    if (!this.submitForm.valid) {
      return;
    }
    console.log(this.submitForm.value);
  }

}
