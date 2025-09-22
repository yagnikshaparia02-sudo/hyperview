import { KeyValue } from "@angular/common";
import { Component } from "@angular/core";
import * as moment from "moment";
import { BsModalRef } from "ngx-bootstrap/modal";
import { CONFIG } from "../config/app-config";
import {
  ActionList,
  ActionListName,
  QueryStatusValue,
  statusList,
  StatusValue,
} from "../utils/enum-const";
import { StaticMessages } from "../utils/staticMessages";
import { getStatusClass } from "../utils/status";
import { CommonRegx } from "../_validators/common.validator";
import { CONFIGCONSTANTS } from "./../config/app-constants";
import {
  downloadSuccessHandler,
  errorHandler,
  getValueByKey,
  isEmptyData,
  truncateString,
} from "./../utils/common";
import { DownloadFile } from "./../utils/download";
import { BaseServiceInjector } from "./base.injector";

@Component({
  selector: "app-base-component",
  template: ``,
})
export class BaseComponent extends BaseServiceInjector {
  dataTableIndexColumnWidth = CONFIGCONSTANTS.dataTableIndexColumnWidth;
  public CONSTANT = CONFIGCONSTANTS;
  public dateFormat = CONFIGCONSTANTS.dateFormat;
  public dateShortFormat = CONFIGCONSTANTS.dateShortFormat;
  public momentDateFormat = CONFIGCONSTANTS.momentDateFormat;
  public momentDateTime24Format = CONFIGCONSTANTS.momentDateTime24Format;
  public momentDateTime12Format = CONFIGCONSTANTS.momentDateTime12Format;
  public noData = "-";
  public CommonRegx = CommonRegx;
  public modalRef: BsModalRef;
  public noImage = "assets/no-image.png";
  public noProfileImage = "assets/default-user-image.png";
  protected errorHandler = errorHandler;
  protected downloadSuccessHandler = downloadSuccessHandler;
  public getStatusClass = getStatusClass;
  public getValueByKey = getValueByKey;
  public isEmpty = isEmptyData;
  public truncateString = truncateString;
  public statusEnum = StatusValue;
  public queryStatusEnum = QueryStatusValue;
  public statusList = statusList;
  //#region Datatable configuration
  public loadingIndicator = false;
  serverSorting = CONFIGCONSTANTS.datatableConfig.serverSorting;
  serverPaging = CONFIGCONSTANTS.datatableConfig.serverPaging;
  pageSizeOptions: any[] = CONFIGCONSTANTS.datatableConfig.pageSizeOptions;
  totalRecords: string | number =
    CONFIGCONSTANTS.datatableConfig.page.totalRecords;
  pageNumber = CONFIGCONSTANTS.datatableConfig.page.pageNumber;
  pageSize = CONFIGCONSTANTS.datatableConfig.page.pageSize;
  dtMessages = CONFIGCONSTANTS.datatableConfig.dtMessages;
  showTotalPagesNumber = CONFIGCONSTANTS.datatableConfig.showTotalPagesNumber;
  siteLogo = CONFIGCONSTANTS.siteLogo;
  sortParam = "created_at";
  sortOrder = "desc";
  ActionListName = ActionListName;
  staticMessages = StaticMessages;
  //#endregion
  // languages = [];
  protected lan = ["en"];
  actionList = ActionList;
  currentPageNumber = 0;

  constructor() {
    super();
    // this.languages = this.multilingualService.getLanguage();
  }

  public onErrorImage(event: any) {
    event.target.src = this.noImage;
  }

  public onErrorProfileImage(event: any) {
    event.target.src = this.noProfileImage;
  }

  public DownloadFileByURL(
    name: string,
    link: string,
    successCallBack?: () => void,
    errorCallBack?: () => void,
    downloadWithOriginalName = false
  ) {
    const filename = name || this.getFileName(link);
    this.loader.showLoader();
    DownloadFile(
      filename,
      link,
      () => {
        this.loader.hideLoader();
        if (successCallBack) {
          successCallBack();
        }
      },
      async (err) => {
        this.loader.hideLoader();
        const msg = await this.translateService
          .get("DOCUMENT_NOT_FOUND_MSG")
          .toPromise();
        this.toastr.error(msg);
        if (errorCallBack) {
          errorCallBack();
        }
      },
      downloadWithOriginalName
    );
  }

  private getFileName(url: string) {
    if (!url) {
      return "";
    }
    return url.split("/").pop();
  }

  public async getTranslation(key, params = null) {
    const resp = await this.translateService
      .get(key, { 1: params })
      .toPromise();
    return resp;
  }

  public formatDate(date: string, format = CONFIGCONSTANTS.ApiRequestFormat) {
    if (!this.isEmpty(date)) {
      return moment(date).format(format);
    }
    return "";
  }

  /**
   * Sort status by value
   * @param a Active key value object
   * @param b Inaction key value object
   * @returns
   */
  public orderbyValueAsc = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return a.value > b.value ? 1 : a.value > b.value ? 0 : -1;
  };

  public async pageChangeLogic(event) {
    if (event.pageIndex === 0) {
      return event.pageIndex;
    }
    if (this.pageNumber < event.pageIndex) {
      return event.pageIndex + 1;
    } else {
      return event.pageIndex + 1;
    }
  }

  public async getIdFromArray(data) {
    const tempIds = [];
    data.map((ele) => {
      tempIds.push(ele.id);
    });
    return tempIds;
  }
  public checkPermissions(permissionName) {
    const decrypted = localStorage.getItem("currentUser");
    const currentUserJSON = JSON.parse(
      this.EncrDecr.get(CONFIG.EncrDecrKey, decrypted)
    );
    const currentUserPermissions = currentUserJSON?.permissions;
    const permissionList = [];
    currentUserPermissions.forEach((element) => {
      permissionList.push(element.name);
    });

    let isPermission = false;
    if (permissionName.length > 0) {
      permissionName.map((ele) => {
        if (permissionList.includes(ele)) {
          isPermission = true;
        }
      });
      return isPermission;
    }
  }
}
