import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService, UploadedDocument } from '../inmate-data.service';

@Component({
  selector: 'app-inmate-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...PRIME_NG_MODULES
  ],
  templateUrl: './inmate-details.html',
  styleUrls: ['./inmate-details.scss'],
})
export class InmateDetailsComponent {
  [x: string]: any;

  save$ = output<void>();

  selectedInmateId: string = '';

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Transgender', value: 'Transgender' },
  ];

  documentOptions = [
    {
      label: 'Photo',
      value: 'Photo'
    },
    {
      label: 'Aadhar Card',
      value: 'Aadhar Card'
    },
    {
      label: 'Passport',
      value: 'Passport'
    },
    {
      label: 'Driving License',
      value: 'Driving License'
    }
  ];

  selectedDocumentType: string = '';

  documentNumber: string = '';

  inmateData: any[] = [
    {
      id: 'INM-001',
      inmate: {
        fullName: 'John Doe',
        sonDaughterOf: 'Richard Doe',
        gender: 'Male',
        jailNo: 'JL-2024-0451',
        prisonId: 'PID-78923',
        aadharNo: '4567 8901 2345',
        passportNo: 'K1234567',
        drivingLicenseNo: 'DL-0420201234567',
        thumbCaptured: true,
        faceCaptured: true
      }
    },
    {
      id: 'INM-002',
      inmate: {
        fullName: 'Jane Smith',
        sonDaughterOf: 'Thomas Smith',
        gender: 'Female',
        jailNo: 'JL-2024-0892',
        prisonId: 'PID-45612',
        aadharNo: '2345 6789 0123',
        passportNo: '',
        drivingLicenseNo: '',
        thumbCaptured: true,
        faceCaptured: false
      }
    }
  ];


  constructor(
    public inmateService: InmateDataService
  ) { }

  get form() {
    return this.inmateService.inmateDetailsForm;
  }

  get uploadedDocuments(): UploadedDocument[] {

  return this.inmateService.uploadedDocuments;

}


  onDocumentUpload(event: any): void {

  const file = event.files?.[0];

  if (!file || !this.selectedDocumentType) {
    return;
  }

  this.inmateService.uploadedDocuments.push({
    type: this.selectedDocumentType,
    number: this.documentNumber,
    fileName: file.name
  });

  // RESET
  this.selectedDocumentType = '';
  this.documentNumber = '';
}

  removeDocument(index: number): void {

this.inmateService.uploadedDocuments.splice(index, 1);  }

  captureThumb(): void {

    this.form.patchValue({
      thumbCaptured: true
    });
  }

  captureFace(): void {

    this.form.patchValue({
      faceCaptured: true
    });
  }

  save(): void {

    this.form.markAllAsTouched();

    const payload = {
    inmate: {
      ...this.form.value,
      documents: this.uploadedDocuments
    }
  };

    console.log(
      'Saving inmate details:',
      this.form.value
    );

    console.log(
      'Uploaded Documents:',
      this.uploadedDocuments
    );

    this.save$.emit();
  }
}