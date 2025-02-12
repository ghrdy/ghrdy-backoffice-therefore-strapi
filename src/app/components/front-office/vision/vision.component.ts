import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeImgButtonDirective } from '../../../directives/img-button/change-img-button.directive';
import {MatCardModule} from '@angular/material/card';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [CommonModule,
    ChangeImgButtonDirective,
    MatCardModule
  ],
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.css'
})
export class VisionComponent {
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

}
