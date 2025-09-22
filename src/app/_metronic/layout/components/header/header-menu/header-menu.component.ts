import { Component, OnInit } from "@angular/core";
import { LoaderService } from "./../../../../../_services/loader.service";

@Component({
  selector: "app-header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.scss"],
})
export class HeaderMenuComponent implements OnInit {
  constructor(private loader: LoaderService) {}

  // apiSelected: string = '1';
  ngOnInit(): void {}

  /**
   * On Change method to handle current Api Calling
   * @param event selected value
   */
}
