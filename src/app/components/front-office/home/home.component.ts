import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChangeImgButtonDirective } from '../../../directives/img-button/change-img-button.directive';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { StrapiService } from '../../../services/strapi.service';

interface FAQItem {
  title: string;
  content: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ChangeImgButtonDirective,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    CommonModule,
    MatExpansionModule,
    CdkAccordionModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  progressValue = 1;
  
  steps = [
    { label: 'Je trouve ma solution', img: 'assets/images/home-progress/01.svg' },
    { label: 'Je signe ma proposition tarifaire électroniquement', img: 'assets/images/home-progress/02.svg' },
    { label: 'D&D effectue la collecte dans les délais les plus courts', img: 'assets/images/home-progress/03.svg' },
    { label: 'Votre procès verbal d’intervention envoyé automatiquement sous 48h ouvrés après l’intervention', img: 'assets/images/home-progress/04.svg' },
    { label: 'Vous participer pour une planète durable', img: 'assets/images/home-progress/05.svg' }
  ];

  stepIcone = [{img: 'assets/images/home-progress/01.svg'}];

  readonly panelOpenState = signal(false);

  items: FAQItem[] = [];

  constructor(private strapiService: StrapiService) {}

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.strapiService.getFaqs().subscribe(response => {
      this.items = response.data.map((item: any) => ({
        title: item.question,
        content: item.anwser.map((ans: any) => ans.children.map((child: any) => child.text).join('')).join('\n')
      }));
    });
  }

  updateProgress(stepIndex: number) {
    this.progressValue = stepIndex * 20;
  }
}