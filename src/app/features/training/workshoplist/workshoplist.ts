import { Component, Input } from '@angular/core'; 
import { CommonModule, DatePipe } from '@angular/common';

// 1. IMPORT THE INTERFACE FROM YOUR SERVICE (Deleted the local one!)
import { Workshop } from '../../../core/services/trainingservice';

@Component({
  selector: 'app-workshop-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './workshoplist.html',
  styleUrl: './workshoplist.css'
})
export class WorkshopListComponent {
  
  // These @Input decorators tell Angular to wait for the Parent to pass the data
  @Input() workshops: Workshop[] = [];
  @Input() programTitle: string = '';

}