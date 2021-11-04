import { API } from '../api';
import { config } from '../config';
import { IPostFull, IPost, RequestParam } from './interfaces';

export class Post {
  /**
   * An instance of a class for working with API through a small wrapper
   */
  private api: API;
//
  constructor() {
    if (config.logined === true) {
      this.api = new API({
        auth: {
          username: config.currentUser.nickname,
          password: config.currentUser.password
        }
      });
    } else {
      this.api = new API({  });
    }
  }

  /**
   * Get full information about post, including episodes
   * @async
   * @param {string} id uuid post
   * @returns {Promise<IPostFull>} result
   */
  async get(id: string): Promise<IPostFull> {
    const url = `/posts/${id}`;

    const res = await this.api.get(url);
    return JSON.parse(res.data);
  }

  /**
   * Getting all posts
   * @async
   * @param {string} query Request, maybe null
   * @param {RequestParam} params Request Parameters
   * @returns {Promise<IPost[]>}
   */
  async getAll(query: string, params: RequestParam): Promise<IPost[]> {
    let url = `/posts?page=${params.page || ''}` +
    `&limit=${params.limit || ''}&sort=${params.sort || ''}` +
    `&fields=${params.fields || ''}`;

    if (query) {
      url += `&q=${query}`;
    }
    if (params.custom) {
      url += params.custom;
    }

    const res = await this.api.get(url);

    return JSON.parse(res.data).rows;
  }
}
