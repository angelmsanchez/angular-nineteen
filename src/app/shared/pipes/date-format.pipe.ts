import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: dayjs.Dayjs, dateFormat?: string): string {
    return dayjs(value).format(dateFormat || 'DD/MM/YYYY');
  }
}
