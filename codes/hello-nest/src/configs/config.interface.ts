/*
 * @Author: Lee
 * @Date: 2022-05-09 14:52:56
 * @LastEditors: Lee
 * @LastEditTime: 2022-05-09 15:06:44
 * @Description:
 */
import type { config as base } from './envs/default';
import type { config as dev } from './envs/production';
import type { config as pro } from './envs/development';
import type { config as test } from './envs/test';

export type Objectype = Record<string, unknown>;
export type Default = typeof base;
export type Development = typeof dev;
export type Production = typeof pro;
export type Test = typeof test;
export type Config = Default & Development & Production & Test;
