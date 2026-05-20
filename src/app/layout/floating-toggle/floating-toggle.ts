import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-toggle.html',
  styleUrls: ['./floating-toggle.scss'],
})
export class FloatingToggleComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  // Keyboard shortcut: Ctrl+B
  @HostListener('window:keydown.control.b', ['$event'])
  onKeyboardToggle(event: KeyboardEvent): void {
    event.preventDefault();
    this.toggleSidebar.emit();
  }
}
