const fs = require("fs/promises");
const path = require("path");
const { resc, users, orders } = require("../data/products");

const dataFilePath = path.join(__dirname, "..", "data", "products.js");

const UTILS = {
  loadFromSetData: async () => {
    try {
      const data = {
        products: resc,
        users,
        orders,
      };
      return data;
    } catch (error) {
      console.error("Error loading data from file:", error);
      return null;
    }
  },

  loadAndSetData: async () => {
    try {
      const data = await UTILS.loadFromSetData();
      return data;
    } catch (error) {
      console.error("Error loading and setting data:", error);
      return null;
    }
  },

  startWatcher: () => {
    fs.watch(dataFilePath, async (eventType, filename) => {
      if (eventType === "change") {
        console.log(`File ${filename} changed. Reloading data.`);
        await UTILS.loadAndSetData();
      }
    });
  },
};

module.exports = UTILS;
