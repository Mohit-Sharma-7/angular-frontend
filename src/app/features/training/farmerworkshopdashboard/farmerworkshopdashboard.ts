import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// 1. Import the real TrainingService
import { TrainingService, Workshop } from '../../../core/services/trainingservice';

@Component({
  selector: 'app-farmerworkshopdashboard',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './farmerworkshopdashboard.html',
})
export class FarmerworkshopdashboardComponent implements OnInit {
  
  // 2. Inject services
  private trainingService = inject(TrainingService);
  private cdr = inject(ChangeDetectorRef);

  // 3. State variables
  availableWorkshops: Workshop[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadAvailableWorkshops();
  }

  // --- REAL BACKEND CALL: GET ACTIVE WORKSHOPS ---
  loadAvailableWorkshops() {
    this.isLoading = true;
    this.trainingService.getActiveWorkshops().subscribe({
      next: (data) => {
        this.availableWorkshops = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load active workshops:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // --- REAL BACKEND CALL: REGISTER FARMER ---
  registerForWorkshop(workshopId: number | undefined) {
    if (!workshopId) return;
    
    // Remember: Our Trainingservice is currently mocking Farmer ID 401 in the headers!
    this.trainingService.registerForWorkshop(workshopId).subscribe({
      next: (participationRecord) => {
        console.log('Registration successful! Record:', participationRecord);
        alert('Successfully registered for the Workshop!');
        
        // Optional: You could filter this workshop out of the list here so they can't click it again,
        // but our backend already protects against it anyway!
      },
      error: (err) => {
        console.error('Registration failed:', err);
        
        // Catch the exact 409 Conflict error we wrote in Spring Boot!
        if (err.status === 409) {
          alert('You are already registered for this workshop!');
        } else {
          alert('Failed to register. Please try again later.');
        }
      }
    });
  }
}