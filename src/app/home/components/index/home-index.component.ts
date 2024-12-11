import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// import {
//   RadioOptionInterface,
//   SelectOptionInterface
// } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss'],
  imports: []
})
export class HomeIndexComponent implements OnInit {
  // form: FormGroup;
  // languages: SelectOptionInterface[] = [
  //   {
  //     id: '1',
  //     name: 'Español'
  //   },
  //   {
  //     id: '2',
  //     name: 'Ingles'
  //   }
  // ];
  // optionsRadioGroup: RadioOptionInterface[] = [
  //   {
  //     value: 'Masculino',
  //     label: 'Maculino'
  //   },
  //   {
  //     value: 'Femenino',
  //     label: 'Femenino'
  //   }
  // ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    //   this.form = this.formBuilder.group({
    //     age: [undefined],
    //     date: [''],
    //     fileUploader: [''],
    //     gender: [undefined],
    //     language: [''],
    //     name: [''],
    //     toggle: [true]
    //   });
  }
}
