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
import { QueryService } from "src/app/_services/query.service";
import { IListing } from "src/app/_types/common";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "src/app/_services/authentication.service";

@Component({
  selector: "app-query",
  templateUrl: "./query.component.html",
  styleUrls: ["./query.component.scss"],
})
export class QueryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("TABLE", { static: true }) table: ElementRef;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  title = "Klaviyo-Embedded";
  siteLogo = "../assets/logo.png";
  hasError: boolean;
  returnUrl: string;
  submitted = false;
  showFirstLastButtons = true;
  token = "";
  queryList = [];
  queryFilterList = [];
  displayedColumns = [];
  queryResult = [];
  model: any = {
    queryId: "",
  };
  totalRecords = 0;
  // pgIndex= 2;
  firstLastButtons = true;
  pnDisabled = true;
  hdPageSize = true;
  // private fields
  pipe = new DatePipe("en-US");

  constructor(
    public QueryService: QueryService,
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
    var token = this.route.snapshot.queryParams["token"];
    var isTokenAvailable = false;
    var linnworks = await this.getTokeFromIndexedDb();

    if (linnworks.length > 0) isTokenAvailable = true;

    if ((typeof token === "undefined" || token === "") && !isTokenAvailable) {
      var userId = this.user.userId;
      this.getQuery(null, userId);
    } else {
      this.route.queryParams.subscribe(async (params) => {
        if ((await params?.token) != undefined) {
          this.getlinnworksApplicationTokenfromtoken(params?.token);
          if (this.token == undefined || this.token == "") {
            var linnworks = await this.getTokeFromIndexedDb();
            if (linnworks.length > 0) {
              this.token = linnworks[0]["linnworksApplicationToken"];
              this.authorizedByToken();
            } else {
              this.toastr.error("Invalid Token");
            }
          } else {
            this.authorizedByToken();
          }
        } else {
          var linnworks = await this.getTokeFromIndexedDb();
          if (linnworks.length > 0) {
            this.token = linnworks[0]["linnworksApplicationToken"];
            this.authorizedByToken();
          } else {
            this.toastr.error("Invalid Token");
          }
        }
      });
    }
  }

  async getTokeFromIndexedDb() {
    const response = await this.dbService.getAll("linnworks").toPromise();
    console.log("response :-", response);
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

              this.dbService.add("linnworks", obj).subscribe((key) => {
                this.getQuery(key.linnworksApplicationToken, null);
              });
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
  async getQuery(key: any, userId: any) {
    this.loader.showLoader();
    this.QueryService.getQueries(key, userId)
      .pipe(first())
      .subscribe(
        (result: IListing) => {
          if (result.success) {
            this.queryList = result.data;
          } else this.toastr.error(result.message);
          this.loader.hideLoader();
        },
        (error) => {
          this.loader.hideLoader();
          this.toastr.error(error.Message);
        }
      );
  }
  ExportToCSV() {
    var newArray = this.getFilteredData();
    this.exportCsv(newArray, this.displayedColumns);
  }
  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }
  public exportCsv(rows: object[], columns?: string[]): string {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ",";
    const keys = Object.keys(rows[0]).filter((k) => {
      if (columns?.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });
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
    this.saveAsFile(csvContent, "test.csv", "text/csv");
  }
  getFilteredData() {
    var newArray = [];
    var filterKeys = this.displayedColumns;
    for (var i = 0; i < this.dataSource.data.length; i++) {
      var curElement = this.dataSource.data[i];
      innerLoops: for (var j = 0; j < filterKeys.length; j++) {
        var curKey = filterKeys[j];
        if (curElement[curKey] != null) {
          if (
            curElement[curKey].toLowerCase().includes(this.dataSource.filter)
          ) {
            newArray.push(curElement);
            break innerLoops;
          }
        }
      }
    }
    return newArray;
  }

  ExportTOExcel() {
    var newArray = this.getFilteredData();
    const workSheet = XLSX.utils.json_to_sheet(newArray, {
      header: this.displayedColumns,
    });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, "Sheet1");
    /* save to file */
    XLSX.writeFile(wb, "SheetJS.xlsx");
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  async changeQuery(value) {
    this.queryResult = [];
    this.totalRecords = 0;
    this.displayedColumns = [];
    this.loader.showLoader();
    var linnworks = await this.getTokeFromIndexedDb();
    var userId = null;
    var token = null;

    if (linnworks.length > 0) {
      token = linnworks[0]["linnworksApplicationToken"];
    }
    if (linnworks.length < 1) {
      userId = this.user.userId;
    }
    //if (linnworks.length > 0) {
    this.QueryService.getQueryFilter(value, userId, token)
      .pipe(first())
      .subscribe(
        (result: IListing) => {
          if (result.success) {
            result.data.forEach((element) => {
              if (element.queryResult != null) {
                element.queryResult = JSON.parse(element.queryResult);
              }
            });
            this.queryFilterList = result.data;
            this.loader.hideLoader();
          }
        },
        (error) => {
          this.loader.hideLoader();
          this.toastr.error(error.Message);
        }
      );
    // } else {
    //   this.loader.hideLoader();
    //   this.toastr.error("Invalid Token");
    // }
  }

  onChangePage(pe: PageEvent) {
    // console.log(pe.pageIndex);
    // console.log(pe.pageSize);
  }

  async onSubmitForm(form: NgForm) {
    if (form.invalid) {
      this.toastr.error("Please enter correct data");
      return;
    }
    this.loader.showLoader();
    var linnworks = await this.getTokeFromIndexedDb();
    console.log("Linwork id Token :-", linnworks);
    var token: any;
    var userId: any;
    if (linnworks.length > 0) {
      token = linnworks[0]["linnworksApplicationToken"];
    } else {
      userId = this.user.userId;
    }

    var obj = {
      QueryId: this.model.queryId,
      SelectedQueryFilters: [] as any[],
    };
    this.queryFilterList.forEach((element) => {
      obj.SelectedQueryFilters.push({
        QueryFilterId: element.queryFilterId,
        QueryParameterName: element.queryParameterName,
        Type: element.type,
        QueryParameterValue:
          element.type == 3
            ? this.pipe.transform(element.selectedValue, "YYYY/MM/dd")
            : element.selectedValue,
      });
    });

    this.QueryService.getQueryResult(token, userId, obj)
      .pipe(first())
      .subscribe(
        (result: IListing) => {
          if (result.success) {
            var data = JSON.parse(result.data.toString());
            if (data.length > 0) {
              this.displayedColumns = Object.keys(data[0]);
              this.queryResult = data;
              this.dataSource = new MatTableDataSource(data);
              // this.dataSource.paginator = this.paginator;
              this.totalRecords = this.dataSource.data.length;
            }
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
            }, 200);
          } else {
            this.toastr.error(result.message);
          }

          this.loader.hideLoader();
        },
        (error) => {
          this.loader.hideLoader();
        }
      );
  }

  async SendMail() {
    this.loader.showLoader();
    var linnworks = await this.getTokeFromIndexedDb();
    var token: any;
    var userId: any;
    if (linnworks.length > 0) {
      token = linnworks[0]["linnworksApplicationToken"];
    } else {
      userId = this.user.userId;
    }

    var obj = {
      QueryId: this.model.queryId,
      SelectedQueryFilters: [] as any[],
    };
    this.queryFilterList.forEach((element) => {
      obj.SelectedQueryFilters.push({
        QueryFilterId: element.queryFilterId,
        QueryParameterName: element.queryParameterName,
        Type: element.type,
        QueryParameterValue:
          element.type == 3
            ? this.pipe.transform(element.selectedValue, "YYYY/MM/dd")
            : element.selectedValue,
      });
    });

    this.QueryService.sendQueryResultMail(token, userId, obj)
      .pipe(first())
      .subscribe(
        (result: IListing) => {
          if (result.success) {
            // var data = JSON.parse(result.data.toString());
            this.toastr.success(result.message);
          } else {
            this.toastr.error(result.message);
          }

          this.loader.hideLoader();
        },
        (error) => {
          this.loader.hideLoader();
        }
      );
  }

  async getlinnworksApplicationTokenfromtoken(token) {
    this.auth
      .loginbytoken(token)
      .pipe(first())
      .subscribe((user) => {
        if (user.success) {
          this.token = user.data.linnworksApplicationToken;
        }
      });
  }
}
