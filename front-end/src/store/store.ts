import Vue from "vue";
import { AppMessage, AppMessageType } from "./app-message";

export type State = {
  appMsg: AppMessage;
};

export const state = Vue.observable<State>({
  appMsg: new AppMessage(AppMessageType.Error, ""),
});
