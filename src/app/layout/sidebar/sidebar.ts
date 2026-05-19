import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

export interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavItem[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class SidebarComponent {
  @Input() isCollapsed = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'pi-th-large', route: '/dashboard' },
    {
      label: 'Inmate Management',
      icon: 'pi-users',
      isExpanded: false,
      children: [
        { label: 'Add / Update Inmate', icon: 'pi-user-plus', route: '/inmate-management/add-update' },
        { label: 'Recent Requests', icon: 'pi-list', route: '/inmate-management/recent-requests' },
        { label: 'Inmate List', icon: 'pi-table', route: '/inmate-management/list' },
      ],
    },
    { label: 'Reports', icon: 'pi-chart-bar', route: '/dashboard' },
    { label: 'System Settings', icon: 'pi-cog', route: '/dashboard' },
    { label: 'Audit Trail', icon: 'pi-history', route: '/dashboard' },
  ];

  toggleSubmenu(item: NavItem): void {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
