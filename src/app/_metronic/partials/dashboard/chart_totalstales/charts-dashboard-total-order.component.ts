import { Component, OnInit } from "@angular/core";
import { getCSSVariableValue } from "../../../kt/_utils";
import { DashboardService } from "src/app/_services/dashboard.service";
import { weekdays } from "moment";

@Component({
  selector: "charts-dashboard-total-order",
  templateUrl: "./charts-dashboard-total-order.component.html",
})
export class ChartsDashboardTotalSalesComponent implements OnInit {
  chartOptions: any = {};
  totalSalesListChart: { TotalSales: string; Month: string }[] = [];
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getTotalSalesChart();
    this.chartOptions = getChartOptions(350, this.totalSalesListChart);
  }

  getTotalSalesChart(): void {
    this.dashboardService.getTotalSalesChart().subscribe(
      (result) => {
        if (result.success && Array.isArray(result.data.results)) {
          this.totalSalesListChart = result.data.results; // Assuming result.data is the array of sales data

          // Now it's safe to use map and other array methods
          this.chartOptions = getChartOptions(350, this.totalSalesListChart);
        } else {
          console.error("Unexpected data format:", result);
          // Handle the case where data is not in the expected format or result.success is false
        }
      },
      (error) => {
        console.error("Error fetching total sales chart data", error);
      }
    );
  }
}

function getChartOptions(height: number, totalSalesListChart: any) {
  const labelColor = getCSSVariableValue("--bs-gray-500");
  const borderColor = getCSSVariableValue("--bs-gray-200");
  const baseColor = getCSSVariableValue("--bs-info");
  const lightColor = getCSSVariableValue("--bs-light-info");
  const xAxisData = totalSalesListChart.map((item: any) => [item.Month]);
  const yAxisData = totalSalesListChart.map((item) =>
    parseFloat(item.TotalSales).toFixed(2)
  );
  return {
    series: [
      {
        name: "Total Sales",
        data: yAxisData,
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: 350,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: xAxisData,
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        position: "front",
        stroke: {
          color: baseColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val: any) {
          return parseFloat(val);
        },
      },
    },
    colors: [lightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      strokeColors: baseColor,
      strokeWidth: 3,
    },
  };
}
