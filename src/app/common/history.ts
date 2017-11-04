import {createBrowserHistory} from 'history';
import {container} from '../../injector';
export {History} from 'history';

const history = createBrowserHistory();
export const HISTORY_TOKEN = 'history';

container.bind(HISTORY_TOKEN).toConstantValue(history);
