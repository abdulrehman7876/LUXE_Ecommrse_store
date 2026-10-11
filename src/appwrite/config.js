import conf from "../conf/conf";
import { Client, Account, TablesDB, ID } from "appwrite";

export class Service {
  client = new Client();
  tablesDB;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
  }

  async createCart({ product, quantity = 1 }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionCartId,
        rowId: ID.unique(),
        data: {
          product: JSON.stringify(product),
          quantity: JSON.stringify(quantity),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateCart({ product, quantity }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionCartId,
        rowId: product.id,
        data: { product, quantity },
      });
    } catch (error) {
      throw error;
    }
  }

  async getCart({ product }) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionCartId,
        rowId: product.id,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteCart({ product }) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionCartId,
        rowId: product.id,
      });
    } catch (error) {
      throw error;
    }
  }

  async createWishlist({ product }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionWishlistId,
        rowId: product.id,
        data: { product },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateWishlist({ product }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionWishlistId,
        rowId: product.id,
        data: { product },
      });
    } catch (error) {
      throw error;
    }
  }

  async getWishlist({ product }) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionWishlistId,
        rowId: product.id,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteWishlist({ product }) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteCollectionWishlistId,
        rowId: product.id,
      });
    } catch (error) {
      throw error;
    }
  }
}

const service = new Service();
export default service;
