/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, forwardRef, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  AbstractControl,
  Validator,
  ReactiveFormsModule
} from '@angular/forms';

import { RadioOptionInterface } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ],
  imports: [
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class RadioButtonComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @Input() disabled = false;
  @Input() form: FormGroup = new FormGroup({});
  @Input() formControlName = '';
  @Input() initialValue?: string;
  @Input() inline?: boolean = false;
  @Input() label = '';
  @Input() options: RadioOptionInterface[] = [];
  @Input() required?: boolean;

  formControl: FormControl = new FormControl();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (option: RadioOptionInterface) => {};
  onTouch = () => {};

  ngOnInit(): void {
    if (this.initialValue) this.writeValue(this.initialValue);
    if (this.disabled) this.setDisabledState(this.disabled);
  }

  onInput(): void {
    this.onChange(this.formControl.value);
  }

  writeValue(value: string): void {
    if (value !== null && value !== undefined) this.formControl.setValue(value);
    else this.formControl.setValue('');
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  validate(control: AbstractControl): Record<string, boolean> | null {
    if (!this.formControl.untouched && !control.value && this.required) {
      return { required: true };
    }
    return null;
  }
}
