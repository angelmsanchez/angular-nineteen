/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnInit, input } from '@angular/core';
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
  readonly disabled = input<boolean>();
  readonly form = input<FormGroup>(new FormGroup({}));
  readonly formControlName = input('');
  readonly initialValue = input<string>();
  readonly label = input('');
  readonly required = input(false);
  readonly textarea = input<boolean>();
  readonly textareaRows = input<number>();

  formControl: FormControl = new FormControl();

  ngOnInit(): void {
    const initialValue = this.initialValue();
    if (initialValue) this.writeValue(initialValue);
    const disabled = this.disabled();
    if (disabled) this.setDisabledState(disabled);
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
    if (!this.formControl.untouched && !control.value && this.required()) {
      return { required: true };
    }
    return null;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
}
