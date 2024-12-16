/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, OnInit } from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  AbstractControl,
  Validator,
  NG_VALIDATORS,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class InputComponent implements ControlValueAccessor, Validator, OnInit {
  @Input() disabled?: boolean;
  @Input() form: FormGroup = new FormGroup({});
  @Input() formControlName = '';
  @Input() initialValue?: string;
  @Input() label = '';
  @Input() required = false;
  @Input() textarea?: boolean;
  @Input() textareaRows?: number;

  formControl: FormControl = new FormControl();

  ngOnInit(): void {
    if (this.initialValue) this.writeValue(this.initialValue);
    if (this.disabled) this.setDisabledState(this.disabled);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: string) => {};
  onTouch = () => {};

  onInput(): void {
    this.onChange(this.formControl.value);
  }

  writeValue(value: string): void {
    this.formControl.setValue(value || '');
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  validate(control: AbstractControl): Record<string, boolean> | null {
    if (!this.formControl.untouched && !control.value && this.required) {
      return { required: true };
    }
    return null;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
}
