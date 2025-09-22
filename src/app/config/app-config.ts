import { environment } from "../../environments/environment";

const BASE_URL = environment.apiEndpoint;
const API_V1 = environment.apiAdminVersion;
const API_V1_FRONT = environment.apiFrontVersion;

export const CONFIG = {
  EncrDecrKey: "123456$#@$^@1ERF",
  // oauth
  userAuthURL: BASE_URL + API_V1 + "/User/auth/login",
  userbytokenAuthURL: BASE_URL + API_V1 + "/User/auth/login-by-token",
  commonAPIDataURL: BASE_URL + API_V1,
  forgotPaswordURL: BASE_URL + API_V1 + "/User/auth/forgot-password",
  validateResetPassURL: BASE_URL + API_V1 + "/User/auth/is-valid/",
  resetPassURL: BASE_URL + API_V1 + "/User/auth/reset-password/",
  changePasswordURL: BASE_URL + API_V1 + "/api/users/v1/change-password",

  // dashboard
  getDashboardStatistics:
    BASE_URL + API_V1 + "/admin/dashboard/get-all-statistics-count",

  // Query Filter
  etDashboardStatistics:
    BASE_URL + API_V1 + "/admin/dashboard/get-all-statistics-count",
  // Query
  getAuthorizedByToken: BASE_URL + API_V1 + "/api/query/v1/authorized-by-token",
  getQueries: BASE_URL + API_V1 + "/api/query/v1/query",
  getQueryFilter: BASE_URL + API_V1 + "/api/query/v1/query-filter",
  getQueryResult: BASE_URL + API_V1 + "/api/query/v1/query-result",
  sendQueryResultMail:
    BASE_URL + API_V1 + "/api/query/v1/send-query-result-mail",

  // Admin Users Management
  getAllAdminUserListURL: BASE_URL + API_V1 + "/api/users/v1",
  createNewAdminUserURL: BASE_URL + API_V1 + "/api/users/v1",
  getAdminUserByIdURL: BASE_URL + API_V1 + "/api/users/v1/",
  editAdminUserURL: BASE_URL + API_V1 + "/api/users/v1",
  deleteAdminUserURL: "/api/users/v1/delete",
  activeAdminUserURL: "/api/users/v1/active",
  inActiveAdminUserURL: "/api/users/v1/inactive",

  // Commmon Api
  getAllAdminRoleListURL: BASE_URL + API_V1 + "/user/user-roles/api/all",

  // Role Permission Management
  getAllRoleListURL: BASE_URL + API_V1 + "/user/user-roles/api",
  deleteAdminRoleURL: "/user/user-roles/api/delete",
  createRoleDetailsURL: BASE_URL + API_V1 + "/user/user-roles/api",
  editRoleDetailsURL: BASE_URL + API_V1 + "/user/user-roles/api/edit",
  getAllPermissionListURL: BASE_URL + API_V1 + "/user/user-permissions/api/all",
  getAllRoleWisePermissionListURL: BASE_URL + API_V1 + "/user/user-roles/api/",
  getAllRoleListDrp: BASE_URL + API_V1 + "/user/user-roles/api/all",
  updateRoleWisePermissionURL: BASE_URL + API_V1 + "/user/user-roles/api",
  deleteAdminPermissionURL: "/user/user-permissions/api/delete",
  adminPermissionListURL: BASE_URL + API_V1 + "/user/user-permissions/api",
  getAdminPermissionByIdURL: BASE_URL + API_V1 + "/user/user-permissions/api/",
  createAdminPermissionsURL: BASE_URL + API_V1 + "/user/user-permissions/api",
  editAdminPermissionsURL: BASE_URL + API_V1 + "/user/user-permissions/api",

  getUserProfileURL: BASE_URL + API_V1 + "/api/users/v1/get-user-profile",
  updateUserProfileURL: BASE_URL + API_V1 + "/api/users/v1/update-user-profile",

  //PO-Status Export

  getPOStatusResult: BASE_URL + API_V1 + "/api/po-export/v1/po-status-all",
  getPOExportResult: BASE_URL + API_V1 + "/api/po-export/v1/po-export-result",
  getPODetailsResult: BASE_URL + API_V1 + "/api/po-export/v1/po-details-export",

  // Export CSV
  postExportCSV: BASE_URL + API_V1 + "/api/export-csv/v1/export-csv-ftp",

  // Bulk purchase orders
  createBulkPurchaseOrders:
    BASE_URL + API_V1 + "/api/bulk-purchase-orders/v1/import-csv",
  getCsvColumnsWithRequiredColumns:
    BASE_URL + API_V1 + "/api/bulk-purchase-orders/v1/get-columns",

  //contact us

  sendcontactusMail: BASE_URL + API_V1 + "/api/contact-us/v1/send-mail",
  // dashboard
  getTopProducts: BASE_URL + API_V1 + "/api/dashboard/v1/top-products",
  getTotalOrdersCount:
    BASE_URL + API_V1 + "/api/dashboard/v1/total-orders-count",
  getTotalSalesCount: BASE_URL + API_V1 + "/api/dashboard/v1/total-sales-count",
  getAverageOrderValueCount:
    BASE_URL + API_V1 + "/api/dashboard/v1/average-order-value-count",
  getTotalOrders: BASE_URL + API_V1 + "/api/dashboard/v1/total-orders",
  getTotalSales: BASE_URL + API_V1 + "/api/dashboard/v1/total-sales",
  getAverageOrderValue:
    BASE_URL + API_V1 + "/api/dashboard/v1/average-order-value",
  getSevenDaysData: BASE_URL + API_V1 + "/api/dashboard/v1/seven-days-data",
  getOrdersData: BASE_URL + API_V1 + "/api/dashboard/v1/orders-data",
  getAverageOrderSummary:
    BASE_URL + API_V1 + "/api/dashboard/v1/average-order-summary",
  getAuthorizedByTokenDashboard:
    BASE_URL + API_V1 + "/api/dashboard/v1/authorized-by-token",
  getTotalSalesChart: BASE_URL + API_V1 + "/api/dashboard/v1/total-sales-chart",
  getTotalSalesSource:
    BASE_URL + API_V1 + "/api/dashboard/v1/total-sales-source",
};
