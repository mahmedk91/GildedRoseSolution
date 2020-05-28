const {
  ShopItem,
  AgedBrie,
  BackstagePasses,
  Sulfuras,
  Conjured
} = require("./items");

class Shop {
  constructor(items = []) {
    // list of items in shop
    this.items = Array();

    for (let item of items) {
      if (item.name.includes("Aged Brie")) {
        this.items.push(new AgedBrie(item));
      } else if (item.name.includes("Backstage passes")) {
        this.items.push(new BackstagePasses(item));
      } else if (item.name.includes("Sulfuras")) {
        this.items.push(new Sulfuras(item));
      } else if (item.name.includes("Conjured")) {
        this.items.push(new Conjured(item));
      } else {
        this.items.push(new ShopItem(item));
      }
    }
  }

  // Updates quality of all items for a single day
  updateQuality() {
    for (let item of this.items) {
      item.updateQuality();
      item.updateSellIn();
    }
    return this.items;
  }
}

module.exports = {
  Shop
};
