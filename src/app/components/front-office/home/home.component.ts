import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChangeImgButtonDirective } from '../../../directives/img-button/change-img-button.directive';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';


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
  styleUrl: './home.component.css'
})
export class HomeComponent {

  progressValue = 1;
  
    steps = [
      { label: 'Je trouve ma solution', img: 'assets/images/home-progress/01.svg' },
      { label: 'Je signe ma proposition tarifaire électroniquement', img: 'assets/images/home-progress/02.svg' },
      { label: 'D&D effectue la collecte dans les délais les plus courts', img: 'assets/images/home-progress/03.svg' },
      { label: 'Votre procès verbal d’intervention envoyé automatiquement sous 48h ouvrés après l’intervention', img: 'assets/images/home-progress/04.svg' },
      { label: 'Vous participer pour une planète durable', img: 'assets/images/home-progress/05.svg' }
    ];

    stepIcone = [{img: 'assets/images/home-progress/01.svg'}];
  
    updateProgress(stepIndex: number) {
      this.progressValue = stepIndex * 20;
    }

    readonly panelOpenState = signal(false);
  
      items = [
        { title: 'Quels types de prestations proposez-vous?', 
          content: 'D&D propose divers services de destruction de documents et disques durs pour protéger les organisations\
           contre les risques de violation des informations.\
          Nous proposons aussi la collecte et le recyclage d\'archives et de documents papiers de bureau. Voici quelques-uns\
          de nos services les plus populaires : Lien vers la pages des services' },
        { title: 'Pourquoi avoir recours à un service de collecte et de destruction?',
          content: 'Contenu spécifique pour l\'Item 2' },
        { title: 'Quel type de matériaux prenez-vous en charge?', content: 'Contenu spécifique pour l\'Item 3' },
        { title: 'Comment dois-je préparer lintervention de D&D dans mes locaux?', content: 'Contenu spécifique pour l\'Item 3' },
        { title: 'Que deviennent les matériaux détruits?', content: 'Contenu spécifique pour l\'Item 3' }
      ];
    
}
