import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { AutorComponent } from '../../pages/autor/autor.component';
import { CategoriesComponent } from '../../pages/categories/categories.component';
import { EditorialsComponent } from '../../pages/editorials/editorials.component';
import { TableComponent }           from '../../pages/table/table.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    NotificationsComponent,
    AutorComponent,
    CategoriesComponent,
    EditorialsComponent
  ]
})

export class AdminLayoutModule {}
