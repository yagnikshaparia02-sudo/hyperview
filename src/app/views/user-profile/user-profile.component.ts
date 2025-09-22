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
import { UserProfileService } from "src/app/_services/user-profile.service";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { AuthenticationService } from "src/app/_services/authentication.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
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
  model: any = {
    userId: "",
    firstname: "",
    lastName: "",
    company: "",
    email: "",
    userWiseEmails: [],
  };
  totalRecords = 0;
  // pgIndex= 2;
  // private fields
  pipe = new DatePipe("en-US");

  constructor(
    public userProfileService: UserProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public toastr: ToastrService,
    public loader: LoaderService,
    private dbService: NgxIndexedDBService,
    private auth: AuthenticationService
  ) {}
  async adduserWiseEmails() {
    this.model.userWiseEmails.push({ emailAddress: "" });
  }
  async singleDelete(index) {
    this.model.userWiseEmails.splice(index, 1);
  }
  user: any;
  async ngOnInit() {
    this.loader.showLoader();
    this.user = this.auth.getLogginUserDetails();
    var token = this.route.snapshot.queryParams["token"];
    var isTokenAvailable = false;
    var linnworks = await this.getTokeFromIndexedDb();
    if (linnworks.length > 0) isTokenAvailable = true;

    if ((typeof token === "undefined" || token === "") && !isTokenAvailable) {
      var userId = this.user.userId;
      this.getUserProfile(null, userId);
    } else {
      this.route.queryParams.subscribe(async (params) => {
        if ((await params?.token) != undefined) {
          this.getlinnworksApplicationTokenfromtoken(params?.token);
          if (this.token == undefined || this.token == "") {
            var linnworks = await this.getTokeFromIndexedDb();
            if (linnworks.length > 0) {
              this.token = linnworks[0]["linnworksApplicationToken"];
              this.getUserProfile(token, userId);
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
            this.getUserProfile(token, userId);
          } else {
            this.toastr.error("Invalid Token");
          }
        }
      });
    }
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
  async authorizedByToken() {
    this.loader.showLoader();
    this.userProfileService
      .getUserProfile(this.token, this.user.userId)
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
                this.getUserProfile(key.linnworksApplicationToken, null);
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

  async getTokeFromIndexedDb() {
    const response = await this.dbService.getAll("linnworks").toPromise();
    var data = response.map((resp) => {
      return resp;
    });
    return data;
  }

  async getUserProfile(token: any, userId: any) {
    var linnworks = await this.getTokeFromIndexedDb();
    var token: any;
    var userId: any;
    if (linnworks.length > 0) {
      token = linnworks[0]["linnworksApplicationToken"];
    } else {
      userId = this.user.userId;
    }

    this.loader.showLoader();
    this.userProfileService
      .getUserProfile(token, userId)
      .pipe(first())
      .subscribe(
        (result) => {
          if (result.success) {
            this.model = {
              userId: result.data.userId,
              firstname: result.data.firstname,
              lastname: result.data.lastname,
              company: result.data.company,
              emailAddress: result.data.emailAddress,
              userWiseEmails: result.data.userWiseEmails,
            };
          } else this.toastr.error(result.message);
          this.loader.hideLoader();
        },
        (error) => {
          this.loader.hideLoader();
          this.toastr.error(error.Message);
        }
      );
  }

  public onSubmitForm(form: NgForm) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    // var supplier = this.supplierList.filter((x) => x.id === this.model.supplierId);
    const formData = {
      userId: this.model.userId,
      firstname: this.model.firstname,
      lastname: this.model.lastname,
      company: this.model.company,
      emailAddress: this.model.emailAddress,
      userWiseEmails: this.model.userWiseEmails,
    };
    this.addUpdatePurchaseCost(formData);
  }

  async addUpdatePurchaseCost(formData) {
    this.loader.showLoader();
    var linnworks = await this.getTokeFromIndexedDb();
    if (linnworks.length > 0) {
      this.userProfileService
        .UpdateUserProfile(linnworks[0]["linnworksApplicationToken"], formData)
        .pipe(first())
        .subscribe(
          (result) => {
            this.loader.hideLoader();
            if (result.success) {
              this.submitted = false;
              this.toastr.success(result.message);
            } else {
              console.log(result.message);
              this.toastr.error(result.message);
            }
          },
          (error) => {
            this.loader.hideLoader();
            this.toastr.error(error.message);
          }
        );
    } else {
      this.loader.hideLoader();
      //this.toastr.error("Invalid token");
    }
  }
}
