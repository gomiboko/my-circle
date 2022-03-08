import { Wrapper } from "@vue/test-utils";
import { ValidationProvider } from "vee-validate";
import flushPromises from "flush-promises";

/**
 * 指定されたコンポーネントの input 要素に値を設定する
 * @param wrapper 入力対象コンポーネントの Wrapper オブジェクト
 * @param val 入力する値
 */
export async function setValue<T extends Vue>(wrapper: Wrapper<T>, val: string): Promise<void> {
  await wrapper.find("input").setValue(val);
  await flushPromises();
}

/**
 * 指定されたコンポーネントのメソッドを実行する
 * @param wrapper コンポーネントの Wrapper オブジェクト
 * @param methodName 実行するメソッド名
 * @param args メソッドの引数
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function execMethod<T extends Vue | null>(
  wrapper: Wrapper<T, Element>,
  methodName: string,
  ...args: any[]
): void {
  (wrapper.vm as any)[methodName](...args);
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * 指定された ref 属性値を持つ validation-provider コンポーネントの errors スロットプロパティを取得する
 * @param wrapper コンポーネントの Wrapper オブジェクト
 * @param providerRefName ref 属性値
 * @returns errors スロットプロパティ
 */
export function getValidationProviderErrors<T extends Vue>(wrapper: Wrapper<T>, providerRefName: string): string[] {
  return (wrapper.vm.$refs[providerRefName] as InstanceType<typeof ValidationProvider>).errors;
}

/**
 * ValidationObserver の状態を更新する為に必要な処理を実行する。
 * 事前に jest.userFakeTimers() を実行しておくこと。
 */
export async function flushAll(): Promise<void> {
  await flushPromises();
  jest.runAllTimers();
  await flushPromises();
}

/**
 * 指定されたイベントの発生回数を取得する
 * @param wrapper コンポーネントの Wrapper オブジェクト
 * @param eventName イベント名
 * @returns イベント発生回数
 */
export function getEventCount<T extends Vue | null>(wrapper: Wrapper<T>, eventName: string): number {
  const eventInfo = wrapper.emitted()[eventName];
  if (!eventInfo) {
    return 0;
  }
  return eventInfo.length;
}

/**
 * 指定されたイベントの最初に発生したイベントデータ(配列)のうち、
 * 1つ目を型パラメータU型の値として取得する
 * @param wrapper コンポーネントの Wrapper オブジェクト
 * @param eventName イベント名
 * @returns イベントデータ
 */
export function getVeryFirstEventData<T extends Vue | null, U>(wrapper: Wrapper<T>, eventName: string): U {
  const eventInfo = wrapper.emitted()[eventName];
  if (!eventInfo) {
    throw new Error(`イベントデータが存在しません(${eventName})`);
  }
  return eventInfo[0][0] as U;
}

/**
 * 指定された文字数のメールアドレスを生成する
 * @param length メールアドレス全体の文字数
 * @returns 指定された文字数のメールアドレス
 */
export function createEmailAddress(length: number): string {
  return "a".repeat(length - "@example.com".length) + "@example.com";
}
