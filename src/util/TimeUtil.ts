export default class TimeUtil {
  expried(etime: string) {
    const now = new Date();
    etime = etime.replace(/-/g, '/');
    const et = new Date(etime);
    return now.getTime() > et.getTime();
  }
}
