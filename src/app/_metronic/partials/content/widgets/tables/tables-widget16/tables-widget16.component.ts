import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/_services/dashboard.service";

type Tabs = "kt_table_widget_16_tab_1" | "kt_table_widget_16_tab_2";
@Component({
  selector: "app-tables-widget16",
  templateUrl: "./tables-widget16.component.html",
})
export class TablesWidget16Component implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  activeTab: Tabs = "kt_table_widget_16_tab_1";
  totalSalesList: any;
  totalSalesListSubsource: any;

  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? "show active" : "";
  }
  async getTotalSalesSource() {
    this.dashboardService
      .getTotalSalesSource()
      .pipe()
      .subscribe(
        (result) => {
          if (result.success) {
            this.totalSalesList = JSON.parse(result.data);
            console.log(this.totalSalesList);
          }
        },
        (error) => {}
      );
  }
  async getTotalSalesSubSource() {
    this.dashboardService
      .getOrdersData()
      .pipe()
      .subscribe(
        (result) => {
          if (result.success) {
            this.totalSalesListSubsource = JSON.parse(result.data);
            console.log(this.totalSalesListSubsource);
          }
        },
        (error) => {}
      );
  }
  async ngOnInit() {
    await this.getTotalSalesSource();
    await this.getTotalSalesSubSource();
  }
}
