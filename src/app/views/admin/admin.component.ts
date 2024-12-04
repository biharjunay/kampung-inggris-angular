import { Component, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import _nav from "app/_nav";

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrl: 'admin.component.scss'
})
export class AdminComponent {
  protected readonly navItems = _nav

  isCollapsed = false;

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
}
