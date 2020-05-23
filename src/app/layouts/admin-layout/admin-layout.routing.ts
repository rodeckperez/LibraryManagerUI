import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { AutorComponent } from '../../pages/autor/autor.component';
import { CategoriesComponent } from '../../pages/categories/categories.component';
import { EditorialsComponent } from '../../pages/editorials/editorials.component';
import { TableComponent } from '../../pages/table/table.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';



export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'autor', component: AutorComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'table', component: TableComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'editorials', component: EditorialsComponent },
];
