import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import * as ApexCharts from "apexcharts";
import { getCSSVariableValue } from "../../../../../kt/_utils";
import { DashboardService } from "src/app/_services/dashboard.service";

@Component({
  selector: "app-new-charts-widget8",
  templateUrl: "./new-charts-widget8.component.html",
  styleUrls: ["./new-charts-widget8.component.scss"],
})
export class NewChartsWidget8Component implements OnInit {
  @ViewChild("weekChart") weekChart: ElementRef<HTMLDivElement>;
  @ViewChild("monthChart") monthChart: ElementRef<HTMLDivElement>;
  // type SalesDataItem {
  //   TotalSales: string;
  //   DayoftheWeek: string;
  //   SalesDate: string;
  // }
  @Input() chartHeight: string = "425px";
  @Input() chartHeightNumber: number = 425;
  @Input() cssClass: string = "";
  tab: "Week" | "Month" = "Week";
  chart1Options: any = {};
  chart2Options: any = {};
  hadDelay: boolean = false;
  totalSalesListChart: [] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private dashboardService: DashboardService
  ) {}

  async ngOnInit() {
    // await this.getTotalOrdersCount();
    await this.getTotalSalesChart();
    // await this.init();
    this.chart1Options = await getChart1Options(
      this.chartHeightNumber,
      this.totalSalesListChart
    );

    // await this.setupCharts();
  }
  async getTotalSalesChart() {
    this.dashboardService
      .getTotalSalesChart()
      .pipe()
      .subscribe(
        (result) => {
          if (result.success) {
            this.totalSalesListChart = JSON.parse(result.data);
            console.log(this.totalSalesListChart);
          }
        },
        (error) => {}
      );
  }
  totalOrders: any;
  // async  getTotalOrdersCount(){
  //   this.dashboardService
  //   .getTotalOrdersCount()
  //   .pipe()
  //   .subscribe(
  //     (result) => {
  //       if (result.success) {
  //         this.totalOrders = result.data;
  //       }
  //     },
  //     (error) => {
  //     }
  //   );
  // }
  async init() {
    this.chart1Options = getChart1Options(
      this.chartHeightNumber,
      this.totalSalesListChart
    );
    // this.chart2Options = getChart2Options(this.chartHeightNumber);
  }

  // setTab(_tab: 'Week' | 'Month') {
  //   this.tab = _tab;
  //   if (_tab === 'Week') {
  //     this.chart2Options = getChart2Options(this.chartHeightNumber);
  //   }

  //   if (_tab === 'Month') {
  //     this.chart1Options = getChart1Options(this.chartHeightNumber,this.totalSalesListChart);
  //   }

  //   this.setupCharts();
  // }

  setupCharts() {
    setTimeout(() => {
      this.hadDelay = true;
      this.init();
      this.cdr.detectChanges();
    }, 100);
  }
}
function getSalesChartData(
  totalSalesListChart: {
    TotalSales: string;
    DayoftheWeek: string;
    SalesDate: string;
  }[]
): any[] {
  return totalSalesListChart.map((item) => [
    new Date(item.SalesDate).getTime(),
    parseFloat(item.TotalSales),
  ]);
}

