import Redis from 'ioredis';
import Util from "./Util";
export default class RedisUtil {
  redis = new Redis();

  async get(key: string) {
    let value = null;
    await this.redis.get(key).then((result) => {
      value = result;
    });
    return value;
  }

  async getFromList(redisKey: string, field: string, value: string) {
    let obj = null;
    if (redisKey) {
      await this.redis.get(redisKey).then((result) => {
        if (result != null) {
          const resultArray = JSON.parse(result);
          resultArray.map((item: any) => {
            if (item[field] === value) {
              obj = item;
            }
          });
        }
      });
    }
    return obj;
  }

  update(key: string, record: any) {
    this.redis.set(key, record);
  }

  add(key: string, record: any) {
    if (record) {
      this.redis.set(key, record);
    }
  }

  /**
   * Add a record to a list
   * @param redisKey  the key of the list
   * @param record  the record to be added
   * @param field the field of the record to be compared
   */
  addToList(redisKey: string, record: any, field: string) {
    if (record) {
      this.redis.get(redisKey).then((result) => {
        if (result != null) {
          const resultArray = JSON.parse(result);
          new Util().arrRemove(resultArray, record, field);
          resultArray.push(record);
          this.redis.set(redisKey, JSON.stringify(resultArray));
        } else {
          this.redis.set(redisKey, JSON.stringify(new Array(record)));
        }
      });
    }
  }
}
