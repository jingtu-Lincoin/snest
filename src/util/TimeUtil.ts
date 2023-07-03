export default class TimeUtil {
  static expried(etime: string) {
    const now = new Date();
    etime = etime.replace(/-/g, '/');
    const et = new Date(etime);
    return now.getTime() > et.getTime();
  }

  static getNow() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  }

  static getToday() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    return `${year}-${month}-${date}`;
  }
}
