export default class Util {
  /**
   * Remove an item from an array
   * @param arr the array
   * @param item  the item to be removed
   * @param field   the field of the item to be compared
   */
  arrRemove(arr: any[], item: any, field: string) {
    arr.map((i: any) => {
      if (i[field] === item[field]) {
        arr.splice(arr.indexOf(i), 1);
      }
    });
  }
}
