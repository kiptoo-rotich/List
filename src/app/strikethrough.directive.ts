import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appStrikethrough]'
})
export class StrikethroughDirective {


  constructor(private elem: ElementRef) { }

  @HostListener("click") onClicks(){
    this.textDeco("red");
  }

  @HostListener("dblclick") onDoubleClicks(){
    this.textDeco("blue")
  }

  private textDeco(action: string) {
    this.elem.nativeElement.style.color = action;
  }

}
