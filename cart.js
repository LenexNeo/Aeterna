// Aeterna Shopping Cart - shared across pages
const Cart = {
  items: JSON.parse(localStorage.getItem('aeterna_cart') || '[]'),
  save() { localStorage.setItem('aeterna_cart', JSON.stringify(this.items)); },
  add(item) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) { existing.qty += 1; } else { this.items.push({...item, qty: 1}); }
    this.save(); this.updateBadge();
  },
  remove(id) { this.items = this.items.filter(i => i.id !== id); this.save(); this.updateBadge(); },
  updateQty(id, qty) {
    if (qty < 1) { this.remove(id); return; }
    const item = this.items.find(i => i.id === id);
    if (item) { item.qty = qty; this.save(); this.updateBadge(); }
  },
  total() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); },
  count() { return this.items.reduce((s, i) => s + i.qty, 0); },
  clear() { this.items = []; this.save(); this.updateBadge(); },
  updateBadge() {
    const b = document.getElementById('cart-badge');
    if (b) { const c = this.count(); b.textContent = c; b.style.display = c > 0 ? 'flex' : 'none'; }
  }
};
