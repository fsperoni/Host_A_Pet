import axios from "axios";
import dog from "../assets/dog.jpeg";
import cat from "../assets/cat.png";

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

  /** User methods ********************   */

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

  /** Pet methods ********************   */

  /** Get a pet. */
  static async getPet(id) {
    const res = await this.request(`pets/id/${id}`);
    return res.pet; 
  }

  /** Get all pets for user. */
  static async getPets(username) {
    const res = await this.request(`pets/user/${username}`);
    return res.pets;
  }

  /** Add a pet. */
  static async addPet(username, data) {
    if (data.photo.length < 3 && data.type == 'Cat') data.photo = cat;
    if (data.photo.length < 3 && data.type == 'Dog') data.photo = dog;
    const res = await this.request(`pets/add/${username}`, data, "post");
    return res;
  }

  /** Delete pet profile. */
  static async deletePet(username, id, data={}) {
    const res = await this.request(`pets/${username}/${id}`, data, "delete");
    return res;
  }

  /** Update pet profile. */
  // static async updatePet(username, data) {
  //   const res = await this.request(`pets/${username}`, data, "patch");
  //   return res.user;
  // }

}

export default HostAPetApi;