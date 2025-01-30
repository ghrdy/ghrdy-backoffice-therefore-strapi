import { Component, OnInit, ViewChild, Renderer2 ,HostListener, OnDestroy} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatStepperModule, MatStepper} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DestructionArchives } from '../../../interfaces/DestructionArchives.interface';
import { CollecteD3E } from '../../../interfaces/CollecteD3E.interface';
import { DestructionMedia } from '../../../interfaces/DestructionMedia.interface';
import { Data } from '../../../interfaces/DataTherefore.interface';
import { Subscription } from 'rxjs';
import { ChangeImgButtonDirective } from '../../../directives/img-button/change-img-button.directive';
import { ApiThereforeService } from '../../../services/api.therefore.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiSpringService } from '../../../services/api.spring.service';
import { ApiSirenService } from '../../../services/api.siren.service';
import { OffresServices } from '../../../models/OffresServices';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormGroup, FormControl, FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressBarModule,
    MatStepperModule,
    MatCheckboxModule,
    ChangeImgButtonDirective,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isMobile: boolean = false;
  isMenuOpen: boolean = false;
  currentParentLink: string = '';

  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('stepperDrawer') stepperDrawer!: MatDrawer;
  @ViewChild('stepper') stepper!: MatStepper;

  progressValueStepper = 0;

  stepTexts = ['Services', 'Coordonnées', 'Récapitulatif'];

  progressValue = 0;
  currentStep = 0;
  subStep = 0;
  currentSubStep: number = 1;
  isRequestSent: boolean = false;

/**
 * Met à jour la valeur de la progression (`progressValue`) en fonction de l'étape courante et des sous-étapes associées.
 * La progression est représentée en pourcentage (de 0 à 100).
 *
 * @function
 * @name updateProgress
 * @memberof ProgressTracker
 * @returns {void}
 *
 * @property {number} currentStep - Étape actuelle du processus (0, 1 ou 2).
 * @property {number} subStep - Sous-étape actuelle dans l'étape 1.
 * @property {number} currentSubStep - Sous-étape actuelle dans l'étape 2.
 * @property {Array<any>} selectedOptions - Options sélectionnées, utilisées pour calculer les sous-étapes
 * dynamiques de l'étape 1.
 * @property {boolean} isRequestSent - Indique si la demande a été envoyée (true) ou non (false).
 * @property {number} progressValue - La valeur actuelle de progression (mise à jour par la fonction).
 */
  updateProgress() {
    const totalProgress = 100; // Barre de progression en pourcentage
    const stepProgressValue = totalProgress / 3;
    const preSubmissionProgress = 90;
  
    if (this.currentStep === 0) {
      // Étape 1 : Inclut les sous-étapes dynamiques et fixes
      const totalSubStepsStep1 = this.selectedOptions.length + 3;
      const step1Progress = (this.subStep / totalSubStepsStep1) * stepProgressValue;
      this.progressValue = Math.min(step1Progress, stepProgressValue);
    } else if (this.currentStep === 1) {
      // Étape 2
      const step2Progress = (this.currentSubStep / 2) * stepProgressValue;
      this.progressValue = stepProgressValue + Math.min(step2Progress, stepProgressValue);
  
      if (this.currentSubStep === 2) {
        const step3PreProgress = stepProgressValue / 2;
        this.progressValue = Math.min(this.progressValue + step3PreProgress, 2 * stepProgressValue);
      }
    } else if (this.currentStep === 2) {
      // Étape 3
      if (!this.isRequestSent) {
        this.progressValue = preSubmissionProgress;
      } else {
        this.progressValue = totalProgress;
      }
    }
  }
  
/**
 * Gère le changement d'étape principale dans le processus. 
 * Vérifie si toutes les sous-étapes nécessaires ont été complétées avant de permettre le passage à l'étape suivante.
 *
 * @function
 * @name onMainStepChange
 * @param {any} event - L'événement déclenché par l'interaction de l'utilisateur.
 * @returns {void}
 *
 * @throws {Error} Affiche un message d'erreur dans la console si l'utilisateur tente de passer à l'étape suivante
 * sans avoir complété toutes les sous-étapes requises.
 *
 * @property {number} subStep - La sous-étape actuelle dans l'étape principale.
 * @property {Array<any>} selectedOptions - Options sélectionnées, influençant le nombre total de sous-étapes à compléter.
 * @property {number} currentStep - L'étape principale actuelle du processus.
 * @method updateProgress - Appelle la fonction pour mettre à jour la progression (`progressValue`) après le changement d'étape.
 */
  onMainStepChange(event: any): void {
    const isLastSubStep = this.subStep === this.selectedOptions.length + 3;
    if (event.selectedIndex === 1 && !isLastSubStep) {
      console.error("Impossible de passer à l'étape suivante avant de compléter toutes les sous-étapes.");
      return;
    }
    // Change l'étape principale
    this.currentStep = event.selectedIndex;
    this.updateProgress();
  }

  formSubmitted = false;
  errorSubStepMessage: string = '';

