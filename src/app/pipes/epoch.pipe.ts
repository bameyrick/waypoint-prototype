import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'epoch',
})
export class EpochPipe implements PipeTransform {
  transform(value: number): string {
    return moment(value).format('MMM-DD-YYYY HH:mm:ss');
  }
}
