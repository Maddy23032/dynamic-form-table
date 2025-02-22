import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { UserFormComponent } from './app/user-form/user-form.component';
import { DataTableComponent } from './app/data-table/data-table.component';
import { UserData, EditableUserData } from './app/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserFormComponent, DataTableComponent],
  template: `
    <div class="container">
      <h1 class="title mb-6">User Management System</h1>
      
      <app-user-form
        (submitData)="onSubmitData($event)"
        class="mb-8"
      ></app-user-form>

      <app-data-table
        [users]="users"
        (deleteUser)="onDeleteUser($event)"
        (updateUser)="onUpdateUser($event)"
      ></app-data-table>
    </div>
  `,
})
export class App {
  users: EditableUserData[] = [];

  onSubmitData(data: UserData) {
    this.users = [...this.users, { ...data, isEditing: false }];
  }

  onDeleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  onUpdateUser(updatedUser: EditableUserData) {
    this.users = this.users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
  }
}

bootstrapApplication(App);