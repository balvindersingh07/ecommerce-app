// Shoes.jsx  (FakeStoreAPI doesn’t have shoes category, so showing men's clothing instead)
import React from "react";
import ProductGrid from "../../components/ProductGrid";

export default function Shoes() {
  return <ProductGrid category="men's clothing" />;
}
