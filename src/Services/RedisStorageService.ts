import * as redis from "redis";
import * as bluebird from "bluebird";
import { Storage, StoreItems } from '../../node_modules/botbuilder-core-extensions/lib/storage';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export default class RedisStorageService implements Storage {
  protected memory: {
      [k: string]: string;
  };
  protected etag: number;
  protected client: any

  constructor(memory?: { [k: string]: string; }) {
    this.memory = memory;
    this.etag = 1;

    this.client = redis.createClient(process.env.REDIS_PORT || 6379, process.env.REDIS_HOST || 'localhost');
  }
  
  read(keys: string[]): Promise<StoreItems> {
    const that = this;

    return new Promise((resolve, _) => {
      const data = {};
      keys.forEach((key) => {
        that.client.get(key, function(_, item) {
          if (item) {
            data[key] = JSON.parse(item);
          }
          resolve(data);
        });
      });
    });
  }

  write(changes: StoreItems): Promise<void> {
    const that = this;

    function saveItem(key, item) {
      const clone = Object.assign({}, item);
      clone.eTag = (that.etag++).toString();

      that.client.set(key, JSON.stringify(clone), 'EX', 108000);
    }

    return new Promise((resolve, _) => {
      for (const key in changes) {
        const newItem = changes[key];

        saveItem(key, newItem);
      }

      resolve();
    });
  }
  
  delete(keys: string[]): Promise<void> {
    return new Promise((resolve, _) => {
      keys.forEach((key) => this.memory[key] = undefined);
      resolve();
    });
  }
}