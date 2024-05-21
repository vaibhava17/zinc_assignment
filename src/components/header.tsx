import React from "react";
import { observer } from "mobx-react";
import { Badge, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import productStore from "../store/products";

interface HeaderProps {
  onClickCartButton: () => void;
  headerLabel?: string;
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f0f0f0",
  },
};

const Header = observer((props: HeaderProps) => {
  const { onClickCartButton, headerLabel = "My Store" } = props;
  return (
    <div style={styles.header}>
      <h1 className="text-3xl">{headerLabel}</h1>
      <Badge count={productStore.cartItemCount}>
        <Button
          icon={<ShoppingCartOutlined style={{ fontSize: "24px" }} />}
          onClick={onClickCartButton}
        />
      </Badge>
    </div>
  );
});

export default Header;
