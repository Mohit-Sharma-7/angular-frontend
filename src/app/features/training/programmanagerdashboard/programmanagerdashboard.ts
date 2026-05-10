import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router'; 

import { CreateprogrammodalComponent } from '../createprogrammodal/createprogrammodal';
// 1. Re-imported the TrainingService
import { TrainingService, TrainingProgram, TrainingProgramRequest } from '../../../core/services/trainingservice';

@Component({
  selector: 'app-program-manager-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe, CreateprogrammodalComponent],
  templateUrl: './programmanagerdashboard.html',
})
export class ProgrammanagerdashboardComponent implements OnInit {
  
  isModalOpen = false;
  private router = inject(Router);
  
  // 2. Inject the necessary services
  private trainingService = inject(TrainingService);
  private cdr = inject(ChangeDetectorRef); 
  
  // 3. Start with an empty array. Data will now come from the backend!
  programs: TrainingProgram[] = []; 
  
  // Optional flag to show a loading state if you want to add a spinner later
  isLoading = true; 

  ngOnInit(): void {
    this.loadProgramsFromDatabase();
  }

  // --- REAL BACKEND CALL: GET ALL PROGRAMS ---
  loadProgramsFromDatabase() {
    this.isLoading = true;
    this.trainingService.getAllPrograms().subscribe({
      next: (data) => {
        // Save the real database data
        this.programs = data; 
        this.isLoading = false;
        
        // 4. Force the UI to update immediately as requested by your Team Lead!
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Failed to fetch programs from backend:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openCreateModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  
  viewDetails(programId: number) {
    this.router.navigate(['/programdetails', programId]);
  }

  // --- REAL BACKEND CALL: CREATE PROGRAM ---
  handleSaveProgram(newProgramRequest: TrainingProgramRequest) {
    
    // We send the data straight to Spring Boot
    this.trainingService.createProgram(newProgramRequest).subscribe({
      next: (newlyCreatedProgram) => {
        
        // Push the real object (which now has a real MySQL ID!) to the UI
        this.programs.unshift(newlyCreatedProgram);
        this.isModalOpen = false; 
        
        // Force the UI to render the new card instantly
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error creating program:', err);
        alert('Failed to save to database. Is Spring Boot running?');
      }
    });
  }
}