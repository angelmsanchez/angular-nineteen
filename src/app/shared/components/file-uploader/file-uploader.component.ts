/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, forwardRef, input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  AbstractControl,
  NG_VALIDATORS,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

interface FileInterface {
  data: {
    name: string;
  };
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
}

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileUploaderComponent),
      multi: true
    }
  ],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [animate(300, style({ opacity: 0 }))])
    ])
  ],
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class FileUploaderComponent implements OnInit {
  readonly accept = input('text/*, .jpg, .jpeg, .png, .pdf');
  readonly disabled = input<boolean>();
  readonly form = input<FormGroup>(new FormGroup({}));
  readonly formControlName = input('');
  readonly initialValue = input<string>();
  readonly label = input('shared.attachmentsFile');
  readonly required = input(false);

  formControl: FormControl = new FormControl();
  files: FileInterface[] = [];

  ngOnInit(): void {
    const initialValue = this.initialValue();
    if (initialValue) this.writeValue(initialValue);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: FileInterface[]) => {};
  onTouch = () => {};

  onInput(): void {
    this.onChange(this.files);
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

  upload(): void {
    const fileUpload: HTMLInputElement = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    fileUpload.onchange = () => {
      if (fileUpload?.files && fileUpload?.files.length > 0) {
        for (let index = 0; index < fileUpload?.files.length; index++) {
          this.files.push({
            data: fileUpload?.files[index],
            state: 'in',
            inProgress: false,
            progress: 0,
            canRetry: false,
            canCancel: true
          });
        }
      }
      this.onInput();
    };
    fileUpload?.click();
  }

  cancelFile(fileDelete: FileInterface): void {
    this.files = this.files.filter(
      (file) => file.data.name !== fileDelete.data.name
    );
  }
}
