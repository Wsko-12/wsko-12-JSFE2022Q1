// import { L } from "@sb/utils/dist/Logger";
// import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@sb/utils/dist/LocalStorage";
//
// enum EStoreKeys {
//     collapsedAdminMenu = "collapsedAdminMenu",
//     locale = "locale",
//     tokenData = "tokenData",
//     tokenReceivedAt = "tokenReceivedAt",
// }
//
// interface IPackedValue<T = unknown> {
//     version: number;
//     value: T;
//     key: EStoreKeys;
// }
//
// type TStoreVersionMap = Record<EStoreKeys, number>;
//
// // key => version, if signature changed => up version
// const storeVersionMap: TStoreVersionMap = {
//     [EStoreKeys.locale]: 1,
// };
//
// const ns = "@PET_PROJECT";
//
// const createKey = (name: string) => `${ns}:${name}`;
//
// const getVersion = (key: EStoreKeys): number => {
//     if (undefined === storeVersionMap[key]) {
//         L.storage.warn(`Version for key: ${key} not found.`);
//
//         return 0;
//     }
//
//     return storeVersionMap[key];
// };
//
// const pack = <T>(key: EStoreKeys, value: T) => JSON.stringify({
//     version: getVersion(key),
//     value,
//     key,
// });
//
// const unPack = <T>(packed: string): T | undefined => {
//     try {
//         const { version, value, key }: IPackedValue<T> = JSON.parse(packed);
//
//         if (version !== getVersion(key)) {
//             L.storage.info(`Cache key "${key}" is outdated storage version: ${version}, current: ${getVersion(key)}.`);
//
//             return undefined;
//         }
//
//         return value;
//     } catch {
//         return undefined;
//     }
// };
//
// const storeSetting = <T>(key: EStoreKeys, value: T): void => {
//     setLocalStorage(createKey(key), pack(key, value));
// };
//
// const getSetting = <T>(key: EStoreKeys) => unPack<T>(getLocalStorage(createKey(key), null, false));
//
// interface ISettingStorage {
//     get: <T>(key: EStoreKeys) => T | undefined;
//     set: <T>(key: EStoreKeys, value: T) => void;
//     remove: (key: EStoreKeys) => void;
// }
//
// const removeSetting = (key: EStoreKeys) => removeLocalStorage(createKey(key));
//
// const settingStorage: ISettingStorage = {
//     set: storeSetting,
//     get: getSetting,
//     remove: removeSetting,
// };
//
// class AppLocalStorage {
//     get<V>(key: EStoreKeys): V | undefined {
//         return settingStorage.get<V>(key);
//     }
//
//     set<V>(key: EStoreKeys, value: V): void {
//         settingStorage.set<V>(key, value);
//     }
//
//     remove(key: EStoreKeys): void {
//         settingStorage.remove(key);
//     }
// }
//
