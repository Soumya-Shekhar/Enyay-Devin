import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PRIME_NG_MODULES } from '../../../shared/primeng/primeng-imports';

export interface InmateListItem {
  id: string;
  fullName: string;
  prisonId: string;
  jailNo: string;
}

interface MockInmateRecord {
  id: string;
  inmate?: { fullName?: string; prisonId?: string; jailNo?: string };
}

@Component({
  selector: 'app-inmate-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ...PRIME_NG_MODULES],
  templateUrl: './inmate-list.html',
  styleUrls: ['./inmate-list.scss'],
})
export class InmateListComponent implements OnInit {
  inmates: InmateListItem[] = [];

  private router = inject(Router);
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get<MockInmateRecord[]>('assets/mock-data/inmates.json').subscribe((records) => {
      this.inmates = records.map((r) => ({
        id: r.id,
        fullName: r.inmate?.fullName || '',
        prisonId: r.inmate?.prisonId || '',
        jailNo: r.inmate?.jailNo || '',
      }));
    });
  }

  editInmate(inmate: InmateListItem): void {
    this.router.navigate(['/inmate-management/add-update'], { queryParams: { id: inmate.id } });
  }
}
