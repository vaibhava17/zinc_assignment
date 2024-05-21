import React from "react";
import { Card, Button, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Product } from "../store/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const styles = {
  card: {
    width: "auto",
    height: "100%",
    display: "flex",
    flexFlow: "column",
  },
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card
      hoverable
      style={styles.card}
      cover={
        <img
          alt={product.title}
          src={product.image}
          style={{
            aspectRatio: "2 / 3",
            objectFit: "contain",
            height: "auto",
            width: "calc(70% - 48px)",
            margin: "24px auto 0",
          }}
        />
      }
    >
      <div className="flex justify-between items-start flex-col min-h-full">
        <div className="flex justify-between items-start flex-col min-w-full">
          <h3 className="text-lg">{product.title}</h3>
          <span className="text-lg font-semibold">${product.price}</span>
          <Rate disabled value={product.rating.rate} allowHalf />
        </div>

        <Button
          onClick={() => onAddToCart(product)}
          icon={<ShoppingCartOutlined />}
          className="min-w-full mt-5"
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
