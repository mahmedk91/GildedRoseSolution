const { Shop } = require("../../src/gilded_rose");
const { Item } = require("../../src/items");

const itemName = "Sulfuras, Hand of Ragnaros";

/* GENERAL TESTS FOR SULFURAS ITEM */
describe("Sulfuras item in shop", function() {
  it("cannot have less than 80 quality", function() {
    const t = () => {
      const sellIn = 50;
      const quality = 79;
      let item = new Item(itemName, sellIn, quality);
      new Shop([item]);
    };
    expect(t).toThrow("Invalid item quantity");
  });

  it("cannot have more than 80 quality", function() {
    const t = () => {
      const sellIn = 50;
      const quality = 81;
      let item = new Item(itemName, sellIn, quality);
      new Shop([item]);
    };
    expect(t).toThrow("Invalid item quantity");
  });
});

/* TESTS FOR RUNNING SHOP */
describe("Sulfuras item in running shop", function() {
  it("never decreases sell-in days", function() {
    const sellIn = 50;
    const quality = 80;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for 10 days more than sell in days
    for (i = sellIn; i > -10; i--) {
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.sellIn).toBe(sellIn);
    }
  });

  it("retain its quality", function() {
    const sellIn = 50;
    const quality = 80;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for 10 days more than sell in days
    for (i = sellIn; i > -10; i--) {
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.quality).toBe(quality);
    }
  });
});
