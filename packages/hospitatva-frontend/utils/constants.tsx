export enum COMMODITIES {
  E_SEMI_FOWLER_BED = "E Semi Fowler Bed",
  GATCH_BED = "Gatch Bed",
  OXYGEN_CYLINDERS_20L = "20L Oxygen Cylinders",
  OXYGEN_CYLINDERS_40L = "40L Oxygen Cylinders",
}

export enum ROUTES {
  HOME = "/",
  HOSPITAL = "/hospital",
  MANAGE = "/manage",
  ADMIN = "/admin",
}

export const EMAIL_SCHEMA =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
