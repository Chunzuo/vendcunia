import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-marketing-managepromotion',
  templateUrl: './marketing-managepromotion.component.html',
  styleUrls: ['./marketing-managepromotion.component.scss']
})

export class MarketingManagepromotionComponent implements OnInit {

  displayedColumns = ['action', 'offer_name', 'status', 'promotion_type','start_date','end_date','items','promotion_sales','sales_lift','average_ordersize','display_priority'];
    dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55], label: 'Promotion sales:AFCASH0.00' },
    { data: [28, 48, 40, 19, 86, 27], label: 'Base sales:AFCASH0.00' }
  ];
  public barChartLabels: string[] = ['Sep 18', 'Sep 23', 'Sep 28', 'Oct 3', 'Oct 8', 'Oct 13'];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLegend = true;
  public barChartType = 'bar';

  constructor(private router: Router) {
    // Create 100 users
    const users: UserData[] = [];
    for (let i = 1; i <= 100; i++) {
        users.push(createNewUser(i));
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public promotionSelected(type: string): void {
    switch (type) {
      case 'orderDiscount':
        this.router.navigate(['/sellerhub/promotion/orderDiscount']);
      break;
      case 'shippingDiscount':
        this.router.navigate(['/sellerhub/promotion/shipDiscount']);
      break;
      case 'volumePricing':
        this.router.navigate(['/sellerhub/promotion/volumePrice']);
      break;
      case 'codelessCoupon':
        this.router.navigate(['/sellerhub/promotion/codeless']);
      break;
      case 'saleEvent':
        this.router.navigate(['/sellerhub/promotion/saleEvent']);
      break;
    }
  }
}
export interface UserData {
  action: string;
  status: string;
  offer_name: string;
  promotion_type: string;
  start_date: string;
  end_date: string;
  items: string;
  promotion_sales: string;
  sales_lift: string;
  average_ordersize: string;
  display_priority: string;
}
const COLORS = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'purple',
  'fuchsia',
  'lime',
  'teal',
  'aqua',
  'blue',
  'navy',
  'black',
  'gray'
];
const NAMES = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth'
];

function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

  return {
    action: id.toString(),
  status: name,
  offer_name: name,
  promotion_type: name,
  start_date: name,
  end_date: name,
  items: name,
  promotion_sales: name,
  sales_lift: name,
  average_ordersize: name,
  display_priority: name
  }
}
