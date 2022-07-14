import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResponseBody} from '../app.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  usdValue: number = 0;
  eurValue: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ResponseBody[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe(data => {
        const responseForUSD = data.filter(item => item.cc === "USD")[0];
        const responseForEUR = data.filter(item => item.cc === "EUR")[0];
        this.usdValue = responseForUSD.rate;
        this.eurValue = responseForEUR.rate;
    })

  }

}
