import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";
import { first, map } from "rxjs/operators";
import { LoaderService } from "src/app/_services/loader.service";
import { POExportService } from "src/app/_services/poexport.service";
import { IListing } from "src/app/_types/common";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { TranslateService } from "@ngx-translate/core";
import { QueryService } from "src/app/_services/query.service";
import { AuthenticationService } from "src/app/_services/authentication.service";

@Component({
  selector: "app-poexport",
  templateUrl: "./poexport.component.html",
  styleUrls: ["./poexport.component.scss"],
})
export class POExportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("TABLE", { static: true }) table: ElementRef;
  dataSource = [];
  loading: boolean = false;
  curr = new Date();
  firstday = new Date(
    this.curr.setDate(this.curr.getDate() - this.curr.getDay())
  );
  lastday = new Date(
    this.curr.setDate(this.curr.getDate() - this.curr.getDay() + 6)
  );
  filter = {
    postatus: "",
    ponumber: "",
    fromDate: this.firstday,
    toDate: this.lastday,
  };
  firstLastButtons = true;
  totalRecords: string | number = "0";
  submitted: boolean = false;
  token = "";
  displayedColumns: string[] = ["Sr", "PONumber", "POStatus", "Action"];
  pipe = new DatePipe("en-US");

  constructor(
    public QueryService: QueryService,
    public POExportService: POExportService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public toastr: ToastrService,
    public loader: LoaderService,
    private dbService: NgxIndexedDBService,
    private auth: AuthenticationService
  ) {}
  user: any;
  async ngOnInit() {
    this.user = this.auth.getLogginUserDetails();
    await this.GetPOStatusList();
    var token = this.route.snapshot.queryParams["token"];
    var isTokenAvailable = false;
    var linnworks = await this.getTokeFromIndexedDb();
    if (linnworks.length > 0) isTokenAvailable = true;

    if ((typeof token === "undefined" || token === "") && !isTokenAvailable) {
      var userId = this.user.userId;
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
            var userId = this.user.userId;
          }
        }
      });
    }
  }

  async getTokeFromIndexedDb() {
    const response = await this.dbService.getAll("linnworks").toPromise();
    var data = response.map((resp) => {
      return resp;
    });
    return data;
  }

  async authorizedByToken() {
    this.loader.showLoader();
    this.QueryService.authorizedByToken(this.token, this.user.userId)
      .pipe(first())
      .subscribe(
        (result: IListing) => {
          if (result.success) {
            this.dbService.clear("linnworks").subscribe((successDeleted) => {
              var obj = {
                linnworksApplicationToken:
                  result.data["linnworksApplicationToken"],
                linnworksId: result.data["linnworksId"],
                linnworksServerUrl: result.data["linnworksServerUrl"],
                linnworksUserToken: result.data["linnworksUserToken"],
              };

              this.dbService.add("linnworks", obj).subscribe((key) => {});
            });
          } else this.toastr.error(result.message);

          this.loader.hideLoader();
        },
        (error) => {
          this.loader.hideLoader();
          this.toastr.error(error.Message);
        }
      );
  }

  postatuslist = [];
  async GetPOStatusList() {
    this.POExportService.getPOStatusResult()
      .pipe(first())
      .subscribe(
        (result) => {
          this.loader.hideLoader();
          if (result.success) {
            this.postatuslist = result.data;
          }
        },
        (error) => {
          this.loader.hideLoader();
        }
      );
  }

  onChangePage(pe: PageEvent) {}
  resetFilter() {
    this.filter = {
      postatus: "",
      ponumber: "",
      fromDate: this.firstday,
      toDate: this.lastday,
    };
    this.dataSource = [];
  }
  async onSubmitForm(form: NgForm) {
    this.submitted = true;
    if (form.invalid) {
      this.toastr.error("Please enter correct data");
      return;
    }
    this.loader.showLoader();
    var linnworks = await this.getTokeFromIndexedDb();
    if (linnworks.length > 0) {
      var obj = {
        PoNumber: this.filter.ponumber,
        poStatus: this.filter.postatus,
        fromDate: this.pipe.transform(this.filter.fromDate, "YYYY/MM/dd"),
        toDate: this.pipe.transform(this.filter.toDate, "YYYY/MM/dd"),
      };
      this.POExportService.getPOExportResult(
        linnworks[0]["linnworksApplicationToken"],
        obj
      )
        .pipe(first())
        .subscribe(
          (result: IListing) => {
            if (result.success) {
              var data = JSON.parse(result.data.toString());
              if (data.length > 0) {
                this.dataSource = data;
                this.totalRecords = this.dataSource.length;
              }
            } else {
              this.toastr.error(result.message);
            }
            this.loader.hideLoader();
          },
          (error) => {
            this.loader.hideLoader();
          }
        );
    } else {
      this.loader.hideLoader();
      this.toastr.error("Invalid Token");
    }
  }

  async export(poId, ponumber) {
    this.loader.showLoader();
    var linnworks = await this.getTokeFromIndexedDb();
    if (linnworks.length > 0) {
      this.POExportService.getPODetailsResult(
        linnworks[0]["linnworksApplicationToken"],
        poId
      )
        .pipe(first())
        .subscribe(
          (result: IListing) => {
            if (result.success) {
              var data = JSON.parse(result.data.toString());
              if (data.length > 0) {
                this.exportCsv(ponumber, data);
              } else {
                this.toastr.warning("No record found for export.");
              }
            } else {
              this.toastr.error(result.message);
            }
            this.loader.hideLoader();
          },
          (error) => {
            this.loader.hideLoader();
          }
        );
    } else {
      this.loader.hideLoader();
      this.toastr.error("Invalid Token");
    }
  }
  public exportCsv(filename, rows: object[]): string {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ",";
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      "\n" +
      rows
        .map((row) => {
          return keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? "" : row[k];
              cell =
                cell instanceof Date
                  ? cell.toLocaleString()
                  : cell.toString().replace(/"/g, '""');
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator);
        })
        .join("\n");
    //Current Datetime change to format ddMMyyyyHHmm
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0");
    var yyyy = date.getFullYear();
    var MM = date.getMinutes();
    var ss = date.getSeconds();
    var HH = String(date.getHours()).padStart(2, "0");
    var ddMMyyyyHHmm = dd + mm + yyyy + HH + MM + ss;
    this.saveAsFile(
      csvContent,
      filename + "_" + ddMMyyyyHHmm + ".csv",
      "text/csv"
    );
  }

  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }
}
