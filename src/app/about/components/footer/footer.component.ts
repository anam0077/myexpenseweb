import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer-about',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  test : Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
