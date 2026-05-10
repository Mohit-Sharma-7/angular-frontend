import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

// 1. Import your TrainingService and Workshop interface
import { TrainingService, Workshop } from '../../../core/services/trainingservice';

@Component({
  selector: 'app-officerdashboard',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink], 
  templateUrl: './officerdashboard.html',
})
export class OfficerdashboardComponent implements OnInit {
  
  // 2. Inject the necessary services
  private trainingService = inject(TrainingService);
  private cdr = inject(ChangeDetectorRef);

  // 3. Start with an empty array. Data will now come from the backend!
  assignedWorkshops: Workshop[] = [];
  isLoading = true;

  // For testing, we are hardcoding the Officer ID we used in our Auth Headers (201)
  currentOfficerId = 301; 

  ngOnInit() {
    this.loadMyWorkshops();
  }

  // --- REAL BACKEND CALL: GET WORKSHOPS BY OFFICER ---
  loadMyWorkshops() {
    this.isLoading = true;
    this.trainingService.getWorkshopsByOfficer(this.currentOfficerId).subscribe({
      next: (data) => {
        // Save the real database data
        this.assignedWorkshops = data;
        this.isLoading = false;
        
        // Force the UI to update immediately
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load officer workshops:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}