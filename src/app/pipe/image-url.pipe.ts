import { Pipe, PipeTransform } from '@angular/core';
import environment from 'environments/environment';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: string | undefined): string {
    return value ? `${environment.storageUrl}/${value}` : ''
  }
}
