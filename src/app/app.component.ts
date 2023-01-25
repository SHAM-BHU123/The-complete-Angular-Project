import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedFeature = 'reciepe';
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
  ngOnInit(): void {
    console.log(`This is the execuation of ngOnInit`);
  }
  constructor() {
    console.log(`This is the execuation of constructor`);
  }
}
