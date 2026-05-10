import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // <-- IMPORTED HttpHeaders
import { Observable, forkJoin } from 'rxjs';

// --- PROGRAM INTERFACES ---

export interface TrainingProgram {
  programId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  managerId: number;
}

export interface TrainingProgramRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

// --- WORKSHOP INTERFACES ---

export interface Workshop {
  workshopId?: number;
  programId: number;
  programTitle?: string;
  title: string;       
  officerId: number;
  location: string;
  date: string;
  status: string;
}

export interface WorkshopRequest {
  programId: number;
  title: string;       
  officerId: number;
  location: string;
  date: string;
}

// --- PARTICIPATION INTERFACES ---

export interface Participation {
  participationId: number;
  workshopId: number;
  farmerId: number;
  attendanceStatus: string;
  feedback?: string;
}

export interface AttendanceUpdateRequest {
  participationId: number;
  newAttendanceStatus: string; // Must be "Present" or "Absent"
}

// --- API SERVICE ---

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  
  private http = inject(HttpClient);
  // Base URL for your Spring Boot backend
  private apiUrl = 'http://localhost:8086/api'; 

  // --- MOCK AUTHENTICATION HELPER ---
  // This fakes the JWT token logic so Spring Boot doesn't block us with 403 Forbidden!
  private getAuthHeaders(role: string, userId: string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Logged-In-User-Id': userId,
      // Adding the "ROLE_" prefix because Spring Security expects it!
      'X-User-Role': 'ROLE_' + role 
    });
  }

  // --- Program Endpoints ---
  
  getAllPrograms(): Observable<TrainingProgram[]> {
    return this.http.get<TrainingProgram[]>(`${this.apiUrl}/programs`, {
      headers: this.getAuthHeaders('ProgramManager', '101')
    });
  }

  createProgram(programData: TrainingProgramRequest): Observable<TrainingProgram> {
    return this.http.post<TrainingProgram>(`${this.apiUrl}/programs`, programData, {
      headers: this.getAuthHeaders('ProgramManager', '101')
    });
  }

  getProgramById(programId: number): Observable<TrainingProgram> {
    return this.http.get<TrainingProgram>(`${this.apiUrl}/programs/${programId}`, {
      headers: this.getAuthHeaders('ProgramManager', '101')
    });
  }

  // --- Workshop Endpoints ---

  scheduleWorkshop(workshopData: WorkshopRequest): Observable<Workshop> {
    return this.http.post<Workshop>(`${this.apiUrl}/workshops`, workshopData, {
      headers: this.getAuthHeaders('ProgramManager', '101')
    });
  }

  getWorkshopsByProgram(programId: number): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${this.apiUrl}/workshops/program/${programId}`, {
      headers: this.getAuthHeaders('ProgramManager', '101')
    });
  }
  // --- REAL BACKEND CALL: GET WORKSHOP BY ID ---
  // --- REAL BACKEND CALL: GET WORKSHOP BY ID ---
  getWorkshopById(workshopId: number): Observable<Workshop> {
    return this.http.get<Workshop>(`${this.apiUrl}/workshops/${workshopId}`, {
      // ✅ Added the exact same headers we use for the Officer Dashboard!
      headers: this.getAuthHeaders('ExtensionOfficer', '301') 
    });
  }

  getWorkshopsByOfficer(officerId: number): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${this.apiUrl}/workshops/officer/${officerId}`, {
      headers: this.getAuthHeaders('ExtensionOfficer', '201')
    });
  }

  getActiveWorkshops(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(`${this.apiUrl}/workshops/active`, {
      headers: this.getAuthHeaders('Farmer', '401')
    });
  }

  // --- Participation Endpoints ---

  getParticipantsForWorkshop(workshopId: number): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.apiUrl}/participations/workshop/${workshopId}`, {
      headers: this.getAuthHeaders('ExtensionOfficer', '201')
    });
  }

  updateSingleAttendance(request: AttendanceUpdateRequest): Observable<Participation> {
    return this.http.put<Participation>(`${this.apiUrl}/participations/attendance`, request, {
      headers: this.getAuthHeaders('ExtensionOfficer', '301')
    });
  }

  submitBulkAttendance(updates: AttendanceUpdateRequest[]): Observable<Participation[]> {
    const requests = updates.map(update => this.updateSingleAttendance(update));
    return forkJoin(requests);
  }

  registerForWorkshop(workshopId: number): Observable<Participation> {
    const payload = { workshopId: workshopId, farmerId:401 };
    return this.http.post<Participation>(`${this.apiUrl}/participations/register`, payload, {
      headers: this.getAuthHeaders('Farmer', '401')
    });
  }
}