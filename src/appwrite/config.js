import conf from "../conf/conf";
import { Client, TablesDB, Permission, Role } from "appwrite";

// Keep only what the UI needs so one row stays small
function slim(item) {
  const {
    id,
    title,
    thumbnail,
    brand,
    price,
    discountPercentage,
    stock,
    rating,
    category,
    description,
    quantity,
  } = item;
  const out = {
    id,
    title,
    thumbnail,
    brand,
    price,
    discountPercentage,
    stock,
    rating,
    category,
    description,
  };
  if (quantity !== undefined) out.quantity = quantity;
  return out;
}

export class Service {
  client = new Client();
  tablesDB;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
  }

  async _getItems(tableId, userId) {
    try {
      const row = await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId,
        rowId: userId,
      });
      return JSON.parse(row.items || "[]");
    } catch (error) {
      if (error?.code === 404) return []; // user has no row yet
      throw error;
    }
  }

  async _saveItems(tableId, userId, items) {
    const me = Role.user(userId);
    return this.tablesDB.upsertRow({
      databaseId: conf.appwriteDatabaseId,
      tableId,
      rowId: userId,
      data: { items: JSON.stringify(items.map(slim)) },
      permissions: [
        Permission.read(me),
        Permission.update(me),
        Permission.delete(me),
      ],
    });
  }

  getCart(userId) {
    return this._getItems(conf.appwriteCollectionCartId, userId);
  }
  saveCart(userId, items) {
    return this._saveItems(conf.appwriteCollectionCartId, userId, items);
  }
  getWishlist(userId) {
    return this._getItems(conf.appwriteCollectionWishlistId, userId);
  }
  saveWishlist(userId, items) {
    return this._saveItems(conf.appwriteCollectionWishlistId, userId, items);
  }
}

const service = new Service();
export default service;
