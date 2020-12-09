import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: {} = null;
  flattenedData = [];

  @ViewChild('main') mainRef: ElementRef;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
  }

  displayCards() {
    this.mainRef.nativeElement.innerHTML = this.flattenedData.map(val => 
      `<div style="width:250px; height: 300px; margin: 1em; background-color: gray; opacity: 100; z-index: 150; color: white">
      <img style="width:100%; height: auto" src=${val.nasa_jpl_url}>
      ${val.name}</div>`).join('');
  }

  formatData(data: any) {
    Object.keys(data.near_earth_objects).forEach(key => {
      this.flattenedData.push(...data.near_earth_objects[key]);
    });
    console.log(this.flattenedData);
    this.displayCards()
  }

  search(value: string) {
    //this.mainRef.nativeElement.innerHTML = "Hello Angular 10!";
    this.homeService.getSearch().subscribe(data => {
      this.data = data;
      this.formatData(this.data);
    })
  }

}
