import {Component, OnInit} from '@angular/core';
import {CurrencyAPI, CurrencyEUR, CurrencyUAH, CurrencyUSD, Rates} from "../app.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  currencies: string[] = [ 'UAH', 'USD', 'EUR']

  selectedOptionOne: string = this.currencies[0];
  currentInputOne: number = 0;

  selectedOptionTwo: string = this.currencies[1];
  currentInputTwo: number = 0;

  focusInput: number = 0;

  currencyUAH: CurrencyUAH = {
    USD: 0,
    EUR: 0
  };

  currencyUSD: CurrencyUSD = {
  UAH: 0,
  EUR: 0
  };

  currencyEUR: CurrencyEUR = {
  USD: 0,
  UAH: 0
 }

  currencyExchange(value: number, cur1: string, cur2: string) : number{
    let result: number = 0;
    if(cur1 === 'UAH' && cur2 == 'USD') {
      result = value * this.currencyUAH.USD;
    } else if(cur1 === 'UAH' && cur2 == 'EUR') {
      result= value * this.currencyUAH.EUR;
    } else if(cur1 === 'USD' && cur2 == 'UAH') {
      result= value * this.currencyUSD.UAH;
    } else if(cur1 === 'USD' && cur2 == 'EUR') {
      result= value * this.currencyUSD.EUR;
    } else if(cur1 === 'EUR' && cur2 == 'USD') {
      result= value * this.currencyEUR.USD;
    } else if(cur1 === 'EUR' && cur2 == 'UAH') {
      result= value * this.currencyEUR.UAH;
    } else if(cur1 === cur2) {
      result = value;
    }
    return result;
  }

  changeInputOne() {
   this.currentInputTwo = this.currencyExchange(this.currentInputOne,
     this.selectedOptionOne, this.selectedOptionTwo);
    this.focusInput = 1;
  }

  changeInputTwo() {
    this.currentInputOne = this.currencyExchange(this.currentInputTwo,
      this.selectedOptionTwo, this.selectedOptionOne);
    this.focusInput = 2;
  }

  changeOption() {
    if(this.focusInput === 1) {
      this.changeInputOne();
    } else if(this.focusInput === 2) {
      this.changeInputTwo();
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<CurrencyAPI>('https://api.exchangerate-api.com/v4/latest/UAH')
      .subscribe(data => {
        const rates: Rates = data.rates;
        this.currencyUAH.USD = rates.USD;
        this.currencyUAH.EUR = rates.EUR;
      })
    this.http.get<CurrencyAPI>('https://api.exchangerate-api.com/v4/latest/USD')
      .subscribe(data => {
        this.currencyUSD = data.rates;
        console.log(this.currencyUSD);
      })
    this.http.get<CurrencyAPI>('https://api.exchangerate-api.com/v4/latest/EUR')
      .subscribe(data => {
        this.currencyEUR = data.rates;
        console.log(this.currencyEUR);
      })
  }

}
