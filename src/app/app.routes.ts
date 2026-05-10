import { Routes } from '@angular/router';
import { ProgrammanagerdashboardComponent } from './features/training/programmanagerdashboard/programmanagerdashboard';
import { OfficerdashboardComponent } from './features/training/officerdashboard/officerdashboard';
import { FarmerworkshopdashboardComponent } from './features/training/farmerworkshopdashboard/farmerworkshopdashboard';
import { ProgramdetailsComponent } from './features/training/programdetails/programdetails';
import { AttendancedetailsComponent } from './features/training/attendancedetails/attendancedetails';

export const routes: Routes = [
    // Role-Specific Dashboards (Training Module)
  { path: 'programmanagerdashboard', component: ProgrammanagerdashboardComponent },
  { path: 'officerdashboard', component: OfficerdashboardComponent },
  { path: 'farmerworkshopdashboard', component: FarmerworkshopdashboardComponent },
  { path: 'programdetails', component: ProgramdetailsComponent },
  // Update this specific line in your routes array:
  { path: 'programdetails/:id', component: ProgramdetailsComponent },
  { path: 'attendance/:id', component: AttendancedetailsComponent }
 
];