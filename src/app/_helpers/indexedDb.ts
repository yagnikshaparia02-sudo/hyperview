import { DBConfig } from "ngx-indexed-db";
export const dbConfig: DBConfig = {
  name: "CustomQueryDb",
  version: 1,
  objectStoresMeta: [
    {
      store: "linnworks",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        {
          name: "linnworksApplicationToken",
          keypath: "linnworksApplicationToken",
          options: { unique: false },
        },
        {
          name: "linnworksId",
          keypath: "linnworksId",
          options: { unique: false },
        },
        {
          name: "linnworksServerUrl",
          keypath: "linnworksServerUrl",
          options: { unique: false },
        },
        {
          name: "linnworksUserToken",
          keypath: "linnworksUserToken",
          options: { unique: false },
        },
      ],
    },
  ],
};
