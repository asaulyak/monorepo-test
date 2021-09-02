export class DI {
  private static map = new Map();

  public static singleton<T>(thisClass: new () => T) {
    let instance = this.map.get(thisClass);
    if (!instance) {
      instance = new thisClass();
      this.map.set(thisClass, instance);
    }

    return instance as T;
  }

  public static instance<T>(thisClass: new () => T) {
    return new thisClass();
  }
}