/**
 * Gère le changement de sous-étape dans le processus en plusieurs étapes.
 * Vérifie les conditions de validation pour chaque sous-étape avant de permettre la transition.
 *
 * @function
 * @name onSubStepChange
 * @param {number} nextSubStep - La sous-étape suivante à atteindre.
 * @param {number} [currentIndex] - (Optionnel) L'index actuel pour vérifier la sélection d'items dans
 * les sous-étapes dynamiques.
 * @returns {void}
 *
 * @property {string} errorMessage - Message d'erreur général affiché si une condition n'est pas respectée.
 * @property {string} errorSubStepMessage - Message d'erreur spécifique aux sous-étapes dynamiques.
 * @property {boolean} formSubmitted - Indique si le formulaire a été soumis ou non.
 * @property {number} subStep - La sous-étape actuelle dans l'étape principale.
 * @property {Array<any>} selectedOptions - Les options sélectionnées, qui influencent les sous-étapes dynamiques.
 * @property {Array<any>} selectedMenuData - Données du menu utilisées pour valider les sélections dynamiques par index.
 * @property {FormGroup} multiStep - Le formulaire multistep contenant les données de chaque étape.
 * @property {number} currentStep - L'étape principale actuelle dans le processus.
 *
 * @method updateSubStep1Validations - Met à jour les validations spécifiques à la sous-étape 1.
 * @method updateSubStep2Validations - Met à jour les validations spécifiques à la sous-étape 2.
 * @method markFormGroupTouched - Marque tous les champs d'un groupe de formulaire comme "touchés" pour forcer la validation.
 * @method markCurrentStepTouched - Marque tous les champs du formulaire de l'étape actuelle comme "touchés" pour
 * forcer la validation.
 * @method updateProgress - Met à jour la progression globale du processus en fonction de la sous-étape actuelle.
 *
 * @throws {Error} Définit les messages d'erreur si les validations échouent :
 * - Si aucune option n'est sélectionnée à la sous-étape 0.
 * - Si aucun item n'est sélectionné dans les sous-étapes dynamiques.
 * - Si des champs obligatoires ne sont pas remplis dans la sous-étape courante.
 */
  onSubStepChange(nextSubStep: number, currentIndex?: number): void {
    this.errorMessage = '';
    this.errorSubStepMessage = '';
    this.formSubmitted = true;

    if (this.subStep === 0) {
      if (this.selectedOptions.length === 0) {
        this.errorMessage = 'Veuillez sélectionner au moins un service avant de continuer.';
        return;
      }
    }
    if (this.subStep > 0 && currentIndex !== undefined) {
      const isItemSelected = this.selectedMenuData[currentIndex].some((row) => row.Selected);
      if (!isItemSelected) {
        this.errorSubStepMessage = 'Veuillez sélectionner au moins un item avant de continuer.';
        return;
      }
    }
    this.updateSubStep1Validations();
    this.updateSubStep2Validations();

    const currentStepGroup = this.multiStep.get(`steppe${this.currentStep + 1}`) as FormGroup;
    if (this.subStep > 0 && currentStepGroup?.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires avant de continuer.';
      this.markFormGroupTouched(currentStepGroup);
      return;
    }
    if (this.subStep > 0 && currentStepGroup?.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires avant de continuer.';
      this.markCurrentStepTouched();
      return;
    }
    if (nextSubStep <= this.selectedOptions.length + 3) {
      this.subStep = nextSubStep;
      this.formSubmitted = false; 
    }
    this.updateProgress();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
    
  markCurrentStepTouched(): void {
    const currentStepGroup = this.multiStep.get(`steppe${this.currentStep + 1}`) as FormGroup;
    if (currentStepGroup) {
      Object.keys(currentStepGroup.controls).forEach((controlName) => {
        const control = currentStepGroup.get(controlName);
        if (control instanceof FormGroup) {
          // Marque tous les champs imbriqués comme touchés
          Object.keys(control.controls).forEach((subControlName) => {
            control.get(subControlName)?.markAsTouched();
          });
        } else {
          control?.markAsTouched();
        }
      });
    }
  }
    
/**
 * Passe à la sous-étape suivante ou, si toutes les sous-étapes actuelles sont terminées, à l'étape principale suivante.
 * Valide les champs obligatoires avant la transition et met à jour la progression.
 *
 * @function
 * @name nextSubStep
 * @returns {void}
 *
 * @property {string} errorMessage - Message d'erreur affiché si les champs obligatoires ne sont pas remplis.
 * @property {boolean} formSubmitted - Indique si le formulaire a été soumis ou non.
 * @property {number} currentSubStep - La sous-étape actuelle dans l'étape principale.
 * @property {number} currentStep - L'étape principale actuelle dans le processus.
 * @property {FormGroup} multiStep - Le formulaire multistep contenant les données de chaque étape.
 *
 * @method getTotalSubStepsForCurrentStep - Récupère le nombre total de sous-étapes pour l'étape actuelle.
 * @method updateStep2Validations - Applique les validations spécifiques à l'étape 2.
 * @method contactInterventionValidations - Applique les validations spécifiques liées au contact et à l'intervention.
 * @method markFormGroupTouched - Marque tous les champs d'un groupe de formulaire comme "touchés" pour forcer la validation.
 * @method updateProgress - Met à jour la progression globale du processus en fonction de la sous-étape ou de l'étape actuelle.
 *
 * @throws {Error} Définit les messages d'erreur ou affiche une erreur dans la console si :
 * - Aucun groupe de formulaire correspondant n'est trouvé pour l'étape actuelle.
 * - Les champs obligatoires ne sont pas remplis dans la sous-étape actuelle.
 */
  nextSubStep(): void {
    this.errorMessage = '';
    this.formSubmitted = true;
    const totalSubStepsForCurrentStep = this.getTotalSubStepsForCurrentStep();
    const currentStepGroup = this.multiStep.get(`steppe${this.currentStep+1}`) as FormGroup;

    if (!currentStepGroup) {
      console.error(`Aucun groupe de formulaire trouvé pour steppe${this.currentStep}`);
      return;
    }
    this.updateStep2Validations();
    this.contactInterventionValidations();

    if (currentStepGroup.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires avant de continuer.';
      this.markFormGroupTouched(currentStepGroup);
      return;
    }
    if (this.currentSubStep < totalSubStepsForCurrentStep) {
      this.currentSubStep++;
      this.formSubmitted = false;
      this.updateProgress();
    }
    else if (this.currentStep < 3) {
      this.currentStep++;
      this.currentSubStep = 1;
      this.formSubmitted = false;
      this.updateProgress();
    }
  }

  private getTotalSubStepsForCurrentStep(): number {
    switch (this.currentSubStep) {
      case 1:
        return 2; // Étape 1 : 2 sous-étapes
      case 2:
        return 2; // Étape 2 : 2 sous-étapes (ou plus si nécessaire)
      default:
        return 0; // Par défaut, aucune sous-étape
    }
  }

  getFormErrors(group: FormGroup): string[] {
    const errors: string[] = [];
    Object.keys(group.controls).forEach((key) => {
      const control = group.get(key);
      if (control && control.invalid) {
        errors.push(`${key} est invalide. Erreurs: ${JSON.stringify(control.errors)}`);
      }
    });
    return errors;
  }
      
  isCurrentSubStepValid(): boolean {
    return true;
  }

  /*sendRequest() {
    // Simuler l'envoi de la demande
    this.isRequestSent = true; // Marquer la demande comme envoyée
    this.updateProgress(); // Mettre à jour la progression
    console.log('Formulaire envoyé. Progression finale :', this.progressValue)
  }*/

  onSubmit(): void {
    this.formSubmitted = true;
    console.log('Données du formulaire :', this.multiStep.value);
    if (this.currentStep >= 3 && this.multiStep.get('steppe3.receiveDevisOption')?.invalid) {
      console.error('Erreur : receiveDevisOption est invalide.');
      return;
    }
    if (this.multiStep.invalid) {
      console.error('Formulaire invalide. Voici les erreurs :', this.getFormValidationErrors());
      return;
    }
    // Si le formulaire est valide
    this.isRequestSent = true;
    console.log('Formulaire envoyé avec succès !');
    console.log('Données du formulaire :', this.multiStep.value);
    this.updateProgress();
  }

    
  getFormValidationErrors(): string[] {
    const errors: string[] = [];
    Object.keys(this.multiStep.controls).forEach((key) => {
      const control = this.multiStep.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((subKey) => {
          const subControl = control.get(subKey);
          if (subControl && subControl.invalid) {
            errors.push(`${key}.${subKey} est invalide. Erreurs: ${JSON.stringify(subControl.errors)}`);
          }
        });
      } else if (control && control.invalid) {
        errors.push(`${key} est invalide. Erreurs: ${JSON.stringify(control.errors)}`);
      }
    });
    return errors;
  }
    
  goBack() {
    if (this.isBackDisabled) {
      this.showBackWarning = true;
      return;
    }
    // Réinitialiser le message si le bouton est actif
    this.showBackWarning = false;
    if (this.currentStep === 2) {
      // Gestion des sous-étapes de l'étape 3
      if (this.isRequestSent) {
        // Retour au récapitulatif si on est sur la confirmation
        this.isRequestSent = false;
      } else {
        // Retour à l'étape précédente
        this.currentStep--;
      }
    } else if (this.currentStep === 1) {
      // Gestion des sous-étapes de l'étape 2
      if (this.currentSubStep > 0) {
        this.currentSubStep--;
      } else {
        this.currentStep--;
      }
    } else if (this.currentStep === 0) {
      // Gestion des sous-étapes de l'étape 1
      if (this.subStep > 0) {
        this.subStep--;
      }
    }
    this.updateProgress();
  }

  selectedOption: string = '';
  selectedOptions: any[] = [];
  selectedServices: string[] = [];

  private subscription: Subscription = new Subscription();

  data: Data[] = [];
  listOffresServices: OffresServices[] = [];

  dataCollecteD3E: CollecteD3E[] = [];
  dataDestructionArchives: DestructionArchives[] = [];
  dataDestructionMedia: DestructionMedia[] = [];

  rechercheSiren!: FormGroup;
  sirenInfo: any = null;
  errorMessage: string | null = null;

  selectedRowsDestructionArchives: DestructionArchives[] = [];
  selectedRowsCollecteD3E: CollecteD3E[] = [];
  selectedRowsDestructionMedia: DestructionMedia[] = [];

  totalPrice: number = 0;
  isAddressSame: boolean = true;
  isContactSame: boolean = true;
  formLieuIntervention!: FormGroup;
  formGroup!: FormGroup;
  multiStep!: FormGroup;
  sirenForm!: FormGroup;

  lieuxStockageList= ['Rez-de-chaussée', 'étage 1', 'étage 2', 'étage 3', 'étage 4'];
  accesLocauxList: string[] = ['Parking privé', 'Quai de livraison', 'Place de livraison', 'Stationnement rue'];
  accessibilteList: string[] = ['Ascenseur', 'Monte-charge', 'Escalier'];

  constructor(private breakpointObserver: BreakpointObserver,
    private apiThereforeService: ApiThereforeService,
    private apiSpringService: ApiSpringService,
    private renderer: Renderer2,
    private http: HttpClient,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset,
      '(max-width: 768px)', // Mobile
      '(min-width: 769px) and (max-width: 1024px)' //Tablette
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });

    this.initForm(); //Initialisation du formulaire

    // Souscrire à l'observable et gérer les résultats
    this.subscription.add(
      this.apiThereforeService.GetCollecteD3E().subscribe({
        next: (data) => {
          this.dataCollecteD3E = data.QueryResult.ResultRows.map((row: any) => ({ ...row, Selected: false, units: 0}));
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du document:', error);

          if (error instanceof HttpErrorResponse) {
            console.error('Statut de l\'erreur HTTP:', error.status);
            console.error('Message d\'erreur:', error.message);
            console.error('Réponse serveur complète:', error.error);
          }
        }
      })
    );

    // Souscrire à l'observable et gérer les résultats
    this.subscription.add(
      this.apiThereforeService.GetDestructionArchives().subscribe({
        next: (data) => {
          this.dataDestructionArchives = data.QueryResult.ResultRows.map((row: any) => ({ ...row, Selected: false, units: 0 }));
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du document:', error);

          if (error instanceof HttpErrorResponse) {
            console.error('Statut de l\'erreur HTTP:', error.status);
            console.error('Message d\'erreur:', error.message);
            console.error('Réponse serveur complète:', error.error);
          }
        }
      })
    );

    // Souscrire à l'observable et gérer les résultats
    this.subscription.add(
      this.apiThereforeService.GetDestructionMedia().subscribe({
        next: (data) => {
          this.dataDestructionMedia = data.QueryResult.ResultRows.map((row: any) => ({ ...row, Selected: false, units: 0 }));
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du document:', error);
  
          if (error instanceof HttpErrorResponse) {
            console.error('Statut de l\'erreur HTTP:', error.status);
            console.error('Message d\'erreur:', error.message);
            console.error('Réponse serveur complète:', error.error);
          }
        }
      })
    );
    this.loadDataWithApiKey();
  }

  

  private initForm(): void {
  //Si des données existantes sont disponibles, initialisez-les
  const existingServices = this.selectedOptions || [];
  const controls = this.options.map(option =>
    this.fb.control(existingServices.includes(option.value))
  );
    this.multiStep = this.fb.group({
      steppe1: this.fb.group({
        arrayServices:  this.fb.array(controls),
        nbItems: new FormControl(''),
        adresseInterv: new FormControl('', [Validators.required]),
        codePostal: new FormControl(''),
        ville: new FormControl('', [Validators.required]),
        interventionDate: new FormControl('', [Validators.required]),
        lieuxStockage: this.fb.array([], [Validators.required]),
        accesEntreprise: new FormControl('', [Validators.required]),
        conditionAcces: new FormControl('', [Validators.required]),
        accessibilte: new FormControl('', [Validators.required]),
        ajoutAdresse: new FormControl(false),
        codePostalPlus: [''],
        villePlus: [''],
        nomContact: new FormControl('', [Validators.required]),
        prenomContact: new FormControl('', [Validators.required]),
        mailContact: new FormControl('', [Validators.required, Validators.email]),
        mobileContact: new FormControl('', [
          Validators.required,
          Validators.pattern('^\\+?[0-9]{10,15}$')
        ]), 
        msgTextarea: new FormControl(null),
      }),
      steppe2: this.fb.group({
        siren: [''],
        isAddressSame: new FormControl(true),
        companyAddress: [''],
        postalCode: [''],
        city:[''],
        isContactSame: new FormControl(true),
        nomContact2:new FormControl(''),
        prenomContact2:new FormControl(''),
        emailContact2:new FormControl(''),
        telContact2:new FormControl(''),
      }),
      steppe3: this.fb.group({
        receiveDevisOption: this.fb.control('', Validators.required),
      })
    });
    this.initializeServiceData();
  }

  private updateSubStep1Validations(): void {
    const steppe1Group = this.multiStep.get('steppe1') as FormGroup;
    const adresseInterv = steppe1Group.get('adresseInterv');
    const codePostal = steppe1Group.get('codePostal');
    const ville = steppe1Group.get('ville');
    const interventionDate = steppe1Group.get('interventionDate');
    const conditionAcces = steppe1Group.get('conditionAcces');
    const accessibilte = steppe1Group.get('accessibilte');

    if (this.subStep === this.selectedOptions.length + 1) {
      // Ajouter Validators.required uniquement quand pertinent
      adresseInterv?.setValidators(Validators.required);
      codePostal?.setValidators([Validators.required, Validators.pattern('^[0-9]{5}$')]);
      ville?.setValidators(Validators.required);
      interventionDate?.setValidators(Validators.required);
      conditionAcces?.setValidators(Validators.required);
      accessibilte?.setValidators(Validators.required);
    } else {
      // Supprimer les validateurs sinon
      adresseInterv?.clearValidators();
      codePostal?.clearValidators();
      ville?.clearValidators();
      interventionDate?.clearValidators();
      conditionAcces?.clearValidators();
      accessibilte?.clearValidators();
    }
    // Mettre à jour l'état du champ
    adresseInterv?.updateValueAndValidity();
    codePostal?.updateValueAndValidity();
    ville?.updateValueAndValidity();
    interventionDate?.updateValueAndValidity();
    conditionAcces?.updateValueAndValidity();
    accessibilte?.updateValueAndValidity();
    this.updateLieuxStockageValidation();
    this.updateAccesEntrepriseValidation();
    this.toggleAddressValidators();
  }

  //validation adresse
  toggleAddressValidators(): void {
    const steppe1Group = this.multiStep.get('steppe1') as FormGroup;
    const ajoutAdresse = steppe1Group.get('ajoutAdresse')?.value;
    const codePostalPlus = steppe1Group.get('codePostalPlus');
    const villePlus = steppe1Group.get('villePlus');
    if (ajoutAdresse) {
      // Ajouter les validateurs si la checkbox est cochée
      codePostalPlus?.setValidators([Validators.required, Validators.pattern('^[0-9]{5}$')]);
      villePlus?.setValidators([Validators.required]);
    } else {
      // Supprimer les validateurs si la checkbox est décochée
      codePostalPlus?.clearValidators();
      villePlus?.clearValidators();
    }
    // Mettre à jour l'état des contrôles
    codePostalPlus?.updateValueAndValidity();
    villePlus?.updateValueAndValidity();
  }

  //Sous-etape 1 de l'étape 2 adresse d'intervention
  adresseInterventionValidations(): void {
    const steppe2 = this.multiStep.get('steppe2') as FormGroup;
    const isAddressSame = steppe2.get('isAddressSame')?.value;
    const companyAddress = steppe2.get('companyAddress');
    const postalCode = steppe2.get('postalCode');
    const city = steppe2.get('city');
  
    if (isAddressSame) {
      // Si l'adresse est la même, désactive les champs et supprime leurs validateurs
      companyAddress?.clearValidators();
      postalCode?.clearValidators();
      city?.clearValidators();

      companyAddress?.disable();
      postalCode?.disable();
      city?.disable();
    } else {
      // Si l'adresse n'est pas la même, active les champs et applique les validateurs
      companyAddress?.setValidators([Validators.required]);
      postalCode?.setValidators([Validators.required, Validators.pattern('^[0-9]{5}$')]);
      city?.setValidators([Validators.required]);

      companyAddress?.enable();
      postalCode?.enable();
      city?.enable();
    }
    // Met à jour l'état des validateurs
    companyAddress?.updateValueAndValidity();
    postalCode?.updateValueAndValidity();
    city?.updateValueAndValidity();
  }

  //Etape 2 coordonnées
  private updateStep2Validations(): void {
    const steppe2Group = this.multiStep.get('steppe2') as FormGroup;
    const siren = steppe2Group.get('siren');
    if (this.currentSubStep === 1) {
      siren?.setValidators([Validators.required, Validators.pattern('^[0-9]{9}$')]);
    } else {
      siren?.clearValidators();
    }
    siren?.updateValueAndValidity();
    this.adresseInterventionValidations();
  }
    
  //contact d'intervention
  contactInterventionValidations(): void {
    const steppe2 = this.multiStep.get('steppe2') as FormGroup;
    // Vérifiez si la sous-étape actuelle est la sous-étape 2
      const isContactSame = steppe2.get('isContactSame')?.value;
      if (this.currentSubStep === 2) {
      const nomContact2 = steppe2.get('nomContact2');
      const prenomContact2 = steppe2.get('prenomContact2');
      const emailContact2 = steppe2.get('emailContact2');
      const telContact2 = steppe2.get('telContact2');
    
      if (isContactSame) {
        // Si le contact est le même, désactive les champs et supprime leurs validateurs
        nomContact2?.clearValidators();
        prenomContact2?.clearValidators();
        emailContact2?.clearValidators();
        telContact2?.clearValidators();
      } else {
        // Si le contact n'est pas le même, active les champs et applique les validateurs
        nomContact2?.setValidators([Validators.required]);
        prenomContact2?.setValidators([Validators.required]);
        emailContact2?.setValidators([Validators.required, Validators.email]);
        telContact2?.setValidators([
          Validators.required,
          Validators.pattern('^\\+?[0-9]{10,15}$'),
        ]);
      }
      // Met à jour l'état des validateurs
      nomContact2?.updateValueAndValidity();
      prenomContact2?.updateValueAndValidity();
      emailContact2?.updateValueAndValidity();
      telContact2?.updateValueAndValidity();
    }
  }
    
  private updateSubStep2Validations(): void {
    const steppe1Group = this.multiStep.get('steppe1') as FormGroup;
    const nomContact = steppe1Group.get('nomContact');
    const prenomContact = steppe1Group.get('prenomContact');
    const mailContact = steppe1Group.get('mailContact');
    const mobileContact = steppe1Group.get('mobileContact');

    if (this.subStep === this.selectedOptions.length + 2) {
      nomContact?.setValidators(Validators.required);
      prenomContact?.setValidators(Validators.required);
      mailContact?.setValidators([Validators.required, Validators.email]);
      mobileContact?.setValidators([
        Validators.required,
        Validators.pattern('^\\+?[0-9]{10,15}$'),
      ]);
    } else {
      nomContact?.clearValidators();
      prenomContact?.clearValidators();
      mailContact?.clearValidators();
      mobileContact?.clearValidators();
    }
    nomContact?.updateValueAndValidity();
    prenomContact?.updateValueAndValidity();
    mailContact?.updateValueAndValidity();
    mobileContact?.updateValueAndValidity();
  }
  
  private updateLieuxStockageValidation(): void {
    const lieuxStockage = this.multiStep.get('steppe1.lieuxStockage') as FormArray;
    if (this.subStep === this.selectedOptions.length + 1) {
      lieuxStockage.setValidators([Validators.required]);
    } else {
      lieuxStockage.clearValidators();
    }
    lieuxStockage.updateValueAndValidity();
  }
  
  private updateAccesEntrepriseValidation(): void {
    const accesEntreprise = this.multiStep.get('steppe1.accesEntreprise');
    if (this.subStep === this.selectedOptions.length + 1) {
      accesEntreprise?.setValidators(Validators.required);
    } else {
      accesEntreprise?.clearValidators();
    }
    accesEntreprise?.updateValueAndValidity();
  }
  
  get arrayServices(): FormArray {
    return this.multiStep.get('steppe1.arrayServices') as FormArray;
  }
  
  // Gère les changements de sélection
  onSelectionChange(event: MatSelectChange) {
    const lieuxStockageArray = this.multiStep.get('steppe1.lieuxStockage') as FormArray;
    // Réinitialiser les valeurs sélectionnées
    lieuxStockageArray.clear();
    // Ajouter chaque lieu sélectionné au FormArray
    event.value.forEach((lieu: string) => {
      lieuxStockageArray.push(new FormControl(lieu));
    })
  }

  updateSelectedServices(row: any) {
    const arrayServices = this.multiStep.get('steppe1.arrayServices') as FormArray;
    if (row.Selected) {
      // Ajouter au formulaire
      arrayServices.push(
        new FormGroup({
          serviceName: new FormControl(row.IndexValues[1]),
          prix: new FormControl(row.IndexValues[3]),
          units: new FormControl(row.units),
        })
      );
    } else {
      // Supprimer du formulaire
      const index = arrayServices.controls.findIndex(
        (control) => control.value.serviceName === row.IndexValues[1]
      );
      if (index !== -1) {
        arrayServices.removeAt(index);
      }
    }
  }

  // Vérifier si au moins un item est sélectionné
  isAtLeastOneItemSelected(index: number): boolean {
    return this.selectedMenuData[index].some((row) => row.Selected);
  }
  onUnitsChange(row: any, service: any): void {
    // Validation : s'assurer que row.units est un entier >= 0
    if (row.units === null || row.units === undefined || row.units < 0) {
      row.units = 0; // Valeur minimale
    }
    console.log(`Units changed manually for row:`, row, `Service:`, service);
    this.updateSelectedServiceInForm(service, this.selectedMenuData[this.selectedOptions.indexOf(service)]);
  }
  
  incrementUnits(row: any, service: string): void {
    setTimeout(() => {
      row.units = (row.units || 0) + 1;
      row.Selected = true;
      this.updateSelectedServiceInForm(service, this.selectedMenuData[this.selectedOptions.indexOf(service)]);
    });
  }
  
  decrementUnits(row: any, service: string): void {
    setTimeout(() => {
      if (row.units > 0) {
        row.units -= 1;
        if (row.units === 0) {
          row.Selected = false;
        }
        this.updateSelectedServiceInForm(service, this.selectedMenuData[this.selectedOptions.indexOf(service)]);
      }
    });
  }
  
  updateUnitsInForm(row: any) {
    const arrayServices = this.multiStep.get('steppe1.arrayServices') as FormArray;
    const index = arrayServices.controls.findIndex(
      (control) => control.value.serviceName === row.IndexValues[1]
    );

    if (index !== -1) {
      // Mettre à jour les unités dans le formulaire
      arrayServices.at(index).patchValue({ units: row.units });
    }
  }

  toggleRowSelection(row: any, service: string) {
    row.Selected = !row.Selected;
    this.updateSelectedServiceInForm(service, this.selectedMenuData[this.selectedOptions.indexOf(service)]);
  }

  // Méthode pour charger des données à partir du backend avec la clé d'API
  loadDataWithApiKey(): void{
    /*this.apiSpringService.getDataWithApiKey('/home').subscribe({
      next: (data:OffresServices[]) => {
        this.listOffresServices = data;
        console.log('Données:', data);
      },
      error: (erro) => {
        console.error('Failed to load data:', erro);
      }
    });*/
  }

