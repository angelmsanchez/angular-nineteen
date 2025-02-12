/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  forwardRef,
  OnInit,
  input,
  output
} from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputNumberComponent),
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
export class InputNumberComponent
  implements ControlValueAccessor, Validator, OnInit
{
  readonly currency = input<string | undefined>();
  readonly form = input<FormGroup>(new FormGroup({}));
  readonly formControlName = input('');
  readonly initialValue = input<number>();
  readonly label = input<string | undefined>();
  readonly max = input<number | null>(null);
  readonly min = input(0);
  readonly percentage = input<boolean | undefined>(false);
  readonly required = input(false);

  readonly selectValue = output<number>();

  formControl: FormControl = new FormControl();

  ngOnInit(): void {
    const initialValue = this.initialValue();
    if (initialValue) this.writeValue(initialValue);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: number) => {};
  onTouch = () => {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onKeyPress = (_: number) => {};

  onInput(): void {
    this.onChange(this.formControl.value);
    if (this.selectValue) this.selectValue.emit(this.formControl.value);
  }

  writeValue(value: number): void {
    this.formControl.setValue(value || '');
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  registerOnKeyPress(fn: () => void): void {
    this.onKeyPress = fn;
  }

  validate(control: AbstractControl): Record<string, boolean> | null {
    if (!this.formControl.untouched && !control.value && this.required()) {
      return { required: true };
    }
    if (control.value && this.min() > control.value) {
      return { min: true };
    }
    if (control.value && this.max && this.max < control.value) {
      return { max: true };
    }
    return null;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
}
