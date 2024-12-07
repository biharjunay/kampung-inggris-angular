import { Component, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "@interfaces/user.interface";
import { AuthService } from "@services/auth.service";
import _nav, { INavData } from "app/_nav";

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrl: 'admin.component.scss'
})
export class AdminComponent {
  protected user: User
  protected readonly navItems = _nav
  public isCollapsed = false;

  constructor(private authService: AuthService) {
    this.user = authService.getUser()!
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('document:click', ['$event'])
  closeSidebarOnOutsideClick(event: MouseEvent): void {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.querySelector('#admin-btn');
    const target = event.target as HTMLElement;

    if (
      sidebar &&
      toggleButton &&
      !sidebar.contains(target) &&
      !toggleButton.contains(target) &&
      !this.isCollapsed &&
      window.innerWidth < 768
    ) {
      this.isCollapsed = true;
    }
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  canAccessMenu() {
    return this.navItems.filter(item => item.roles.includes(this.user.role))
  }

  logout() {
    this.authService.logout()
  }
}
