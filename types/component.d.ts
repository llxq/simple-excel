import { SimpleExcel } from '../src'

declare module "vue" {
  export interface GlobalComponents {
    SimpleExcel: typeof SimpleExcel
  }
}
