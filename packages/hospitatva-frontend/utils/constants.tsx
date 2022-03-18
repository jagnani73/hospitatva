export enum COMMODITIES {
  BEDS = "Beds",
  VENTILATORS = "Ventilators",
  OXYGEN_CYLINDERS = "Oxygen cylinders",
  FLUIDS = "Fluids",
}

export enum ROUTES {
  HOME = "/",
  HOSPITAL = "/hospital",
  MANAGE = "/manage",
  ADMIN = "/admin",
}

export const EMAIL_SCHEMA =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
