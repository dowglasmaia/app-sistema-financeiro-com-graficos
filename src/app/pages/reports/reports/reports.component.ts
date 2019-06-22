import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry.service';

/* https://www.npmjs.com/package/currency-formatter */
import currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;

  revenueTotal: any = 0;

  balance: any = 0;

  //grafico de Despesas
  expenseChartData: any;

  //grafico de Receitas
  revenueChartData: any;

  //Valores do Grafico
  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  categories: Category[] = [];
  entries: Entry[] = [];

  //pegando o valor da variavel declarada no templet HTML, com ViewChild
  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;

  constructor(private entryService: EntryService, private categoryService: CategoryService) { }

  ngOnInit() {
    //categorias
    this.categoryService.getAll().subscribe(obj => this.categories = obj);

  }

  //gerar relatorio
  public generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    //se o mes e o ano estar vazio
    if (!month || !year)
      alert('Você precisa selecionar o Mês e o Ano para gerar o relatório!')
    else
      this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this))
  }

  private setValues(entries: Entry[]) {
    this.entries = entries;

    //calcular o total - Saldo
    this.calculateBalance();

    //valores do charts
    this.setChartData();
  }

  //calcular o total - Saldo
  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if (entry.type == 'revenue')
        revenueTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL' }) // REMOVE A FORMATAÇÃO DA MOEDA, PARA REALIZAR O CALCULO
      else
        expenseTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL' }) // REMOVE A FORMATAÇÃO DA MOEDA, PARA REALIZAR O CALCULO
    });

    //Despesas -  Formato Brasil para Exibir na tela ** https://www.npmjs.com/package/currency-formatter **
    this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL' });

    //Receitas
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL' });

    //Saldo - receita  - despesas
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, { code: 'BRL' });

  }

  //valores do charts
  private setChartData() {
    this.revenueChartData = this.getChartData('revenue', 'Gráficos de Receitas', '#9ccc65');
    this.expenseChartData = this.getChartData('expense', 'Gráficos de Despesas', '#e03131');

  }

  //gerador de graficos
  private getChartData(entryType: string, title: string, color: string) {
    const chartData = [];

    this.categories.forEach(category => {
      //filtrando laçamentos pela categoria e tipo
      const filterEntries = this.entries.filter(
        entry => (entry.categoryId == category.id) && (entry.type == entryType)
      );

      //se for encontrados os lacamentos no filtro, soma os valores e add ao grafico
      if (filterEntries.length > 0) {
        const totalAmount = filterEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.amount, { code: 'BRL' }), 0
        )
        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        })
      }
    });

    //graficos de receitas
    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    }
  }
}

