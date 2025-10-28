import { useEffect, useState } from "react";

import { Button, Drawer, Modal } from "antd";
import { HeartOutlined } from "@ant-design/icons";

import { allProducts, deleteProductById } from "../../utils/api";
import { ProductCard } from "../../components/ProductCard/ProductCard";

import type { Product } from "../../types/product";

import styles from "./viewProducts.module.scss";

export function ViewProducts() {
  const [serials, setSerials] = useState<Product[]>([]);
  const [likedCards, setLikedCards] = useState<number[]>([]);
  const [deletedProductId, setDeletedProductId] = useState<number | null>(null);

  const [isModalDeleteOpen, setIsModaDeletelOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const showFavorites = () => setIsFavoritesOpen(true);
  const hideFavorites = () => setIsFavoritesOpen(false);

  const handleLike = (id: number) => {
    setLikedCards((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  };

  const handleDelete = async () => {
    if (!deletedProductId) return;

    try {
      await deleteProductById(deletedProductId);
      window.location.reload();
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await allProducts();
        setSerials(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadProduct();
  }, []);

  const productToDelete = serials.find(
    (product) => product.id === deletedProductId
  );

  return (
    <>
      <Button
        type="default"
        variant="outlined"
        onClick={showFavorites}
        style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}
      >
        <HeartOutlined style={{ color: "red" }} /> Избранное (
        {likedCards.length})
      </Button>

      <Modal
        title={`Удалить "${productToDelete?.title}"`}
        open={isModalDeleteOpen}
        onOk={handleDelete}
        onCancel={() => setIsModaDeletelOpen(false)}
        okText="Удалить"
        cancelText="Отмена"
        okButtonProps={{ danger: true }}
        width={400}
        style={{ top: "20%", transform: "translateY(-50%)" }}
      >
        <p>
          Вы уверены, что хотите удалить эту карточку? Это действие нельзя
          отменить.
        </p>
      </Modal>
      <div className={styles.container}>
        {serials.map((serial) => (
          <ProductCard
            key={serial.id}
            product={serial}
            isLiked={likedCards.includes(serial.id)}
            onLike={() => handleLike(serial.id)}
            onDelete={() => {
              setDeletedProductId(serial.id);
              setIsModaDeletelOpen(true);
            }}
          />
        ))}
      </div>

      <Drawer
        title={`Избранное (${likedCards.length})`}
        placement="right"
        onClose={hideFavorites}
        open={isFavoritesOpen}
        width={350}
        className={styles.favoritesDrawer}
      >
        {likedCards.length === 0 ? (
          <div className={styles.emptyState}>
            <HeartOutlined className={styles.emptyIcon} />
            <p>Нет избранных карточек</p>
          </div>
        ) : (
          <div className={styles.favoritesList}>
            {serials
              .filter((product) => likedCards.includes(product.id))
              .map((product) => (
                <div key={product.id} className={styles.favoriteItem}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.favoriteImage}
                  />
                  <div className={styles.favoriteContent}>
                    <div className={styles.favoriteTitle}>{product.title}</div>
                    <div className={styles.favoriteGenre}>{product.genre}</div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </Drawer>
    </>
  );
}
