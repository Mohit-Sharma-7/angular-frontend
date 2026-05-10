import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

// 1. Import Workshop interface
import { TrainingService, AttendanceUpdateRequest, Participation, Workshop } from '../../../core/services/trainingservice';

export interface FarmerAttendance {
  participationId: number; 
  farmerId: number;
  name: string;
  village: string;
  phone: string;
  isPresent: boolean;
  status: string;
}

@Component({
  selector: 'app-attendance-details',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterLink],
  templateUrl: './attendancedetails.html'
})
export class AttendancedetailsComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
  private trainingService = inject(TrainingService); 
  private cdr = inject(ChangeDetectorRef);
  
  currentWorkshopId: number = 0;
  isSubmitting = false;
  isLoading = true;

  // 2. Start with a "Loading" state instead of static text
  workshop: Workshop | any = {
    title: 'Loading details...',
    programTitle: '...',
    date: new Date().toISOString(),
    location: 'Loading...',
    enrolledCount: 0,
    status: 'Loading...'
  };

  farmers: FarmerAttendance[] = [];

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.currentWorkshopId = Number(idParam);
      
      // TRIGGER BOTH REAL BACKEND CALLS!
      this.loadWorkshopDetails();
      this.loadParticipants();
    }
  }

  // --- NEW: FETCH ACTUAL WORKSHOP DETAILS ---
  loadWorkshopDetails() {
    this.trainingService.getWorkshopById(this.currentWorkshopId).subscribe({
      next: (data) => {
        // Overwrite the loading state with the real MySQL data!
        this.workshop = data; 
        
        // Ensure the enrolled count stays synced with the number of farmers
        this.workshop.enrolledCount = this.farmers.length; 
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load workshop details', err)
    });
  }

  loadParticipants() {
    this.isLoading = true;
    this.trainingService.getParticipantsForWorkshop(this.currentWorkshopId).subscribe({
      next: (data: Participation[]) => {
        this.farmers = data.map(p => ({
          participationId: p.participationId,
          farmerId: p.farmerId,
          name: `Farmer ID: ${p.farmerId}`, 
          village: 'Registered Online',     
          phone: 'N/A',                     
          isPresent: p.attendanceStatus === 'Present',
          status: p.attendanceStatus
        }));

        // Keep enrolled count perfectly accurate
        this.workshop.enrolledCount = this.farmers.length;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load participants', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleAll(event: any) {
    const isChecked = event.target.checked;
    this.farmers.forEach(farmer => farmer.isPresent = isChecked);
  }

  submitBulkAttendance() {
    this.isSubmitting = true;
    const attendanceUpdates: AttendanceUpdateRequest[] = this.farmers.map(farmer => ({
      participationId: farmer.participationId,
      newAttendanceStatus: farmer.isPresent ? 'Present' : 'Absent' 
    }));

    // Make sure submitBulkAttendance uses getAuthHeaders('ExtensionOfficer', '301') in your service!
    this.trainingService.submitBulkAttendance(attendanceUpdates).subscribe({
      next: (responses) => {
        alert('Attendance successfully saved to database!');
        this.isSubmitting = false;
        this.farmers.forEach(f => f.status = f.isPresent ? 'Present' : 'Absent');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to update attendance', err);
        alert('Error saving attendance. Check your console logs.');
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }
}