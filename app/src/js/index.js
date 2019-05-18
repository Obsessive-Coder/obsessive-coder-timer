import store from "../js/store";
import { addTask } from "../js/actions";
import ACTIONS from '../js/actions';

window.store = store;
window.addTask = ACTIONS.ADD_TASK;