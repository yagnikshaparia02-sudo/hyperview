import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { first, map } from "rxjs/operators";
import { LoaderService } from "src/app/_services/loader.service";
import { ContactUsService } from "src/app/_services/contact-us.service";
import { IListing } from "src/app/_types/common";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { QueryService } from "src/app/_services/query.service";
import { AuthenticationService } from "../../_services/authentication.service";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"],
})
export class ContactUSComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;
  message = "";
  fileList: FileList;
  submitted: boolean = false;
  token = "";
  pipe = new DatePipe("en-US");

  constructor(
    public QueryService: QueryService,
    public ContactUsService: ContactUsService,
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
            this.toastr.error("Invalid Token");
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
  fileChange(event) {
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      let file: File = this.fileList[0];
    }
  }

  async onSubmitForm(form: NgForm) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    this.loader.showLoader();
    var linnworks = await this.getTokeFromIndexedDb();
    if (linnworks.length > 0) {
      let formData: FormData = new FormData();
      if (this.fileList != undefined) {
        let file: File = this.fileList[0];
        formData.append("ImportFile", file, file.name);
      }
      formData.append("Message", this.message);
      let headers = new Headers();
      headers.append("Content-Type", "multipart/form-data");
      this.ContactUsService.sendMail(
        linnworks[0]["linnworksApplicationToken"],
        formData
      )
        .pipe(first())
        .subscribe(
          (result: IListing) => {
            if (result.success) {
              this.toastr.success(result.message);
              const newInput = document.createElement("input");
              newInput.type = "file";
              newInput.addEventListener("change", this.fileChange.bind(this)); // Re-add the onchange event
              this.fileInput.nativeElement.parentNode.replaceChild(
                newInput,
                this.fileInput.nativeElement
              );
              this.fileInput = new ElementRef(newInput);
              this.fileList = null;
              this.message = "";
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
      //this.toastr.error("Invalid Token");
    }
  }
}
