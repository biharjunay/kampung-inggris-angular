import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah'
})
export class RupiahPipe implements PipeTransform {
  transform(value: number | null | undefined, withSymbol: boolean = true): string {
    if (value === null || value === undefined) return '';
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, // Optional: remove decimals
    }).format(value);
    return withSymbol ? formatted : formatted.replace(/Rp\s?/, '').trim();
  }
}
