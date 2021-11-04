import { HTTP} from '@ionic-native/http';
import { RequestParam } from './Post/interfaces';
import { config } from './config';

export interface AxiosSettings {
  auth?: {
    username: string,
    password: string,
  };
  baseURL?: string;
  responseType?: string;
}

/**
 * Wrap Class for Quick Request Changes
 * @param {AxiosSettings} settings settingsForInstallationon
 * @class
 */
export class API {
  /**
   * @private
   * @description Parameters for installing HTTP connections
   * @type {AxiosSettings}
   */
  private settings: AxiosSettings;
  /**
   * @private
   * @description Variable for storing a class instance to work with http
   * @type {HTTP}
   */
  private http: HTTP;
  /**
   * @private
   * @description Contains an API link
   * @type {string}
   */
  private baseURL = config.url;
  /**
   * @private
   * @description Type of Response Content and Request
   * @type {string}
   */
  private responseType = 'json';

  /**
   * @constructor
   * @param {AxiosSettings} settings Parameters for connecting via http
   */
  constructor(settings: AxiosSettings) {
    this.settings = settings;
    this.http = new HTTP();
    if (this.settings.auth) {
      this.http.useBasicAuth(settings.auth.username, settings.auth.password);
    }
    this.http.setDataSerializer(this.responseType);
  }

  /**
   * Performs GET request to the API server
   * @async
   * @param {string} url Link to the method excluding the base
   * @returns {Promise<any>}
   */
  get(url: string) {
    return this.http.get(this.baseURL + url, {}, {});
  }
  /**
   * Performs PUT request to API server
   * @async
   * @param url link
   * @param body Body request
   * @returns {Promise<any>}
   */
  put(url: string, body: any) {
    return this.http.put(this.baseURL + url, {
      data: body
    }, {});
  }
  /**
   * Performs POST Request to API Server
   * @async
   * @param url link
   * @param body Body request
   * @returns {Promise<any>}
   */
  post(url: string, body: any) {
    return this.http.post(url, {
      data: body
    }, {});
  }
  /**
   * Performs Patch Request to API Server
   * @async
   * @param url link
   * @param body Body request
   * @returns {Promise<any>}
   */
  patch(url: string, body: any) {
    return this.http.patch(url, {
      data: body
    }, {});
  }
  /**
   * Performs Delete Request to API Server
   * @async
   * @param url link
   * @returns {Promise<any>}
   */
  delete(url: string) {
    return this.http.delete(url, {}, {});
  }
}
