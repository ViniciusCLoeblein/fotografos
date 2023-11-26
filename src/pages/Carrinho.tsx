import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonCheckbox,
  IonButton,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { Ialbum } from "../mocks";
import { useHistory } from "react-router";

const Carrinho = () => {
  const history = useHistory();
  const [present] = useIonToast();
  const [cart, setCart] = useState<Ialbum[]>(
    JSON.parse(localStorage.getItem("cart") ?? "[]")
  );

  const handleCheck = (index: number) => {
    const updatedCart = [...cart];

    updatedCart[index] = {
      ...updatedCart[index],
      active: !updatedCart[index].active,
    };

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, foto) => (foto.active ? total + foto.preco : total),
      0
    );
  };

  const finishSale = () => {
    localStorage.removeItem("cart");
    present({
      message: "Venda finzalizada com sucesso!",
      duration: 1500,
      position: "top",
      color: "success",
    });
    setCart([]);
    history.push("/home");
  };

  window.addEventListener("cartUpdated", () => {
    const updatedCart = JSON.parse(localStorage.getItem("cart") ?? "[]") || [];
    setCart(updatedCart);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Carrinho</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {cart.map((foto, index) => (
            <IonItem key={foto.id}>
              <IonCheckbox
                labelPlacement="end"
                checked={foto.active}
                onClick={() => handleCheck(index)}
              >
                <IonLabel>
                  {foto.descricao} {"R$ " + foto.preco}
                </IonLabel>
              </IonCheckbox>
            </IonItem>
          ))}
        </IonList>
        <div className="absolute w-full bottom-0 pb-14">
          <IonButton expand="full" color="success" onClick={() => finishSale()}>
            Total: R$ {calculateTotal().toFixed(2)} Finalizar Compra
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Carrinho;
