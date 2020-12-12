import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  constructor(private http: HttpClient, private homeService: HomeService) { }

  @Input() data: any;

  ngOnInit(): void {
    console.log(this.data);
  }

  postStar() {
    this.homeService.getData();
  }

}
