import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChangeImgButtonDirective } from '../../../directives/img-button/change-img-button.directive';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-expertises',
  standalone: true,
  imports: [ MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './expertises.component.html',
  styleUrl: './expertises.component.css'
})
export class ExpertisesComponent {

  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

      ngOnInit(): void {
        this.breakpointObserver.observe([Breakpoints.Handset,
          '(max-width: 768px)', // Mobile
          '(min-width: 769px) and (max-width: 1024px)' //Tablette
        ]).subscribe(result => {
          this.isMobile = result.matches;
        });
      }

  progressValue = 1;

  stepTexts = [
    {label: 'Expertise #1'},
    {label: 'Expertise #2'}, 
    {label: 'Expertise #3'}
  ];

  steps = [
    { label: 'Expertise #1',
      stepTitre:'Accompagnement et Satisfaction client', 
      texte: `Les enjeux environnementaux sont cruciaux et se manifestent de plusieurs manières.
      Tout d'abord, Destruction et Digitalisation s'engage à minimiser l'impact écologique de ses
      opérations en s'assurant que tous les matériaux détruits, qu'il s'agisse de papier, de plastiques
      ou de composants électroniques, sont recyclés de manière responsable.

      Nous adoptons des pratiques durables, telles que la réduction des déchets et la réutilisation des matériaux
      lorsque cela est possible.

      En sensibilisant nos clients à l'importance de la destruction sécurisée et responsable, nous contribuons également 
      à la protection de l'environnement tout en respectant les normes légales en matière de gestion des déchets.`
    },
    { label: 'Expertise #2',
      stepTitre:'Procédures et sécurité',
      texte:` Le respect des procédures, élément clé de la qualité de nos prestations et garantir votre confiance
      
      En tant que fournisseur de confiance de services fortement réglementés, le maintien des plus hauts niveaux d’intégrité 
      et d’éthique d’entreprise est un élément important de la culture de D&D.

      En effet, nous appliquons lors de nos interventions des mesures de sécurité strictes en vue de protéger vos données 
      confidentielles et sensibles.
      Quel que soit le support où sont logés vos données (papier, médias, disques durs etc.), elles sont détruites en tout 
      sécurité selon les normes en vigueur (DIN 66399)
      L'ensemble des documents de traçabilité, dont le certificat de destruction, vous seront remis après notre intervention.
      Ces documents vous garantissent la destruction effective, définitive et irréversible de vos informations ainsi que
       l'acheminement auprès d'un organisme agréé de recyclage. Découvrez nos services de destruction d'archives, 
       de destruction D3E, médias et supports spécifiques.`
    },
    { label: 'Expertise #3',
      stepTitre:'Éthique et innovation',
      texte: ` D&D une entreprise responsable
            L’intégrité est notre boussole, de ce fait nous exigeons de nos équipes et de nos partenaires de connaître, maîtriser et
            respecter les lois, règles et réglementations en vigueur.
            Par ailleurs, chez D&D nous sommes intimement animés d'être un acteur vertueux que ce soit dans la réduction de 
            l'impact environnemental, mais également de la sécurité des données confidentielles et sensibles.
            Deux enjeux majeurs de notre temps qui font échos à nos valeurs et notre charte d'entreprise.
            
            D&D une entreprise innovante
            Nous sommes une structure à taille humaine qui porte l'innovation dans son ADN. C'est pourquoi nous favorisons les 
            initiatives innovantes au sein de nos équipes ainsi qu'avec nos partenaires pour vous proposer des services et un 
            accompagnement de grande qualité.`
    }
  ];


  stepIcone = [{img: 'assets/images/home-progress/01.svg'}];

  updateProgress(stepIndex: number) {
    this.progressValue = stepIndex * 20;
  }


}
