/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ],
  imports: [
    MatSlideToggle,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() form: FormGroup = new FormGroup({});

  formControl: FormControl = new FormControl();

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
}
