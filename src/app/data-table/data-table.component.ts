import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableUserData } from '../types';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Phone</th>
            <th>ID Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>
              <img [src]="user.picture" alt="User picture" class="thumbnail">
            </td>
            <td>
              <ng-container *ngIf="!user.isEditing">{{ user.name }}</ng-container>
              <input
                *ngIf="user.isEditing"
                type="text"
                [(ngModel)]="user.name"
                class="edit-input"
              >
            </td>
            <td>
              <ng-container *ngIf="!user.isEditing">{{ user.phone }}</ng-container>
              <input
                *ngIf="user.isEditing"
                type="tel"
                [(ngModel)]="user.phone"
                class="edit-input"
              >
            </td>
            <td>
              <ng-container *ngIf="!user.isEditing">{{ user.idNumber }}</ng-container>
              <input
                *ngIf="user.isEditing"
                type="text"
                [(ngModel)]="user.idNumber"
                class="edit-input"
              >
            </td>
            <td>
              <div class="btn-group">
                <button
                  *ngIf="!user.isEditing"
                  (click)="onEdit(user)"
                  class="btn btn-edit"
                >
                  Edit
                </button>
                <button
                  *ngIf="user.isEditing"
                  (click)="onSave(user)"
                  class="btn btn-save"
                >
                  Save
                </button>
                <button
                  (click)="onDelete(user.id)"
                  class="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class DataTableComponent {
  @Input() users: EditableUserData[] = [];
  @Output() deleteUser = new EventEmitter<number>();
  @Output() updateUser = new EventEmitter<EditableUserData>();

  onEdit(user: EditableUserData) {
    user.isEditing = true;
  }

  onSave(user: EditableUserData) {
    user.isEditing = false;
    this.updateUser.emit(user);
  }

  onDelete(id: number) {
    this.deleteUser.emit(id);
  }
}