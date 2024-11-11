import "react";

declare module "react" {
  function use<T>(useable: any): any;
}
