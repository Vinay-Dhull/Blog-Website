import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    try {
      this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
      this.account = new Account(this.client);
    } catch (error) {
      console.error("AuthService initialization failed:", error);
      throw new Error("Failed to initialize authentication service");
    }
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!userAccount) {
        throw new Error("Account creation failed");
      }

      
      return await this.login({ email, password });
    } catch (error) {
      console.error("Account creation error:", {
        error: error.message,
        email,
        name,
      });
      throw this._normalizeError(error);
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      if (!session) {
        throw new Error("Session creation failed");
      }
      return session;
    } catch (error) {
      console.error("Login error:", {
        error: error.message,
        email,
      });
      throw this._normalizeError(error);
    }
  }
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user || null;
    } catch (error) {
      console.error("Get current user error:", error.message);
      return null;
    }
  }

  async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}
  

 
const authService = new AuthService();

export default authService;
