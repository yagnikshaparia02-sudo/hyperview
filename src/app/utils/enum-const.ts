export enum StatusValue {
  active = 'Active',
  inactive = 'Inactive',
}
export enum QueryStatusValue {
  }
export const statusList = {
  [StatusValue.active]: 'STATUS_LIST.ACTIVE',
  [StatusValue.inactive]: 'STATUS_LIST.INACTIVE',
};

export const ActionList = [
  { name: 'Action', value: 'action' },
  { name: 'Delete', value: 'delete' },
  { name: 'Activate', value: 'activate' },
  { name: 'InActive', value: 'deactivate' },
];

export enum ActionListName {
  action = 'action',
  delete = 'delete',
  activate = 'activate',
  deactivate = 'deactivate',
  }
