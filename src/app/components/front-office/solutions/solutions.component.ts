import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeImgButtonDirective } from '../../../directives/img-button/change-img-button.directive';
import {MatCardModule} from '@angular/material/card';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

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

  
  isMobile: boolean = false;

  isExpandedSection1: boolean = false;
  isExpandedSection2: boolean = false;
  isExpandedSection3: boolean = false;

  toggleText(section: number): void {
    if (section === 1) {
      this.isExpandedSection1 = !this.isExpandedSection1;
    } else if (section === 2) {
      this.isExpandedSection2 = !this.isExpandedSection2;
    } else if (section === 3) {
      this.isExpandedSection3 = !this.isExpandedSection3;
    }
  }

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
}
