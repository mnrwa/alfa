import styles from "./productCard.module.scss";

import { useNavigate } from "react-router-dom";

import type { ProductCardProps } from "../../types/product";

import { Button, Card } from "antd";
import { DeleteOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";

import { ROUTES } from "../../routes";

export function ProductCard({
  product,
  isLiked,
  onLike,
  onDelete,
}: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{
        width: 240,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      cover={
        <div style={{ height: 300, overflow: "hidden" }}>
          <img
            draggable={false}
            alt={product.title}
            src={product.image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      }
      onClick={() => navigate(ROUTES.PRODUCT_BY_ID(product.id.toString()))}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <Card.Meta
        title={product.title}
        description={
          <div>
            <p className={styles.description}>{product.description}</p>
            <div>
              <p className={styles.genre}>{product.genre}</p>
              <div>
                <div>
                  <strong>Рейтинг: </strong>
                  {product.rating}
                </div>
                <div>
                  <strong>Сезонов: </strong> {product.seasons}
                </div>
                <div>
                  <strong>Год выпуска: </strong> {product.year}
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button type="text" size="large" onClick={onDelete}>
                <DeleteOutlined />
              </Button>

              <Button
                type="text"
                size="large"
                icon={
                  isLiked ? (
                    <HeartFilled style={{ color: "red" }} />
                  ) : (
                    <HeartOutlined />
                  )
                }
                onClick={onLike}
              />
            </div>
          </div>
        }
      />
    </Card>
  );
}
