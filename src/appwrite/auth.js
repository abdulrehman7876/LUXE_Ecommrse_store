import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
  async updateName(name) {
    try {
      const user = await this.account.updateName({ name });
      return user;
    } catch (error) {
      console.error("Error updating name: ", error);
      throw error;
    }
  }

  async updateEmail({ email, password }) {
    try {
      const user = await this.account.updateEmail({ email, password });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async updatePassword({ currentPassword, newPassword }) {
    try {
      const user = await this.account.updatePassword({
        password: newPassword,
        oldPassword: currentPassword,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
