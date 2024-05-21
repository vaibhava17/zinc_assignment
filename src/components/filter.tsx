import React, { useState } from "react";
import { Select, Slider, InputNumber, Button, Row, Col } from "antd";
import { observer } from "mobx-react";
import productStore, { Filters } from "../store/products";

const { Option } = Select;

const FilterComponent: React.FC = observer(() => {
  const [filters, setFilters] = useState<Filters>({
    category: "",
    priceRange: productStore.priceRange,
    rating: 0,
  });

  const handleFilterChange = (key: keyof Filters, value: any) => {
    if (Array.isArray(value)) {
      setFilters({
        ...filters,
        [key]: value,
      });
    } else {
      setFilters({
        ...filters,
        [key]: value,
      });
    }
  };

  const applyFilters = () => {
    productStore.applyFilters(filters);
  };

  const clearFilters = () => {
    const defaultFilters: Filters = {
      category: "",
      priceRange: productStore.priceRange,
      rating: 0,
    };
    setFilters(defaultFilters);
    productStore.applyFilters(defaultFilters);
  };

  return (
    <>
      <h1 className="text-2xl mb-4">Filter</h1>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <span className="text-lg font-semibold">Category</span>
          <div className="min-w-full"></div>
          <Select
            value={filters.category}
            onChange={(value: string) => handleFilterChange("category", value)}
            style={{ width: 200 }}
          >
            <Option value="">All</Option>
            {productStore.categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <span className="text-lg font-semibold">Price Range</span>
          <div className="min-w-full"></div>
          <Slider
            range
            min={productStore.priceRange[0]}
            max={productStore.priceRange[1]}
            defaultValue={productStore.priceRange}
            value={filters.priceRange}
            onChange={(value) => handleFilterChange("priceRange", value as [number, number])}
          />
        </Col>
        <Col span={24}>
          <span className="text-lg font-semibold">Rating</span>
          <div className="min-w-full"></div>
          <InputNumber
            min={0}
            max={5}
            step={0.1}
            value={filters.rating}
            onChange={(value: any) => handleFilterChange("rating", value)}
            style={{ width: 100 }}
          />
        </Col>
        <Col span={24} style={{ display: "flex", gap: 12 }}>
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
          <Button onClick={clearFilters} style={{ width: "100%" }}>
            Clear Filters
          </Button>
        </Col>
      </Row>
    </>
  );
});

export default FilterComponent;
