// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportStudent from '../../../app/model/student';

declare module 'egg' {
  interface IModel {
    Student: ReturnType<typeof ExportStudent>;
  }
}
