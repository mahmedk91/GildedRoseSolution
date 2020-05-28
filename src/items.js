// The original item class. Not to be changed or the hell breaks loose
class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// ShopItem wraps the original item class to be used in shop
class ShopItem {
  constructor(item) {
    if (item.quality < this.minQuality() || item.quality > this.maxQuality()) {
      throw "Invalid item quantity";
    }

    this.name = item.name;
    this.sellIn = item.sellIn;
    this.quality = item.quality;
  }

  // item must have atleast 0 quality
  minQuality() {
    return 0;
  }

  // item must have atmost 50 quality
  maxQuality() {
    return 50;
  }

  // Updates quality for normal item
  updateQuality() {
    // quality doesn't detoriate more than 0
    if (this.quality == 0) {
      return;
    }

    // quality detoriates by 1 within sell-in time
    if (this.sellIn > 0) {
      this.quality--;
      return;
    }

    // quality detoriates by 2 after sell-in time has passed
    this.quality = this.quality - 2 >= 0 ? this.quality - 2 : 0;
  }

  updateSellIn() {
    // sell-in days decreases by 1 each day
    this.sellIn--;
  }
}

// Aged Brie item
class AgedBrie extends ShopItem {
  // Updates quality for aged brie item
  updateQuality() {
    // Quality doesn't increase more than 50
    if (this.quality >= 50) {
      return;
    }

    // Quality improves by 1 within sell-in time
    if (this.sellIn > 0) {
      this.quality++;
      return;
    }

    // Quality improves by 2 after sell-in time
    this.quality = this.quality + 2 <= 50 ? this.quality + 2 : 50;
  }
}

// Backstage Passes item
class BackstagePasses extends ShopItem {
  // Updates quality for backstage passes item
  updateQuality() {
    // Quality expires after sell-in time
    if (this.sellIn <= 0) {
      this.quality = 0;
      return;
    }

    // Quality doesn't increase more than 50
    if (this.quality >= 50) {
      return;
    }

    if (this.sellIn > 10) {
      // Quality increases by 1 when more then 10 days left
      this.quality++;
    } else if (this.sellIn > 5) {
      // Quality increases by 2 when there are 10 days or less
      this.quality = this.quality + 2 <= 50 ? this.quality + 2 : 50;
    } else {
      // Quality increases by 2 when there are 5 days or less
      this.quality = this.quality + 3 <= 50 ? this.quality + 3 : 50;
    }
  }
}

// Sulfuras item
class Sulfuras extends ShopItem {
  // Sulfuras has always 80 quality
  minQuality() {
    return 80;
  }

  // Sulfuras has always 80 quality
  maxQuality() {
    return 80;
  }

  // Sulfuras quality never changes
  updateQuality() {}

  // Sulfuras cannot be sold
  updateSellIn() {}
}

// Conjured item
class Conjured extends ShopItem {
  // Updates quality for conjured item
  updateQuality() {
    // conjured items degrade in Quality twice as fast as normal items
    super.updateQuality();
    super.updateQuality();
  }
}

module.exports = {
  Item,
  ShopItem,
  AgedBrie,
  BackstagePasses,
  Sulfuras,
  Conjured
};
