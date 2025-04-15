const DummyOrders = [
  {
    id: "ORD1001",
    date: "2024-08-15",
    amount_total: 4999,
    status: "Delivered",
    items: [
      { name: "Wireless Mouse", quantity: 1, price: 1999 },
      { name: "Keyboard", quantity: 1, price: 3000 },
    ],
  },
  {
    id: "ORD1002",
    date: "2024-08-20",
    amount_total: 8999,
    status: "Shipped",
    items: [{ name: "Gaming Headset", quantity: 1, price: 8999 }],
  },
  {
    id: "ORD1003",
    date: "2024-08-25",
    amount_total: 2999,
    status: "Processing",
    items: [{ name: "USB-C Charger", quantity: 1, price: 2999 }],
  },
];

export default DummyOrders;
