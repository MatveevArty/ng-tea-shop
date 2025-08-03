import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLength'
})
export class TextLengthPipe implements PipeTransform {

  /**
   * Сокращение длинной строки с добавлением троеточия
   * @param value Строка
   * @param certainLength Необходимая длина
   */
  transform(value: string, certainLength: number): string {
    if (value.length > certainLength) {
      return value.slice(0, certainLength) + '...';
    } else {
      return value;
    }
  }

}
