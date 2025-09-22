import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-lists-widget26",
  templateUrl: "./lists-widget26.component.html",
  styleUrls: ["./lists-widget26.component.scss"],
})
export class ListsWidget26Component implements OnInit {
  rows: Array<{ description: string; link: string }>;

  constructor() {}

  ngOnInit(): void {
    this.rows = [
      {
        description: "Rishvi Website",
        link: "https://portal.messinahembry.com/",
      },
      { description: "HyperLook", link: "https://hyperlook.app/" },
      { description: "HyperStock", link: "https://hyperstock.app/" },
    ];
  }
  openLink(event: Event, link: string): void {
    event.preventDefault();
    window.open(link, "_blank");
  }
}
