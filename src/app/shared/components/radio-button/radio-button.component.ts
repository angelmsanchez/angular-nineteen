/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, forwardRef, OnInit, input } from '@angular/core';
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
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';

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
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatRadioButton,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class RadioButtonComponent
  implements OnInit, ControlValueAccessor, Validator
{
  readonly disabled = input(false);
  readonly form = input<FormGroup>(new FormGroup({}));
  readonly formControlName = input('');
  readonly initialValue = input<string>();
  readonly inline = input<boolean | undefined>(false);
  readonly label = input('');
  readonly options = input<RadioOptionInterface[]>([]);
  readonly required = input<boolean>();

  formControl: FormControl = new FormControl();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (option: RadioOptionInterface) => {};
  onTouch = () => {};

  ngOnInit(): void {
    const initialValue = this.initialValue();
    if (initialValue) this.writeValue(initialValue);
    const disabled = this.disabled();
    if (disabled) this.setDisabledState(disabled);
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
    if (!this.formControl.untouched && !control.value && this.required()) {
      return { required: true };
    }
    return null;
  }
}
