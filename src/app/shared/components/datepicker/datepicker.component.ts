/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  Validator,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import dayjs from 'dayjs';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ],
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class DatepickerComponent implements ControlValueAccessor, Validator {
  @Input() disabled?: boolean;
  @Input() form: FormGroup = new FormGroup({});
  @Input() formControlName = '';
  @Input() hasTime?: boolean;
  @Input() initialValue?: dayjs.Dayjs;
  @Input() label = '';
  @Input() maxDate?: dayjs.Dayjs;
  @Input() minDate?: dayjs.Dayjs;
  @Input() required = false;

  @Output() selectDate? = new EventEmitter<dayjs.Dayjs>();

  formControl: FormControl = new FormControl();
  formControlTime: FormControl = new FormControl();

  constructor(private dateAdapter: DateAdapter<unknown>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: dayjs.Dayjs) => {};
  onTouch = () => {};

  onInput(): void {
    if (this.formControl.value) {
      this.changeDate(
        this.formControlTime.value
          ? this.addTime(this.formControl.value, this.formControlTime.value)
          : this.formControl.value
      );
    }
  }

  writeValue(value: dayjs.Dayjs): void {
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
    isDisabled ? this.formControlTime.disable() : this.formControlTime.enable();
  }

  private changeDate(date: dayjs.Dayjs): void {
    this.onChange(date);
    if (this.selectDate) this.selectDate.emit(date);
  }

  private addTime(date: dayjs.Dayjs, time: string): dayjs.Dayjs {
    const times: string[] = time.split(':');
    return dayjs(date)
      .add(times[0] as unknown as number, 'hours')
      .add(times[1] as unknown as number, 'minutes');
  }
}
