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
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name,
    );
    if (userAccount) {
      return this.login({ email, password });
    }
    return userAccount;
  }

  async login({ email, password }) {
    return this.account.createEmailPasswordSession(email, password);
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      return null;
    }
  }

  async logout() {
    await this.account.deleteSessions();
  }

  async updateName(name) {
    return this.account.updateName({ name });
  }

  async updateEmail({ email, password }) {
    return this.account.updateEmail({ email, password });
  }

  async updatePassword({ currentPassword, newPassword }) {
    return this.account.updatePassword({
      password: newPassword,
      oldPassword: currentPassword,
    });
  }
}

const authService = new AuthService();

export default authService;
