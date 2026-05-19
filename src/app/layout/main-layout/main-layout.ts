import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header';
import { SidebarComponent } from '../sidebar/sidebar';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
})
export class MainLayoutComponent {
  isSidebarCollapsed = false;

  onToggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
