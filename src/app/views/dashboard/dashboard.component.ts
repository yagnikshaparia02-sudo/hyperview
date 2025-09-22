import { Component, ViewChild, OnInit } from "@angular/core";
//import { ModalConfig, ModalComponent } from 'src/app/_metronic/partials';
import { DashboardService } from "src/app/_services/dashboard.service";
import { first } from "rxjs/operators";
import { BaseComponent } from "src/app/_components/base.component";
import { IDashboardProps } from "src/app/_types/dashboard";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "src/app/_services/loader.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { IListing } from "src/app/_types/common";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  // modalConfig: ModalConfig = {
  //   modalTitle: 'Modal title',
  //   dismissButtonLabel: 'Submit',
  //   closeButtonLabel: 'Cancel'
  // };
  // @ViewChild('modal') private modalComponent: ModalComponent;
  token = "";
  constructor(
    private dbService: NgxIndexedDBService,
    public dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private loader: LoaderService,
    private auth: AuthenticationService
  ) {}

  async openModal() {
    // return await this.modalComponent.open();
  }

  topProductsList: [];
  totalOrdersList: any = [];
  totalSalesList: any = [];
  totalAverageOrderValueList: any = [];
  //   totalOrdersList: { source: string, subsource: string }[] = [
  //     { source: "Product 1", subsource: "Subsource A" },
  //     { source: "Product 2", subsource: "Subsource B" },
  //     { source: "Product 3", subsource: "Subsource C" },
  //     { source: "Product 3", subsource: "Subsource C" },
  //     { source: "Product 3", subsource: "Subsource C" },
  //     { source: "Product 3", subsource: "Subsource C" },
  //     { source: "Product 3", subsource: "Subsource C" },
  //     { source: "Product 3", subsource: "Subsource C" },

  // ];
  user: any;
  async ngOnInit() {
    this.user = this.auth.getLogginUserDetails();
    var token = this.route.snapshot.queryParams["token"];
    var isTokenAvailable = false;
    var linnworks: any[] = await this.getTokeFromIndexedDb();
    console.log("Linwork id Token :-", linnworks);
    if (linnworks.length > 0) isTokenAvailable = true;

    if ((typeof token === "undefined" || token === "") && !isTokenAvailable) {
    } else {
      this.route.queryParams.subscribe(async (params) => {
        if ((await params?.token) != undefined) {
          this.token = await params?.token;
          this.authorizedByToken();
        } else {
          var linnworks = await this.getTokeFromIndexedDb();
          if (linnworks.length > 0) {
            this.token = linnworks[0]["linnworksApplicationToken"];
            this.authorizedByToken();
          } else {
          }
        }
      });
    }

    this.loader.showLoader();

    await this.getTopProducts();
    await this.getOrdersData();
    await this.getTotalSalesSource();
    await this.getAverageOrderSummary();
    //await this.getTotalOrdersCount(this.token);
    await this.getTotalSalesCount();
    this.loader.hideLoader();
  }

  async authorizedByToken() {
    this.loader.showLoader();
    this.dashboardService
      .authorizedByToken(this.token, this.user.userId)
      .pipe()
      .subscribe((result: IListing) => {
        if (result.success) {
          const dataLinnWorks: any = result.data;
          console.log("dataLinnWorks :-", dataLinnWorks);
          this.dbService.clear("linnworks").subscribe((successDeleted) => {
            var obj = {
              linnworksApplicationToken:
                dataLinnWorks["linnworksApplicationToken"],
              linnworksId: dataLinnWorks["linnworksId"],
              linnworksServerUrl: dataLinnWorks["linnworksServerUrl"],
              linnworksUserToken: dataLinnWorks["linnworksUserToken"],
            };
            console.log("linnworks obj :-", obj);
            this.dbService.add("linnworks", obj).subscribe((key) => {});
          });
        }

        this.loader.hideLoader();
      });
  }

  async getTokeFromIndexedDb() {
    const response = (await this.dbService
      .getAll("linnworks")
      .toPromise()) as any;
    if (response) {
      const data = response.map((resp: any) => {
        return resp;
      });
      return data;
    } else {
      return [];
    }
  }
  async getTopProducts() {
    this.dashboardService
      .getTopProducts()
      .pipe()
      .subscribe(
        (result) => {
          if (result.success) {
            this.topProductsList = result.data;
          }
        },
        (error) => {}
      );
  }

  async getOrdersData() {
    this.dashboardService
      .getOrdersData()
      .pipe()
      .subscribe(
        (result) => {
          if (result.success) {
            this.totalOrdersList = result.data;
          }
        },
        (error) => {}
      );
  }

  async getTotalSalesSource() {
    this.dashboardService
      .getTotalSalesSource()
      .pipe()
      .subscribe(
        (result) => {
          if (result.success) {
            this.totalSalesList = result.data;
          }
        },
        (error) => {}
      );
  }
  async getAverageOrderSummary() {
    this.dashboardService
      .getAverageOrderSummary()
      .pipe()
      .subscribe(
        (result) => {
          if (result.success) {
            this.totalAverageOrderValueList = result.data;
          }
        },
        (error) => {}
      );
  }

  totalOrdersCount: any;
  processedOrdersCount: any;
  // async getTotalOrdersCount(key: any) {

  //   this.dashboardService
  //     .getTotalOrdersCount(key)
  //     .pipe()
  //     .subscribe(
  //       (result) => {
  //         if (result.success) {
  //           this.totalOrdersCount = result.data.totalOrdersCount;
  //           this.processedOrdersCount = result.data.processedOrdersCount;
  //         }
  //       },
  //       (error) => {
  //       }
  //     );
  // }

  totalSales: any;
  async getTotalSalesCount() {
    this.dashboardService
      .getTotalSalesCount()
      .pipe()
      .subscribe(
        (result) => {
          if (result.success) {
            this.totalSales = result.data;
          }
        },
        (error) => {}
      );
  }

  averageOrderValue: any;
  async getAverageOrderValueCount() {
    this.dashboardService
      .getAverageOrderValueCount()
      .pipe()
      .subscribe(
        (result) => {
          if (result.success) {
            this.averageOrderValue = result.data;
          }
        },
        (error) => {}
      );
  }
}
