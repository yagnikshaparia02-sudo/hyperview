import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/_services/dashboard.service";

type Tabs = "kt_table_widget_13_tab_1" | "kt_table_widget_13_tab_2";
@Component({
  selector: "app-tables-widget13",
  templateUrl: "./tables-widget13.component.html",
})
export class TablesWidget13Component implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  activeTab: Tabs = "kt_table_widget_13_tab_1";
  sevenDaysList: any;
  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? "show active" : "";
  }
  async getSevenDaysData() {
    this.dashboardService
      .getSevenDaysData()
      .pipe()
      .subscribe(
        (result) => {
          if (result.success) {
            this.sevenDaysList = JSON.parse(result.data);
            console.log(this.sevenDaysList);
          }
        },
        (error) => {}
      );
  }
  async ngOnInit() {
    await this.getSevenDaysData();
  }
}
