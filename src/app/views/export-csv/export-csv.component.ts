import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { ExportcsvService } from "src/app/_services/exportcsv.service";
import { LoaderService } from "src/app/_services/loader.service";
import { QueryService } from "src/app/_services/query.service";
import { IListing } from "src/app/_types/common";

@Component({
  selector: "app-export-csv",
  templateUrl: "./export-csv.component.html",
  styleUrls: ["./export-csv.component.scss"],
})
export class ExportCSVComponent implements OnInit {
  //worked by Ashwani...

  //#region  decleration
  token = "";
  pipe = new DatePipe("en-US");
  IsMessage: boolean = false;
  SuccessMessage: string;
  //#endregion

  //#region constructor
  constructor(
    public QueryService: QueryService,
    public exportcsvservice: ExportcsvService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public loader: LoaderService,
    private dbService: NgxIndexedDBService,
    private auth: AuthenticationService
  ) {}
  //#endregion

  //#region  FormGroup
  Csvform: FormGroup = new FormGroup({
    ordernum: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9,]*$"),
    ]),
  });
  //#endregion

  //#region Get user by token
  user: any;
  async ngOnInit() {
    // this.user = this.auth.getLogginUserDetails();
    // var token = this.route.snapshot.queryParams["token"];
    // var isTokenAvailable = false;
    // //var linnworks = await this.getTokeFromIndexedDb();
    // var linnworks: any[] = await this.getTokeFromIndexedDb();
    // this.toastr.error("Length of Token is " + linnworks.length);
    // if (linnworks.length > 0) isTokenAvailable = true;

    // if ((typeof token === "undefined" || token === "") && !isTokenAvailable) {
    //   var userId = this.user.userId;
    // } else {
    //   this.route.queryParams.subscribe(async (params) => {
    //     if ((await params?.token) != undefined) {
    //       this.token = await params?.token;
    //       this.authorizedByToken();
    //     } else {
    //       var linnworks = await this.getTokeFromIndexedDb();
    //       if (linnworks.length > 0) {
    //         this.token = linnworks[0]["linnworksApplicationToken"];
    //         this.authorizedByToken();

    //         console.log(this.token);
    //       } else {
    //         this.toastr.error(
    //           "Invalid Token! Length of Token is " + linnworks.length
    //         );
    //       }
    //     }
    //   });
    // }

    //new
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
          } else {
          }
        }
      });
    }
  }

  // async getTokeFromIndexedDb() {
  //  const response = await this.dbService.getAll("linnworks").toPromise();
  //   console.log(response[0]);
  //   var data = response.map((resp) => {
  //     return resp;
  //   });
  //   return data;
  // }

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

  //new
  // async getTokeFromIndexedDb() {
  //   debugger
  //   const response = (await this.dbService
  //     .getAll("linnworks")
  //     .toPromise()) as any;
  //   if (response) {
  //     const data = response.map((resp: any) => {
  //       return resp;
  //     });
  //     return data;
  //   } else {
  //     return [];
  //   }
  // }

  async authorizedByToken() {
    this.loader.showLoader();
    this.QueryService.authorizedByToken(this.token, this.user.userId)
      .pipe(first())
      .subscribe(
        (result: IListing) => {
          if (result.success) {
            const dataLinnWorks: any = result.data;
            this.dbService.clear("linnworks").subscribe((successDeleted) => {
              var obj = {
                linnworksApplicationToken:
                  dataLinnWorks["linnworksApplicationToken"],
                linnworksId: dataLinnWorks["linnworksId"],
                linnworksServerUrl: dataLinnWorks["linnworksServerUrl"],
                linnworksUserToken: dataLinnWorks["linnworksUserToken"],
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

  //new
  // async authorizedByToken() {
  //   this.loader.showLoader();
  //   this.exportcsvservice
  //     .authorizedByToken(this.token, this.user.userId)

  //     .pipe()
  //     .subscribe((result: IListing) => {
  //       if (result.success) {
  //         const dataLinnWorks: any = result.data;
  //         this.dbService.clear("linnworks").subscribe((successDeleted) => {
  //           var obj = {
  //             linnworksApplicationToken:
  //               dataLinnWorks["linnworksApplicationToken"],
  //             linnworksId: dataLinnWorks["linnworksId"],
  //             linnworksServerUrl: dataLinnWorks["linnworksServerUrl"],
  //             linnworksUserToken: dataLinnWorks["linnworksUserToken"],
  //           };

  //           this.dbService.add("linnworks", obj).subscribe((key) => { });
  //         });
  //       }

  //       this.loader.hideLoader();
  //     });
  // }

  //#endregion

  //#region Get Order numer
  // async ExportCsv(value) {
  //   console.log(value);
  //   this.loader.showLoader();
  //   // var linnworks = await this.getTokeFromIndexedDb();
  //   var linnworks: any[] = await this.getTokeFromIndexedDb();
  //   console.log("Linwork id Token :-", linnworks);
  //   if (linnworks.length > 0) {
  //     this.exportcsvservice
  //       .postCsvOrderNo(linnworks[0]["linnworksApplicationToken"], value)
  //       .pipe(first())
  //       .subscribe(
  //         (result: IListing) => {
  //           if (result.success) {
  //             this.Csvform.reset();
  //             this.toastr.info(result.message);
  //             setTimeout(() => {
  //               this.IsMessage = true;
  //               this.SuccessMessage = result.message;
  //             }, 2000);
  //           } else {
  //             this.toastr.error(result.message);
  //           }
  //           this.loader.hideLoader();
  //         },
  //         (error) => {
  //           this.loader.hideLoader();
  //         }
  //       );
  //     this.loader.hideLoader();
  //     this.toastr.error("Your Token Length is " + linnworks.length);
  //   } else {
  //     this.loader.hideLoader();
  //     this.toastr.error("Invalid Token!!Token Length is " + linnworks.length);
  //   }
  // }

  //try catch
  async ExportCsv(value) {
    try {
      console.log(value);
      this.loader.showLoader();

      var accessTokenObj = localStorage.logintoken;
      console.log(accessTokenObj);
      // Retrieve token from IndexedDb
      //var linnworks: any[] = await this.getTokeFromIndexedDb();

      console.log("Linwork id Token :-", accessTokenObj);

      // Check if tokens are available
      if (accessTokenObj.length > 0) {
        try {
          const result: IListing = await this.exportcsvservice
            .postCsvOrderNo(accessTokenObj, value)
            .pipe(first())
            .toPromise();

          if (result.success) {
            this.Csvform.reset();
            this.toastr.info(result.message);
            setTimeout(() => {
              this.IsMessage = true;
              this.SuccessMessage = result.message;
            }, 2000);
          } else {
            this.toastr.error(result.message);
          }
        } catch (error) {
          this.toastr.error(
            "Failed to post CSV order: " + console.error(error)
          );
        }
      } else {
        this.toastr.error(
          "Invalid Token! Token Length is " + accessTokenObj.length
        );
      }
    } catch (error) {
      this.toastr.error("An error occurred: " + console.error(error));
    } finally {
      this.loader.hideLoader();
    }
  }

  //#endregion

  //#region  reset form
  Reset() {
    this.Csvform.reset();
  }
  //#endregion
}
