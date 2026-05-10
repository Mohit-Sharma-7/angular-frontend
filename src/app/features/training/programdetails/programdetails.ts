import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { WorkshopListComponent } from '../workshoplist/workshoplist'; 
import { ScheduleworkshopmodalComponent } from '../scheduleworkshopmodal/scheduleworkshopmodal';

// 1. Import TrainingService and ALL needed interfaces
import { TrainingService, Workshop, TrainingProgram } from '../../../core/services/trainingservice';

@Component({
  selector: 'app-programdetails',
  standalone: true,
  imports: [CommonModule, DatePipe, WorkshopListComponent, ScheduleworkshopmodalComponent], 
  templateUrl: './programdetails.html' 
})
export class ProgramdetailsComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
  
  // 2. Inject your real services
  private trainingService = inject(TrainingService);
  private cdr = inject(ChangeDetectorRef);

  isScheduleModalOpen = false;
  currentProgramId: number = 0;
  
  // 3. Initialize with empty/loading data instead of fake static data
  program: TrainingProgram = {
    programId: 0, title: 'Loading...', description: '', startDate: '', endDate: '', status: '', managerId: 0
  };
  workshops: Workshop[] = [];

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.currentProgramId = Number(idParam);
      this.loadRealData();
    }
  }

  // --- REAL BACKEND CALLS: GET PROGRAM AND ITS WORKSHOPS ---
  loadRealData() {
    // A. Fetch the specific Program details
    this.trainingService.getProgramById(this.currentProgramId).subscribe({
      next: (data) => {
        this.program = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load program details', err)
    });

    // B. Fetch all workshops belonging to this program
    this.trainingService.getWorkshopsByProgram(this.currentProgramId).subscribe({
      next: (data) => {
        this.workshops = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load workshops', err)
    });
  }

  openScheduleModal() {
    this.isScheduleModalOpen = true;
  }

  closeScheduleModal() {
    this.isScheduleModalOpen = false;
  }

  // --- REAL BACKEND CALL: SCHEDULE A WORKSHOP ---
  handleScheduleWorkshop(formData: any) {
    
    // Format the payload exactly as your Java WorkshopRequestDTO expects it
    const requestPayload = {
      programId: this.currentProgramId,
      title: formData.title,
      officerId: formData.officerId,
      location: formData.location,
      date: formData.date
    };

    // Send it to Spring Boot!
    this.trainingService.scheduleWorkshop(requestPayload).subscribe({
      next: (newlySavedWorkshop) => {
        // Spring Boot returns the saved workshop with its real MySQL ID. 
        // Push it to our array to update the UI instantly!
        this.workshops = [...this.workshops, newlySavedWorkshop];
        this.isScheduleModalOpen = false; 
        
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error scheduling workshop:', err);
        alert('Failed to schedule workshop. Check console.');
      }
    });
  }
}