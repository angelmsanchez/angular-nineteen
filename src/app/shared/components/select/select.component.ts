/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Component,
  forwardRef,
  OnInit,
  input,
  output
} from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  AbstractControl,
  NG_VALIDATORS,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { SelectOptionInterface } from '../../interfaces/';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule, MatSelectTrigger } from '@angular/material/select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  imports: [
    MatSelectModule,
    MatSelectTrigger,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class SelectComponent
  implements OnInit, ControlValueAccessor, Validator
{
  readonly disabled = input<boolean>();
  readonly form = input<FormGroup>(new FormGroup({}));
  readonly formControlName = input('');
  readonly initialValue = input<string>();
  readonly label = input('');
  readonly multiple = input<boolean | undefined>(false);
  readonly required = input(false);
  readonly translate = input<boolean | undefined>(false);
  readonly values = input<SelectOptionInterface[]>([]);

  readonly selectOption = output<SelectOptionInterface>();

  formControl: FormControl = new FormControl();
  dataFormat = 'asString';

  ngOnInit(): void {
    const initialValue = this.initialValue();
    if (initialValue) this.writeValue(initialValue);
    const disabled = this.disabled();
    if (disabled) this.setDisabledState(disabled);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (option: SelectOptionInterface) => {};
  onTouch = () => {};

  onInput(): void {
    this.onChange(this.formControl.value);
    if (this.selectOption) this.selectOption.emit(this.formControl.value);
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

  compareWithFn = (
    source: SelectOptionInterface,
    selected: SelectOptionInterface
  ) => {
    return source && selected ? source.id === selected.id : source === selected;
  };

  trackByFunction(index: number, card: SelectOptionInterface): string | number {
    return card && card.id ? card.id : index;
  }

  validate(control: AbstractControl): Record<string, boolean> | null {
    if (!this.formControl.untouched && !control.value && this.required()) {
      return { required: true };
    }
    return null;
  }

  removeSelected(value: SelectOptionInterface): void {
    this.formControl.setValue(
      this.multiple()
        ? this.formControl.value.filter(
            (data: SelectOptionInterface) => data.id !== value.id
          )
        : null
    );
    this.onChange(this.formControl.value);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
}
