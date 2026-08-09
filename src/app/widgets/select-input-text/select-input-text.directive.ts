import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[selectInputText]',
  standalone: true,
})
export class SelectInputTextDirective {
  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('click')
  selectInputText(): void {
    this.elementRef.nativeElement.select();
  }
}
