import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from '../../../services/strapi.service';

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.css'
})
export class VisionComponent implements OnInit {
  visionContent: any;

  constructor(private strapiService: StrapiService) {}

  ngOnInit() {
    this.strapiService.getVision().subscribe(
      (data) => {
        this.visionContent = data.data.attributes;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la vision:', error);
      }
    );
  }
}