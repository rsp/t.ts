import { caught as _caught } from './caught.js';

export const caught: <T>(promise: Promise<T>) => Promise<T> = _caught;