/**
 * Gère la sélection d'un fichier par l'utilisateur à partir d'un élément `<input>` de type fichier.
 * Utilise un `FileReader` pour lire le contenu du fichier sélectionné et met à jour la propriété `srcResult`
 * avec son résultat.
 *
 * @function
 * @name onFileSelected
 * @returns {void}
 *
 * @property {any} srcResult - Contient le résultat du fichier lu, mis à jour après la sélection.
 *
 * @throws {Error} Affiche une erreur dans la console si l'élément d'entrée du fichier n'existe pas ou si le fichier
 * n'est pas lisible.
 */
  srcResult!:"";
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
    
  //Toggle pour le menu mobile
  toggleIcon(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Gestion des sous-menus dans le menu mobile
  openSolutionsSubLinks(): void {
    this.currentParentLink = 'solutions';
  }
  openExpertisesSubLinks(): void {
    this.currentParentLink = 'expertises';
  }
  openVisionSubLinks(): void {
    this.currentParentLink = 'vision';
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
  
  closeSubLinks(): void {
    this.currentParentLink = '';
  }

  // Fermer le menu si l'utilisateur clique en dehors
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
      this.closeMenu();
    }
  }

  ngAfterViewInit() {
    // Abonnez-vous aux événements openedChange des deux drawers
    this.drawer.openedChange.subscribe(() => this.toggleBodyScroll());
    this.stepperDrawer.openedChange.subscribe(() => this.toggleBodyScroll());
  }
  
  toggleBodyScroll() {
    if (this.drawer.opened || this.stepperDrawer.opened) {
      this.disableBodyScroll();
    } else {
      this.enableBodyScroll();
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

  toggleDrawer() {
    if (this.drawer.opened) {
      this.drawer.close();
    } else {
      this.drawer.open();
    }
  }
  
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
    
  options = [
    {
      label: 'Destruction archives',
      description: 'Papier, documents, dossiers confidentiels',
      value: 'destructionArchives'
    },
    {
      label: 'Collecte D3E',
      description: 'Écrans, unités centrales, ordinateurs et périphériques',
      value: 'collecteD3E'
    },
    {
      label: 'Destruction sécurisée de média',
      description: 'Disque dur, carte mémoire, clé USB',
      value: 'destructionMedia'
    }
  ];

  getSelectedOptionLabel(): string | null {
    const selected = this.options.find(option => option.value === this.selectedOption);
    return selected ? selected.label : null;
  }

  getFutureStepIcon(index: number): string {
    const futureIcons = [
      'assets/images/home-progress/02.svg', 
      'assets/images/home-progress/03.svg'
    ];
    return futureIcons[index - 1] || 'assets/images/icones/check.png';
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  selectService(event: Event, row: any) {
    row.Selected = !row.Selected;
    event.stopPropagation();
  }

  handleError(error: any): void {
    console.error('Erreur lors de la récupération du document:', error);
    if (error instanceof HttpErrorResponse) {
    }
  }

  selectRow(row: any) {
    row.Selected = !row.Selected;
  }

  toggleOptionSelection(index: number): void {
    const control = this.arrayServices.at(index);
    control.setValue(!control.value); // Basculer la case à cocher
    // Met à jour `selectedOptions`
    this.selectedOptions = this.options.filter((_, i) => this.arrayServices.at(i).value);
    this.errorMessage = '';
    this.updateSelectedOptions();
  }
  
  updateSelectedOptions(): void {
    this.selectedOptions = this.options
      .filter((_, index) => this.arrayServices.at(index).value)
      .map(option => option.value);
    this.initializeServiceData(); // Mettre à jour les données pour les sous-étapes dynamiques
  }
  
  // Données par service
  selectedMenuData: any[][]=[];

  goToNextStep(stepper: MatStepper): void {
    this.subStep += 1;
    stepper.next();
  }

  getOptionLabel(serviceValue: string): string | null {
    const selected = this.options.find(option => option.value === serviceValue);
    return selected ? selected.label : null;
  }

  initializeServiceData() {
    this.selectedMenuData = this.selectedOptions.map(option => {
      switch (option) {
        case 'destructionArchives':
          return this.dataDestructionArchives;
        case 'collecteD3E':
          return this.dataCollecteD3E;
        case 'destructionMedia':
          return this.dataDestructionMedia;
        default:
          return [];
      }
    });
  }
 
  get steppe1Data() {
    return this.multiStep.get('steppe1')?.value || {};
  }
    
  get steppe2Data() {
    return this.multiStep.get('steppe2')?.value || {};
  }

  calculateGlobalTotal(): number {
    const arrayServices = this.multiStep.get('steppe1.arrayServices')!.value;
    if (!arrayServices || arrayServices.length === 0) return 0;
  
    return arrayServices.reduce((globalTotal: number, service: any) => {
      if (!service.selectedItems) return globalTotal;
      const serviceTotal = service.selectedItems.reduce(
        (total: number, item: any) => total + (item.units * item.prix),
        0
      );
      return globalTotal + serviceTotal;
    }, 0);
  }

/**
 * Met à jour les données d'un service sélectionné dans un formulaire dynamique.
 * Ajoute, met à jour ou supprime les informations d'un service dans le tableau de services selon les éléments sélectionnés.
 *
 * @function
 * @name updateSelectedServiceInForm
 * @param {string} service - Nom du service sélectionné.
 * @param {any[]} rows - Liste des éléments (lignes) associés au service, contenant les informations sélectionnées.
 * @returns {void}
 *
 * @property {FormArray} arrayServices - Tableau dynamique contenant les services sélectionnés et leurs données.
 *
 * @throws {Error} Aucun throw explicite, mais des erreurs peuvent se produire si `multiStep` ou ses propriétés sont mal configurées.
 */
    
  updateSelectedServiceInForm(service: string, rows: any[]) {
    const arrayServices = this.multiStep.get('steppe1.arrayServices') as FormArray;
    // Vérifier si le service est déjà présent
    const existingServiceIndex = arrayServices.controls.findIndex(
      (control) => control.value?.serviceName === this.getOptionLabel(service)
    );
  
    const selectedRows = rows.filter(row => row.Selected && row.units > 0);
    if (selectedRows.length > 0) {
      const serviceData = {
        serviceName: this.getOptionLabel(service),
        selectedItems: selectedRows.map(row => ({
          name: row.IndexValues[1],
          prix: parseFloat(row.IndexValues[3]),
          units: row.units
        }))
      };
  
      if (existingServiceIndex === -1) {
        // Ajouter le service s'il n'existe pas
        arrayServices.push(new FormControl(serviceData));
      } else {
        // Mettre à jour les données si le service existe déjà
        arrayServices.at(existingServiceIndex).setValue(serviceData);
      }
    } else if (existingServiceIndex !== -1) {
      // Supprimer le service s'il n'a plus d'éléments sélectionnés
      arrayServices.removeAt(existingServiceIndex);
    }
    this.multiStep.get('steppe1')!.patchValue({ arrayServices: arrayServices.value });
  }

  isBackDisabled: boolean = false;
  showBackWarning: boolean = false;

  // Navigue à la première sous-étape de l'étape 1
  goToFirstSubStep(): void {
    this.stepper.selectedIndex = 0;
    this.subStep = 0;
  }

  goToSndSubStep(): void {
    this.stepper.selectedIndex = 1;
    this.subStep = 1;
    this.isBackDisabled = true;
  }

  goToPremetreInterventionStep(): void {
    const perimInterStep = this.selectedOptions.length + 1;
    this.stepper.selectedIndex = 0;
    this.subStep = perimInterStep;
    this.isBackDisabled = true;
  }

  goToTextareaSubStep(): void {
    const thirdSubStepIndex = this.selectedOptions.length + 3;
    this.stepper.selectedIndex = 0;
    this.subStep = thirdSubStepIndex;
    this.isBackDisabled = true;
  }

  addService() {
    const arrayServices = this.multiStep.get('steppe1.arrayServices') as FormArray;
    arrayServices.push(new FormControl(''));
  }

  onSelectOption(option: string) {
    const steppe3Group = this.multiStep.get('steppe3') as FormGroup;
    steppe3Group.get('receiveDevisOption')?.setValue(option);
    steppe3Group.get('receiveDevisOption')?.updateValueAndValidity();
  }
}