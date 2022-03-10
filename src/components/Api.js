import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class HostAPetApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${HostAPetApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      const message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }


  /** Get the current user. */
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Signup user. */
  static async signup(data) {
    const res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Get token for login from username, password. */
  static async login(data) {
    const res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Update user profile. */
  static async updateUser(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Delete user profile. */
  static async deleteUser(username, data={}) {
    const res = await this.request(`users/${username}`, data, "delete");
    return res;
  }
}

export default HostAPetApi;