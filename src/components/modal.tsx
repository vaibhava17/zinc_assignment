import React from "react";
import { observer } from "mobx-react";
import { Modal, Button, Input, Rate } from "antd";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import productStore from "../store/products";

interface ModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const AppModal: React.FC<ModalProps> = observer(
  ({ isModalOpen, handleOk, handleCancel }) => {
    const totalCost = productStore.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const handleDelete = (id: number) => {
      productStore.removeFromCart(id);
    };

    const handlePlus = (id: number) => {
      productStore.incrementCartItem(id);
    };

    const handleMinus = (id: number) => {
      productStore.decrementCartItem(id);
    };

    const handleQuantityChange = (id: number, quantity: number) => {
      productStore.handleQuantityChange(id, quantity);
    };

    return (
      <Modal
        title="Cart"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="totalCost" type="text" className="float-left p-0 font-semibold">
            Total Cost: ${totalCost.toFixed(2)}
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={productStore.cartItems.length <= 0}
          >
            Checkout
          </Button>,
        ]}
      >
        {productStore.cartItems.length > 0 ? (
          <ul>
            {productStore.cartItems.map((item, index) => (
              <li key={index} className="border-solid border border-sky-500 rounded p-2.5 mb-2.5" >
                <div className="flex items-center justify-between">
                  <div className="flex items-start justify-between flex-col">
                    <span>
                      {item.title} - <b>${item.price}</b>
                    </span>
                    <Rate disabled defaultValue={item.rating.rate} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleDelete(item.id)}
                      icon={<DeleteOutlined />}
                      danger
                    />
                    <Button
                      onClick={() => handleMinus(item.id)}
                      icon={<MinusOutlined />}
                    />
                    <Input
                      type="text"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          handleQuantityChange(item.id, Math.max(value, 1));
                        }
                      }}
                      className="w-12 text-center"
                    />
                    <Button
                      onClick={() => handlePlus(item.id)}
                      icon={<PlusOutlined />}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">Your cart is empty</div>
        )}
      </Modal>
    );
  }
);

export default AppModal;
