import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Inicio', icon: 'nc-bank', class: '' },
  { path: '/notifications', title: 'Notificaciones', icon: 'nc-bell-55', class: '' },
  { path: '/user', title: 'Usuarios', icon: 'nc-single-02', class: '' },
  { path: '/autor', title: 'Autores', icon: 'nc-single-02', class: '' },
  { path: '/categories', title: 'Categorias', icon: 'nc-tile-56', class: '' },
  { path: '/editorials', title: 'Editoriales', icon: 'nc-tile-56', class: '' },
  { path: '/table', title: 'Libros', icon: 'nc-tile-56', class: '' },
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
