import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() appHighlight = '#f0f0f0';
  @Input() defaultColor = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.highlight(this.appHighlight || this.defaultColor || '#f0f0f0');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.highlight('');
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
