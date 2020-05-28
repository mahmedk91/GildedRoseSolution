const { Shop } = require("../../src/gilded_rose");
const { Item } = require("../../src/items");

const itemName = "Conjured";

/* GENERAL TESTS FOR CONJURED ITEM */
describe("Conjured item in shop", function() {
  it("cannot have less than 0 quality", function() {
    const t = () => {
      const sellIn = 50;
      const quality = -1;
      let item = new Item(itemName, sellIn, quality);
      new Shop([item]);
    };
    expect(t).toThrow("Invalid item quantity");
  });

  it("cannot have more than 50 quality", function() {
    const t = () => {
      const sellIn = 50;
      const quality = 51;
      let item = new Item(itemName, sellIn, quality);
      new Shop([item]);
    };
    expect(t).toThrow("Invalid item quantity");
  });
});

/* TESTS FOR RUNNING SHOP */
describe("Conjured item in running shop", function() {
  it("always decreases sell-in days by 1", function() {
    const sellIn = 50;
    const quality = 40;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for 10 days more than sell in days
    for (i = sellIn; i > -10; i--) {
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.sellIn).toBe(i - 1);
    }
  });

  it("never increases in quality", function() {
    const sellIn = 50;
    const quality = 40;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for 10 days more than sell in days
    for (i = sellIn; i > -10; i--) {
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.quality).toBeLessThanOrEqual(quality);
    }
  });

  it("can have atmost 50 quality", function() {
    const sellIn = 50;
    const quality = 50;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for 10 days more than sell in days
    for (i = sellIn; i > -10; i--) {
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.quality).toBeLessThanOrEqual(50);
    }
  });

  it("can have atleast 0 quality", function() {
    const sellIn = 50;
    const quality = 7;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for 10 days more than sell in days
    for (i = sellIn; i > -10; i--) {
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.quality).toBeGreaterThanOrEqual(0);
    }
  });
});

/* TESTS FOR RUNNING SHOP ONLY WITHIN SELLIN DAYS */
describe("Conjured item in running shop within sell in days", function() {
  it("decreases quality by 2", function() {
    const sellIn = 20;
    const quality = 17;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for all sellin days
    for (i = sellIn; i > 0; i--) {
      const expectedQuality = item.quality - 2 >= 0 ? item.quality - 2 : 0;
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.quality).toBe(expectedQuality);
    }
  });
});

/* TESTS FOR RUNNING SHOP ONLY AFTER SELLIN DAYS */
describe("Conjured item in running shop after sell in days", function() {
  it("decreases quality by 4", function() {
    const sellIn = 0;
    const quality = 28;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for next 10 days after sell in days
    for (i = 0; i < sellIn + 10; i++) {
      const expectedQuality = item.quality - 4 >= 0 ? item.quality - 4 : 0;
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.quality).toBe(expectedQuality);
    }
  });
});
