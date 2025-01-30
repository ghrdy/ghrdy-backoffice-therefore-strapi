import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeImgButtonDirective } from '../../../directives/img-button/change-img-button.directive';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ChangeImgButtonDirective,
    MatCardModule
  ],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.css'
})
export class SolutionsComponent {


}
