// ==============================================================================
// Topic 14 Starter: Shopping Cart Module (Default Export)
// ==============================================================================

export default class Cart {
  constructor(taxRate = 0.08) {
    this.items = [];
    this.taxRate = taxRate;
  }

  addItem(name, price) {
    // TODO: Add item { id: Date.now(), name, price } to this.items
  }

  getSubtotal() {
    // TODO: Calculate subtotal using .reduce()
    return 0;
  }

  getTax() {
    // TODO: Subtotal * this.taxRate
    return 0;
  }

  getTotal() {
    // TODO: Subtotal + Tax
    return 0;
  }
}
