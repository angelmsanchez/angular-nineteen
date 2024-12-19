import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  DatepickerComponent,
  FileUploaderComponent,
  InputComponent,
  InputNumberComponent,
  RadioButtonComponent,
  SelectComponent,
  ToggleComponent
} from 'src/app/shared/components';
import {
  RadioOptionInterface,
  SelectOptionInterface
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    InputNumberComponent,
    SelectComponent,
    DatepickerComponent,
    ToggleComponent,
    FileUploaderComponent,
    RadioButtonComponent
  ]
})
export class HomeIndexComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  languages: SelectOptionInterface[] = [
    {
      id: '1',
      name: 'Español'
    },
    {
      id: '2',
      name: 'Ingles'
    }
  ];
  optionsRadioGroup: RadioOptionInterface[] = [
    {
      value: 'Masculino',
      label: 'Maculino'
    },
    {
      value: 'Femenino',
      label: 'Femenino'
    }
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      age: [undefined],
      date: [''],
      fileUploader: [''],
      gender: [undefined],
      language: [''],
      name: [''],
      toggle: [true]
    });
  }
}
