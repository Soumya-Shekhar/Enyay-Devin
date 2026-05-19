import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Inmate {
  id: string;
  firstName: string;
  lastName: string;
  facility: string;
  status: string;
  admissionDate: string;
}

@Component({
  selector: 'app-inmate-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inmate-list.html',
  styleUrls: ['./inmate-list.scss'],
})
export class InmateListComponent {
  inmates: Inmate[] = [
    { id: 'INM-001', firstName: 'John', lastName: 'Doe', facility: 'Facility A', status: 'Active', admissionDate: '2024-03-15' },
    { id: 'INM-002', firstName: 'Jane', lastName: 'Smith', facility: 'Facility B', status: 'Active', admissionDate: '2024-06-20' },
    { id: 'INM-003', firstName: 'Robert', lastName: 'Brown', facility: 'Facility A', status: 'Released', admissionDate: '2023-11-08' },
    { id: 'INM-004', firstName: 'Emily', lastName: 'Davis', facility: 'Facility C', status: 'Transferred', admissionDate: '2024-01-12' },
    { id: 'INM-005', firstName: 'Michael', lastName: 'Wilson', facility: 'Facility B', status: 'Active', admissionDate: '2025-02-28' },
  ];
}
