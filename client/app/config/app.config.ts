import { InjectionToken } from "@angular/core";
import { IAppConfig } from "./iapp.config";

export const APP_CONFIG = new InjectionToken("app.config");
export const AppConfig: IAppConfig = {
  routes: {
    admin: "admin",
    www: "",
    error404: "404",
    sellerHub: "sellerhub"
  },

  endpoints: {
    ws: "http://192.168.1.109:8000",
    frontend: "http://192.168.1.109:8000/vendcunia_api",
    admin: "http://127.0.0.1:8000/vendcunia-api/admin"
  },

  adminEmail: "admin@vendcunia.com"
};
