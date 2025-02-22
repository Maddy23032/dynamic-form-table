import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserData } from '../types';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" #form="ngForm" class="form">
      <div class="form-group">
        <label for="name" class="form-label">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          [(ngModel)]="formData.name"
          required
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label for="phone" class="form-label">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          [(ngModel)]="formData.phone"
          pattern="[0-9-+() ]+"
          required
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label for="idNumber" class="form-label">ID Number:</label>
        <input
          type="text"
          id="idNumber"
          name="idNumber"
          [(ngModel)]="formData.idNumber"
          required
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label for="picture" class="form-label">Picture:</label>
        <input
          type="file"
          id="picture"
          (change)="onFileSelected($event)"
          accept="image/jpeg,image/png"
          class="form-input"
        >
      </div>

      <button 
        type="submit"
        [disabled]="!form.valid || !selectedFile"
        class="btn btn-primary"
      >
        Save
      </button>
    </form>
  `,
})
export class UserFormComponent {
  @Output() submitData = new EventEmitter<UserData>();

  formData: Partial<UserData> = {
    name: '',
    phone: '',
    idNumber: '',
  };

  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newData: UserData = {
          id: Date.now(),
          name: this.formData.name!,
          phone: this.formData.phone!,
          idNumber: this.formData.idNumber!,
          picture: e.target?.result as string
        };
        this.submitData.emit(newData);
        this.resetForm();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  private resetForm() {
    this.formData = {
      name: '',
      phone: '',
      idNumber: '',
    };
    this.selectedFile = null;
  }
}