function getChart1Options(chartHeightNumber: number, totalSalesListChart: any) {
  const height = chartHeightNumber;
  const borderColor = getCSSVariableValue("--bs-border-dashed-color");
  const seriesData = totalSalesListChart.map((item: any) => [
    new Date(item.SalesDate).getTime(),
    parseFloat(item.TotalSales),
  ]);

  const options = {
    series: [
      {
        name: "Total Sales",
        data: seriesData,
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "bubble",
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bubble: {},
    },
    stroke: {
      show: false,
      width: 0,
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "numeric",
      tickAmount: 7,
      min: 0,
      max: 700,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: true,
        height: 0,
      },
      labels: {
        show: true,
        trim: true,
        style: {
          colors: getCSSVariableValue("--bs-gray-500"),
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      tickAmount: 7,
      min: 0,
      max: 700,
      labels: {
        formatter: function (val: string) {
          // Assuming val is the DayoftheWeek (e.g., "Mon", "Tue")
          // Mapping abbreviations to full day names
          const dayNameMap: { [key: string]: string } = {
            Mon: "Monday",
            Tue: "Tuesday",
            Wed: "Wednesday",
            Thu: "Thursday",
            Fri: "Friday",
            Sat: "Saturday",
            Sun: "Sunday",
          };

          // Customize the labels as needed
          return dayNameMap[val] || val;
        },
        style: {
          colors: getCSSVariableValue("--bs-gray-500"),
          fontSize: "13px",
        },
      },
    },

    tooltip: {
      style: {
        fontSize: "12px",
      },
      x: {
        formatter: function (val: string) {
          return "Clicks: " + val;
        },
      },
      y: {
        formatter: function (val: string) {
          return "$" + val + "K";
        },
      },
      z: {
        title: "Impression: ",
      },
    },
    crosshairs: {
      show: true,
      position: "front",
      stroke: {
        color: getCSSVariableValue("--bs-border-dashed-color"),
        width: 1,
        dashArray: 0,
      },
    },
    colors: [
      getCSSVariableValue("--bs-primary"),
      getCSSVariableValue("--bs-success"),
      getCSSVariableValue("--bs-warning"),
      getCSSVariableValue("--bs-danger"),
      getCSSVariableValue("--bs-info"),
      "#43CED7",
    ],
    fill: {
      opacity: 1,
    },
    markers: {
      strokeWidth: 0,
    },
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      padding: {
        right: 20,
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
  return options;
}

function getChart2Options(chartHeightNumber: number) {
  const data = [
    [[125, 300, 40]],
    [[250, 350, 35]],
    [[350, 450, 30]],
    [[450, 250, 25]],
    [[500, 500, 30]],
    [[600, 250, 28]],
  ];
  const height = chartHeightNumber;
  const borderColor = getCSSVariableValue("--bs-border-dashed-color");

  const options = {
    series: [
      {
        name: "Social Campaigns",
        data: data[0], // array value is of the format [x, y, z] where x (timestamp) and y are the two axes coordinates,
      },
      {
        name: "Email Newsletter",
        data: data[1],
      },
      {
        name: "TV Campaign",
        data: data[2],
      },
      {
        name: "Google Ads",
        data: data[3],
      },
      {
        name: "Courses",
        data: data[4],
      },
      {
        name: "Radio",
        data: data[5],
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "bubble",
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bubble: {},
    },
    stroke: {
      show: false,
      width: 0,
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "numeric",
      tickAmount: 7,
      min: 0,
      max: 700,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: true,
        height: 0,
      },
      labels: {
        show: true,
        trim: true,
        style: {
          colors: getCSSVariableValue("--bs-gray-500"),
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      tickAmount: 7,
      min: 0,
      max: 700,
      labels: {
        style: {
          colors: getCSSVariableValue("--bs-gray-500"),
          fontSize: "13px",
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      x: {
        formatter: function (val: string) {
          return "Clicks: " + val;
        },
      },
      y: {
        formatter: function (val: string) {
          return "$" + val + "K";
        },
      },
      z: {
        title: "Impression: ",
      },
    },
    crosshairs: {
      show: true,
      position: "front",
      stroke: {
        color: getCSSVariableValue("--bs-border-dashed-color"),
        width: 1,
        dashArray: 0,
      },
    },
    colors: [
      getCSSVariableValue("--bs-primary"),
      getCSSVariableValue("--bs-success"),
      getCSSVariableValue("--bs-warning"),
      getCSSVariableValue("--bs-danger"),
      getCSSVariableValue("--bs-info"),
      "#43CED7",
    ],
    fill: {
      opacity: 1,
    },
    markers: {
      strokeWidth: 0,
    },
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      padding: {
        right: 20,
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
  return options;
}
