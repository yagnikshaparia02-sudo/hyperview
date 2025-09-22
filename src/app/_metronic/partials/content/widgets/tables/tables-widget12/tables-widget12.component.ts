import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/_services/dashboard.service";
import { LoaderService } from "src/app/_services/loader.service";

type Tabs = "kt_table_widget_12_tab_1" | "kt_table_widget_12_tab_2";
@Component({
  selector: "app-tables-widget12",
  templateUrl: "./tables-widget12.component.html",
})
export class TablesWidget12Component implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private loader: LoaderService
  ) {}

  activeTab: Tabs = "kt_table_widget_12_tab_1";
  averageOrderSummaryList: any[] = [];
  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? "show active" : "";
  }
  async getAverageOrderSummary() {
    this.dashboardService
      .getAverageOrderSummary()
      .pipe()
      .subscribe(
        (result) => {
          if (result.success) {
            this.averageOrderSummaryList = JSON.parse(result.data);
            console.log(this.averageOrderSummaryList);
            console.log(this.averageOrderSummaryList[0]?.Source);
          }
        },
        (error) => {}
      );
  }
  async ngOnInit() {
    this.loader.showLoader();

    await this.getAverageOrderSummary();
    this.loader.hideLoader();
  }
}
