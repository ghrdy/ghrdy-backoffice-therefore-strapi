import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolutionsComponent } from './components/front-office/solutions/solutions.component';
import { ExpertisesComponent } from './components/front-office/expertises/expertises.component';
import { VisionComponent } from './components/front-office/vision/vision.component';
import { ContactComponent } from './components/front-office/contact/contact.component';
import { HomeComponent } from './components/front-office/home/home.component';
import { DevisComponent } from './components/front-office/devis/devis.component';
import { DestructionComponent } from './components/front-office/destruction/destruction.component';
import { CollecteRecyclageComponent } from './components/front-office/collecte-recyclage/collecte-recyclage.component';
import { DematerialisationComponent } from './components/front-office/dematerialisation/dematerialisation.component';
import { AccompagmentComponent } from './components/front-office/accompagment/accompagment.component';
import { ProceduresInterventionComponent } from './components/front-office/procedures-intervention/procedures-intervention.component';
import { DocumentsTracabiliteComponent } from './components/front-office/documents-tracabilite/documents-tracabilite.component';
import { RecylageValorisationComponent } from './components/front-office/recylage-valorisation/recylage-valorisation.component';
import { SecuriteProtectionComponent } from './components/front-office/securite-protection/securite-protection.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    {
      path:'home',
      children: [
        { path: 'devis', component: HomeComponent }
      ]
    },

    { path: 'solutions', component: SolutionsComponent},
      {
        path:'solutions',
        children: [
          { path: 'destruction-securisee', component: DestructionComponent },
          { path: 'collecte-recyclage', component: CollecteRecyclageComponent },
          { path: 'dematerialisation', component: DematerialisationComponent }
        ]
      },
    
    { path: 'expertises', component: ExpertisesComponent},
    {
      path:'expertises',
      children: [
        { path: 'accompagnement', component: AccompagmentComponent },
        { path: 'procedures-intervention', component: ProceduresInterventionComponent },
        { path: 'documents-tracabilite', component: DocumentsTracabiliteComponent }
      ]
    },
    { path: 'vision', component: VisionComponent},
    {
      path:'vision',
      children: [
        { path: 'recyclage-valorisation', component: RecylageValorisationComponent },
        { path: 'securite-protection', component: SecuriteProtectionComponent }
      ]
    },
    { path: 'contact', component: ContactComponent},
    {path: 'devis', component:DevisComponent}

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
