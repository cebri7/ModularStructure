import store from "./store";

const registerStore = (name: string, module: any) => {
  if (module.store) {
    store.registerModule(name, module.store);
  }
};

export const registerModules = (modules: any) => {
  Object.keys(modules).forEach(moduleKey => {
    const module = modules[moduleKey];
    registerStore(moduleKey, module);
  });
};