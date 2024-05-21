import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import productStore, { Product } from "../store/products";
import Header from "../components/header";
import ProductCard from "../components/card";
import { Row, Col } from "antd";
import AppModal from "../components/modal";
import FilterComponent from "../components/filter";
import { LoadingOutlined } from "@ant-design/icons";

const Home = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productStore.fetchProducts().finally(() => {
      setLoading(false);
    });
  }, []);

  const handleAddToCart = (product: Product) => {
    productStore.addToCart(product);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header onClickCartButton={showModal} />
      <div className="mx-auto p-4">
        <Row gutter={[16, 16]}>
          <Col span={5}>
            <FilterComponent />
          </Col>
          <Col span={19}>
            <h1 className="text-2xl mb-4">Product List</h1>
            {loading ? (
              <Row>
                <Col span={24}>
                  <div
                    style={{
                      height: "50vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LoadingOutlined
                      style={{
                        fontSize: "50px",
                      }}
                    />
                  </div>
                </Col>
              </Row>
            ) : (
              <Row gutter={[16, 16]}>
                {productStore.filteredProducts.length > 0 ? (
                  productStore.filteredProducts.map((product, index) => (
                    <Col span={6} key={index}>
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    </Col>
                  ))
                ) : (
                  <Col span={24}>
                    <div
                      style={{
                        height: "50vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      No products found.
                    </div>
                  </Col>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </div>
      <AppModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
});

export default Home;
