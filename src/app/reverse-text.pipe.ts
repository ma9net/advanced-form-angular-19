import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseText',
})
export class ReverseTextPipe implements PipeTransform {
  transform(value: string): unknown {
    if (!value) return '';

    const processedValue = value.replace(/\s+/g, '').toLocaleLowerCase();

    return processedValue.split('').reverse().join('');;
  }
}
