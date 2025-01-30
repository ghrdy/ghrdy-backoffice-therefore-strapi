import { Component, OnInit, ViewChild, Renderer2 ,HostListener } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select'
import {CdkMenu, CdkMenuItem,CdkContextMenuTrigger, CdkMenuTrigger} from '@angular/cdk/menu';
import { MatMenuModule } from '@angular/material/menu';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatStepperModule, MatStepper} from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ChangeImgButtonDirective } from '../../../directives/img-button/change-img-button.directive';

@Component({
  selector: 'app-devis',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CdkMenuTrigger, CdkMenu, CdkMenuItem,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    CdkMenuModule,
    MatCardModule,
    MatProgressBarModule,
    MatStepperModule,
    MatStepper,
    MatRadioModule,
    FormsModule,
    CdkContextMenuTrigger, CdkMenu, CdkMenuItem,
    ChangeImgButtonDirective
  ],
  templateUrl: './devis.component.html',
  styleUrl: './devis.component.css'
})
export class DevisComponent {


  constructor(private renderer: Renderer2) {}

  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('stepperDrawer') stepperDrawer!: MatDrawer;
  

  
  showFiller = false;

  ngAfterViewInit() {
    // Ajoute ou retire la classe 'no-scroll' en fonction de l'état du drawer
    this.drawer.openedChange.subscribe((isOpened) => {
      if (isOpened) {
        this.disableBodyScroll();
      } else {
        this.enableBodyScroll();
      }
    });
  }

  toggleDrawer() {
    if (this.drawer.opened) {
      this.drawer.close();
    } else {
      this.drawer.open();
    }
  }

  disableBodyScroll() {
    // Ajoute le style overflow: hidden au body pour désactiver le défilement
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  enableBodyScroll() {
    // Supprime le style overflow: hidden du body pour réactiver le défilement
    this.renderer.removeStyle(document.body, 'overflow');
  }

  progressValue = 1;
  
  steps = [
    { label: 'Je sélectionne mon service', img: 'assets/images/home-progress/01.svg' },
    { label: 'Je renseigne mes coordonnées', img: 'assets/images/home-progress/02.svg' },
    { label: 'Je confirme et je signe!', img: 'assets/images/home-progress/03.svg' }
  ];

  stepIcone = [{img: 'assets/images/home-progress/01.svg'}];

  openStepperDrawer() {
    this.drawer.close();
    this.stepperDrawer.open();
  }

  /*selectedOption: string | null = null;

  // Options pour les cartes de l'étape 1
  options = [
    { value: 'option1', label: 'Destruction d’archives', description: 'Papier, documents, dossiers confidentiels'},
    { value: 'option2', label: 'Collecte D3E', description: 'Écrans, unités centrales, ordinateurs et périphériques' },
    { value: 'option3', label: 'Destruction sécurisée de média', description: 'Disque dur, carte mémoire, clé USB' },
  ];*/

  @ViewChild('stepper') stepper!: MatStepper;
  selectedOption: any;


  options = [
    { value: 'option1', label: 'Destruction d’archives', description: 'Papier, documents, dossiers confidentiels'},
    { value: 'option2', label: 'Collecte D3E', description: 'Écrans, unités centrales, ordinateurs et périphériques' },
    { value: 'option3', label: 'Destruction sécurisée de média', description: 'Disque dur, carte mémoire, clé USB' },
  ];

  onStepChange(event: StepperSelectionEvent) {
    const totalSteps = this.stepper.steps.length;
    this.progressValue = ((event.selectedIndex + 1) / totalSteps) * 100;
  }
}
