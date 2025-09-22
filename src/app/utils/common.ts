import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

export const isEmpty = (value) => {
  return _.isEmpty(value) ? (_.isNumber(value) || _.isBoolean(value) ? false : true) : false;
};

export const errorHandler = async (toastr: ToastrService, translate: TranslateService, error, callBack?: CallableFunction) => {
  const errorData = error;
  if (errorData) {
    for (const key in errorData) {
      if (key) {
        toastr.error(errorData[key]);
      }
    }
  } else {
    const message = await translate.get('SOMETHING_WENT_WRONG').toPromise();
    toastr.error(message);
  }

  if (callBack) {
    callBack();
  }
};

export const downloadSuccessHandler = async (toastr: ToastrService, translate: TranslateService, data, callBack?: CallableFunction) => {
  const fileUrl = _.get(data, 'data.file', null);
  if (fileUrl) {
    window.open('File Download URL' + '?file=' + fileUrl, '_self');
  } else {
    const message = await translate.get('NO_DATA_AVAILABLE').toPromise();
    toastr.error(message);
  }
  if (callBack) {
    callBack(data);
  }
};

export const getValueByKey = (obj, key, defaultVal: any = '') => {
  return _.get(obj, key, defaultVal);
};

export const isEmptyData = (data) => {
  if (data === null || data === undefined || data === '' || data === 'undefined') {
    return true;
  } else {
    return false;
  }
};

export const truncateString = (data: string) => {
  if (data) {
    return data.substring(0, 50) + '...';
  }
};
