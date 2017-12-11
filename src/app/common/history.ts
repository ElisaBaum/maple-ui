import {createBrowserHistory} from 'history';
import {History as OriginalHistory} from 'history';

export interface History extends OriginalHistory {
  getPrevPath(): string;
}

interface InternalHistory extends History {
  prevPath: string;
}

export const HISTORY_TOKEN = 'history';
export const history = createBrowserHistory() as InternalHistory;

const proxy = fn => function(...args: any[]) {
  this.prevPath = location.pathname;
  fn.call(this, ...args);
};

history.replace = proxy(history.replace);
history.push = proxy(history.push);
history.getPrevPath = function() {
  return this.prevPath;
};
