import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from '../../../services/strapi.service';

@Component({
  selector: 'app-expertises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expertises.component.html',
  styleUrl: './expertises.component.css'
})
export class ExpertisesComponent implements OnInit {
  expertises: any[] = [];

  constructor(private strapiService: StrapiService) {}

  ngOnInit() {
    this.strapiService.getExpertises().subscribe(
      (data) => {
        this.expertises = data.data.map((expertise: any) => ({
          ...expertise.attributes,
          id: expertise.id
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des expertises:', error);
      }
    );
  }
}