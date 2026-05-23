import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, RoleService } from '../../core/services';

export interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavItem[];
  isExpanded?: boolean;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed = false;

  private roleService = inject(RoleService);
  private router = inject(Router);
  private authService = inject(AuthService);

  navItems: NavItem[] = [];

  ngOnInit(): void {
    this.buildSidebar();
  }

  buildSidebar(): void {
    const role = this.roleService.currentRole();
    console.log('Current user role:', role);

    const allMenus: NavItem[] = [
      {
        label: 'Dashboard',
        icon: 'pi-th-large',
        route: '/dashboard',
      },

      {
        label: 'Inmate Management',
        icon: 'pi-users',
        isExpanded: false,

        children: [
          {
            label: 'Add / Update Inmate',
            icon: 'pi-user-plus',
            route: '/inmate-management/add-update',
            roles: ['admin'],
          },

          {
            label: 'Recent Requests',
            icon: 'pi-list',
            route: '/inmate-management/recent-requests',
            roles: ['supritendent'],
          },

          {
            label: 'Inmate List',
            icon: 'pi-table',
            route: '/inmate-management/list',
            roles: ['admin'],
          },
        ],
      },

      {
        label: 'Reports',
        icon: 'pi-chart-bar',
        route: '/dashboard',
        roles: ['admin'],
      },
    ];

    this.navItems = this.filterMenuByRole(allMenus, role);
  }
  toggleSubmenu(item: NavItem): void {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  filterMenuByRole(menus: NavItem[], role: string): NavItem[] {
    return menus
      .filter((menu) => {
        // IF NO ROLES -> SHOW FOR ALL
        if (!menu.roles?.length) {
          return true;
        }

        return menu.roles.includes(role);
      })
      .map((menu) => ({
        ...menu,

        children: menu.children ? this.filterMenuByRole(menu.children, role) : undefined,
      }));
  }
}
