import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: 'app-brand-slider',
  templateUrl: 'brand-slider.component.html',
  styleUrl: 'brand-slider.component.scss'
})
export class BrandSliderComponent {
  // @ViewChild('slider', { static: false }) slider!: ElementRef<HTMLDivElement>;
  // brandData = [
  //   { image_url: '/assets/images/header-image.jpg' },
  //   { image_url: 'header-image.jpg' },
  //   { image_url: 'header-image.jpg' },
  // ];

  // ngAfterViewInit(): void {
  //   const slider = this.slider.nativeElement;
  //   const firstClone = slider.firstElementChild?.cloneNode(true);
  //   if (firstClone) {
  //     slider.appendChild(firstClone);
  //   }

  //   let scrollAmount = 0;
  //   const scrollSpeed = 2;

  //   const scroll = () => {
  //     scrollAmount += scrollSpeed;
  //     if (scrollAmount >= slider.scrollWidth / 2) {
  //       scrollAmount = 0;
  //     }
  //     slider.style.transform = `translateX(-${scrollAmount}px)`;
  //     requestAnimationFrame(scroll);
  //   };

  //   scroll();
  // }
}
