import { Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent{

widthChange=false;

ngOnInit(): void {
  
this.onResizeWidth();
}

body = document.getElementsByTagName('body')[0];


@HostListener('window:resize', ['$event'])
 onResize(event) {
  this.onResizeWidth();
}


onResizeWidth(){
  if ($(window).width() > 991) {
     document.getElementById('bd').classList.remove('main-panel');
    this.widthChange=false;
  } else{
    document.getElementById('bd').classList.add('main-panel');
    this.widthChange=true;
  }
}

 
  
}
