import {JSDOM} from 'jsdom';

const html = '<!doctype html><html><head><script></script></head><body></body></html>';
global['window'] = (new JSDOM(html)).window;
global['document'] = global['window'].document;

// require('webstorage-polyfill');
// require('matchmedia-polyfill');
// require('raf-polyfill');
// global['CSS'] = require('css-var-shim');

copyToGlobal(global['window']);

// require('hammerjs');

function copyToGlobal(source: any) {
  Object.getOwnPropertyNames(source).forEach(
    key => (!(key in global)) && (global[key] = source[key]));
}
