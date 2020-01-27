import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-summary',
  templateUrl: './performance-summary.component.html',
  styleUrls: ['./performance-summary.component.scss']
})
export class PerformanceSummaryComponent implements OnInit {
  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['1 May', '8 May', '15 May', '22 May'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
      { data: [65, 59, 80, 81], label: '' }
  ];
 
  constructor() { }

  ngOnInit() {
  }

}
