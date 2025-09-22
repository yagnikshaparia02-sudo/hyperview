import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { ActivatedRoute } from "@angular/router";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { LoaderService } from "src/app/_services/loader.service";
import { ToastrService } from "ngx-toastr";
import { QueryService } from "src/app/_services/query.service";
import { first } from "rxjs/operators";
import { IListing } from "src/app/_types/common";
import { NgForm } from "@angular/forms";
import { POImportService } from "src/app/_services/po-import.service";
import { BaseComponent } from "src/app/_components/base.component";

@Component({
  selector: "app-po-import",
  templateUrl: "./po-import.component.html",
  styleUrls: ["./po-import.component.scss"],
})
export class POImportComponent extends BaseComponent implements OnInit {
  // File Input
  @ViewChild("fileInput") fileInput: ElementRef;

  // File list
  fileList: FileList;

  // showError on invalid file input
  showError: boolean = false;

  // Linnworks token
  token = "";

  // Linnworks user
  user: any;

  // Required columns list and csv columns list from the API
  requiredColumnsList: any[] = [];
  csvColumnsList: any[] = [];

  // Displayed columns headers
  displayedColumns = ["requiredColumn", "csvColumn"];

  // Column mappings to store the selected csv column for each required column
  columnMappings: { [key: string]: number | null } = {};

  // submitted to indicate whether the form is submitted or not
  submitted = false;

  constructor(
    public dialog: MatDialog,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private dbService: NgxIndexedDBService,
    public QueryService: QueryService,
    public loader: LoaderService,
    public toastr: ToastrService,
    public poImportService: POImportService
  ) {
    super();
  }

  // On init
  async ngOnInit() {
    // Linnworks Auth code

    this.user = this.auth.getLogginUserDetails();

    var token = this.route.snapshot.queryParams["token"];

    var isTokenAvailable = false;

    var linnworks: any[] = await this.getTokeFromIndexedDb();

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
          }
        }
      });
    }
  }

  // Get token from indexed db
  async getTokeFromIndexedDb() {
    const response = await this.dbService.getAll("linnworks").toPromise();

    var data = response.map((resp) => {
      return resp;
    });
    return data;
  }

  // Authorized by token
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

  // File change event
  fileChange(event) {
    this.fileList = event.target.files;

    if (this.fileList.length > 0) {
      // Select the first file
      let file: File = this.fileList[0];

      // File is selected, hide the error
      this.showError = false;
    }
  }

  // on submit file for get columns (required, and csv columns)
  // API call to upload a file and get the csv columns, and required columns list
  async onSubmitFileForGetColumns(form: NgForm) {
    // If form is invalid, return
    if (!form.valid) {
      return;
    }

    // Fetch access token from local storage
    var accessTokenObj = localStorage.logintoken;

    // If access token is not available, show error, and return
    if (accessTokenObj.length <= 0) {
      this.toastr.error("Invalid Token");
      return;
    }

    // If file list is empty, show error, and return
    if (!this.fileList || this.fileList.length == 0) {
      this.showError = true;
      return;
    }

    // Show loader (Start)
    this.loader.showLoader();

    // Form data
    let file: File = this.fileList[0];
    let formData: FormData = new FormData();
    formData.append("File", file, file.name);

    // Headers
    let headers = new Headers();
    headers.append("Content-Type", "multipart/form-data");

    // API service call to get csv columns, and required columns list
    this.poImportService
      .getCsvColumnsWithRequiredColumns(formData)
      .pipe(first())
      .subscribe(
        (result) => {
          // Hide loader (End)
          this.loader.hideLoader();

          if (result.success) {
            // Set required columns list, and csv columns list
            this.requiredColumnsList = result.data.requiredColumns;
            this.csvColumnsList = result.data.csvColumns;

            // For each required column, set the column mappings to null
            this.requiredColumnsList.forEach((col) => {
              // Find a matching CSV column based on the condition
              const matchingCsvColumn = this.csvColumnsList.find(
                (csvCol) => csvCol.columnName === col
              );

              // If a match is found, pre-select it by assigning the position
              this.columnMappings[col] = matchingCsvColumn
                ? matchingCsvColumn.position
                : null;
            });
          } else {
            // Show error message
            this.toastr.error(result.message, null, { timeOut: 10000 });
            this.errorHandler(
              this.toastr,
              this.translateService,
              result.errors
            );
          }

          // If file input error is shown, hide it
          this.showError = false;
        },
        (error) => {
          // Hide loader (End)
          this.loader.hideLoader();

          // Show error message
          this.toastr.error(error.message, null, { timeOut: 10000 });
        }
      );
  }

  // on submit file with mappings for orders creation
  // API call to create bulk purchase orders
  async onSubmitFileWithMappingsForOrderCreation(form: NgForm) {
    // Set submitted to true
    this.submitted = true;

    // If form is invalid, return
    if (!form.valid) {
      return;
    }

    // Fetch access token from local storage
    var accessTokenObj = localStorage.logintoken;

    // If access token is not available, show error, and return
    if (accessTokenObj.length <= 0) {
      this.toastr.error("Invalid Token");
      return;
    }

    // If file list is empty, show error, and return
    if (!this.fileList || this.fileList.length == 0) {
      return;
    }

    // Prepare mappings to send to the API
    // Generates an array of objects representing column mappings.
    // Each object contains the column name and its corresponding position.
    const mappings = Object.keys(this.columnMappings).map((key) => ({
      ColumnName: key,
      Position: this.columnMappings[key],
    }));

    // Show loader (Start)
    this.loader.showLoader();

    // Form data
    let file: File = this.fileList[0];
    let formData: FormData = new FormData();
    formData.append("File", file, file.name);

    mappings.forEach((mapping, index) => {
      formData.append(`Mappings[${index}].ColumnName`, mapping.ColumnName);
      formData.append(
        `Mappings[${index}].Position`,
        mapping.Position.toString()
      );
    });

    // Headers
    let headers = new Headers();
    headers.append("Content-Type", "multipart/form-data");

    // API service call to create bulk purchase orders
    this.poImportService
      .createBulkPurchaseOrders(accessTokenObj, this.user.userId, formData)
      .pipe(first())
      .subscribe(
        (result) => {
          // Hide loader (End)
          this.loader.hideLoader();

          if (result.success) {
            // Show success message
            this.toastr.success(result.message);
          } else {
            // Show error message
            this.toastr.error(result.message, null, { timeOut: 10000 });
            this.errorHandler(
              this.toastr,
              this.translateService,
              result.errors,
              () => {
                this.submitted = false;
              }
            );
          }

          // Reset forms
          this.resetForm();
        },
        (error) => {
          // Hide loader (End)
          this.loader.hideLoader();

          // Show error message
          this.toastr.error(error.message, null, { timeOut: 10000 });
        }
      );
  }

  // Reset form controls
  resetForm() {
    this.fileInput.nativeElement.value = "";
    this.fileList = null;
    this.showError = false;
    this.requiredColumnsList = [];
    this.csvColumnsList = [];
    this.columnMappings = {};
    this.submitted = false;
  }
}
