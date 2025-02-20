import { CommonModule } from '@angular/common';
import { Component, linkedSignal, OnInit, signal } from '@angular/core';
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
import { ChangeDetectorComponent } from '../change-detector/change-detector.component';

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
    RadioButtonComponent,
    ChangeDetectorComponent
  ]
})
export class HomeIndexComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  languages = signal<SelectOptionInterface[]>([
    {
      id: '1',
      name: 'Español'
    },
    {
      id: '2',
      name: 'Ingles'
    }
  ]);
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
  languageSelected = linkedSignal(() => this.languages()[0].name);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  changeLanguage(value: SelectOptionInterface): void {
    this.languageSelected.set(value.name);
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
