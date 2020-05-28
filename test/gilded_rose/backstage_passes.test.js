const { Shop } = require("../../src/gilded_rose");
const { Item } = require("../../src/items");

const itemName = "Backstage passes to a TAFKAL80ETC concert";

/* GENERAL TESTS FOR BACKSTAGE PASS ITEM */
describe("Backstage pass item in shop", function() {
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
describe("Backstage pass item in running shop", function() {
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

  it("can have atmost 50 quality", function() {
    const sellIn = 50;
    const quality = 40;
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
    const quality = 0;
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

/* TESTS FOR RUNNING SHOP WITHIN SELLIN DAYS */
describe("Backstage pass item in running shop within sell in days", function() {
  it("never decrease in quality", function() {
    const sellIn = 50;
    const quality = 40;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for all sell in days
    for (i = sellIn; i > 0; i--) {
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.quality).toBeGreaterThanOrEqual(quality);
    }
  });

  it("increases quality by 1 if more than 10 days left to sell", function() {
    const sellIn = 20;
    const quality = 48;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for next 10 days
    for (i = sellIn; i > 10; i--) {
      const expectedQuality = item.quality + 1 <= 50 ? item.quality + 1 : 50;
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.quality).toBe(expectedQuality);
    }
  });

  it("increases quality by 2 if less than 10 days left to sell", function() {
    const sellIn = 10;
    const quality = 45;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for next 5 days
    for (i = sellIn; i > 5; i--) {
      const expectedQuality = item.quality + 2 <= 50 ? item.quality + 2 : 50;
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.quality).toBe(expectedQuality);
    }
  });

  it("increases quality by 3 if less than 5 days left to sell", function() {
    const sellIn = 5;
    const quality = 43;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for next 5 days
    for (i = sellIn; i > 0; i--) {
      const expectedQuality = item.quality + 3 <= 50 ? item.quality + 3 : 50;
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.quality).toBe(expectedQuality);
    }
  });
});

/* TESTS FOR RUNNING SHOP AFTER SELLIN DAYS */
describe("Backstage pass item in running shop after sell in days", function() {
  it("is expired", function() {
    const sellIn = 0;
    const quality = 50;
    let item = new Item(itemName, sellIn, quality);
    const shop = new Shop([item]);

    // Run shop for next 10 days after sell in days
    for (i = 0; i < sellIn + 10; i++) {
      const shopItems = shop.updateQuality();
      item = shopItems[0];
      expect(item.quality).toBe(0);
    }
  });
});
