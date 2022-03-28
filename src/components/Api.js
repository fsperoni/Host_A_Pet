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
    if (data.photo.length < 3 && data.type === 'Cat') data.photo = cat;
    if (data.photo.length < 3 && data.type === 'Dog') data.photo = dog;
    const res = await this.request(`pets/add/${username}`, data, "post");
    return res;
  }

  /** Delete pet profile. */
  static async deletePet(username, id, data={}) {
    const res = await this.request(`pets/${username}/${id}`, data, "delete");
    return res;
  }

  /** Update pet profile. */
  static async updatePet(username, id, data) {
    if (data.photo.length < 3 && data.type === 'Cat') data.photo = cat;
    if (data.photo.length < 3 && data.type === 'Dog') data.photo = dog;
    const res = await this.request(`pets/${username}/${id}`, data, "patch");
    return res;
  }

  /** Role methods ********************   */

  /** Get a role. */
  static async getRole(id) {
    const res = await this.request(`roles/${id}`);
    return res.role; 
  }

  /** Get all roles. */
  static async getAllRoles() {
    const res = await this.request(`roles`);
    return res.roles;
  }

  /** Add a role. */
  static async addRole(data) {
    const res = await this.request(`roles`, data, "post");
    return res;
  }

  /** Delete role. */
  static async deleteRole(id, data={}) {
    const res = await this.request(`roles/${id}`, data, "delete");
    return res;
  }

  /** Update role. */
  static async updateRole(id, data) {
    const res = await this.request(`roles/${id}`, data, "patch");
    return res;
  }

  /** Availability methods ********************   */

  /** Get an availability. */
  static async getAvailability(id) {
    const res = await this.request(`availabilities/id/${id}`);
    return res.availability; 
  }

  /** Get all availabilities for search data. */
  static async getAllAvailabilities(username, data) {
    const res = await this.request(`availabilities/search/${username}`, data, "post");
    return res.availabilities;
  }

  /** Add an availability. */
  static async addAvailability(username, data) {
    data = {...data, roleId: Number(data.roleId)};
    const res = await this.request(`availabilities/${username}`, data, "post");
    return res.availability;
  }

  /** Get availabilities for a specific user. */
  static async getUserAvailabilities(username) {
    const res = await this.request(`availabilities/${username}`);
    return res.availabilities;
  }

  /** Delete an availability. */
  static async deleteAvailability(username, id, data={}) {
    const res = await this.request(`availabilities/${username}/${id}`, data, "delete");
    return res;
  }

  /** Update availability. */
  static async updateAvailability(username, id, data) {
    data = {...data, roleId: Number(data.roleId)};
    const res = await this.request(`availabilities/${username}/${id}`, data, "patch");
    return res.availability;
  }

  /** Booking methods ********************   */

  /** Get a booking. */
  static async getBooking(id) {
    const res = await this.request(`bookings/id/${id}`);
    return res.booking; 
  }

  /** Get all bookings for search data. */
  static async getAllBookings(data) {
    const res = await this.request("bookings/dates", data);
    return res.bookings;
  }

  /** Add a booking. */
  static async addBooking(username, data) {
    const res = await this.request(`bookings/${username}`, data, "post");
    return res.booking;
  }

  /** Get bookings for a specific user. */
  static async getUserBookings(username) {
    const res = await this.request(`bookings/${username}`);
    return res.bookings;
  }

  /** Delete a booking. */
  static async deleteBooking(username, id, data={}) {
    const res = await this.request(`bookings/${username}/${id}`, data, "delete");
    return res;
  }

}

export default HostAPetApi;