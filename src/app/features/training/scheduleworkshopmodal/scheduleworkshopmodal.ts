import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-workshop-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scheduleworkshopmodal.html'
})
export class ScheduleworkshopmodalComponent {
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  formData = {
    title: '',        // The new field!
    location: '',
    date: '',
    officerId: null
  };

  // Dummy list of officers (Later fetched from your User Service)
  availableOfficers = [
    { id: 301, name: 'Officer Rajesh' },
    { id: 302, name: 'Officer Priya' }
  ];

  // Validation: Ensure title is at least 3 chars, matching your Java @Size annotation
  get isFormValid(): boolean {
    return !!this.formData.title && 
           this.formData.title.trim().length >= 3 &&
           !!this.formData.location && 
           !!this.formData.date && 
           !!this.formData.officerId;
  }

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    if (this.isFormValid) {
      this.save.emit(this.formData);
    }
  }
}