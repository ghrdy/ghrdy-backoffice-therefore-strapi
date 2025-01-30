import { Directive, ElementRef, HostListener, Input, Renderer2  } from '@angular/core';

@Directive({
  selector: '[appChangeImgButton]',
  standalone: true
})
export class ChangeImgButtonDirective {

  @Input() hoverImageSrc: string = '';
  @Input() defaultImageSrc: string = '';
  @Input() cardIndex: number | null = null;
  
  private hoveredCard: number | null = null;
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Méthode pour changer l'image
  private changeImage(src: string) {
    const imgElement = this.el.nativeElement.querySelector('img.fleche-devis');
    if (imgElement) {
      this.renderer.setAttribute(imgElement, 'src', src);
    }
  }

  // Événement au survol
  @HostListener('mouseover') onMouseOver() {
    this.hoveredCard != this.cardIndex;
    this.changeImage(this.hoverImageSrc);
  }

  // Événement lorsque la souris quitte la carte
  @HostListener('mouseleave') onMouseLeave() {
    this.hoveredCard = null;
    this.changeImage(this.defaultImageSrc);
  }

    // Événement au survol
    @HostListener('mouseover') onMouseOverButton() {
      this.changeImage(this.hoverImageSrc);
    }
  
    // Événement lorsque la souris quitte l'élément
    @HostListener('mouseleave') onMouseLeaveButton() {
      this.changeImage(this.defaultImageSrc);
    }

}
