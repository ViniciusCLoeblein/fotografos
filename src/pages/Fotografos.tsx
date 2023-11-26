import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCol,
  IonGrid,
  IonRow,
  IonIcon,
  useIonToast,
} from "@ionic/react";
import Card from "../components/cards";
import { Ialbum, fotografos } from "../mocks";
import { useState } from "react";
import { arrowBack } from "ionicons/icons";

const isEqual = (obj1: Ialbum, obj2: Ialbum): boolean => {
  if (obj1.id == obj2.id) {
    return true;
  }

  return false;
};

const Fotografos = () => {
  const [present] = useIonToast();
  const [tab, setTab] = useState("Fotografos");
  const [fotografo, setFotografo] = useState(0);
  const [evento, setEvento] = useState(0);

  const handleTab = (
    tab: string,
    fotografo?: number,
    evento?: number,
    itemCart?: Ialbum
  ) => {
    setTab(tab);

    if (fotografo) {
      setFotografo(fotografo);
    } else if (evento) {
      setEvento(evento);
    } else if (itemCart) {
      handleAddCart(itemCart);
    }
  };

  const handleBack = () => {
    switch (tab) {
      case "Eventos":
        handleTab("Fotografos");
        break;
      case "Album":
        handleTab("Eventos");
        break;
    }
  };

  const handleAddCart = (newItem: Ialbum) => {
    const existingCart: Ialbum[] = JSON.parse(
      localStorage.getItem("cart") ?? "[]"
    );

    const isItemInCart = existingCart.some((item) => isEqual(item, newItem));

    if (!isItemInCart) {
      const updatedCart = [...existingCart, newItem];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));

      present({
        message: "Adicionado com sucesso!",
        duration: 1500,
        position: "top",
        color: "success",
      });
    } else {
      present({
        message: "Já adiconado ao carrinho",
        duration: 1500,
        position: "top",
        color: "warning",
      });
    }
  };

  const renderTab = () => {
    switch (tab) {
      case "Fotografos":
        return fotografos.map((fotografo, i) => (
          <IonCol key={fotografo.id}>
            <Card
              nome={fotografo.nome}
              desc={fotografo.desc}
              descButton="Ver Eventos"
              onClick={() => handleTab("Eventos", i)}
            />
          </IonCol>
        ));
      case "Eventos":
        return fotografos[fotografo].eventos.map((evento, i) => (
          <IonCol key={evento.id}>
            <Card
              nome={evento.nome}
              desc={evento.data}
              descButton="Ver Álbum"
              onClick={() => handleTab("Album", undefined, i)}
            />
          </IonCol>
        ));
      case "Album":
        return fotografos[fotografo].eventos[evento].album.map((foto, i) => (
          <IonCol key={foto.id}>
            <Card
              nome={foto.descricao}
              linkImg={foto.linkFoto}
              descButton="Add ao carrinho"
              price={"R$ " + foto.preco}
              onClick={() =>
                handleTab("Fotografos", undefined, undefined, foto)
              }
            />
          </IonCol>
        ));
      default:
        return <></>;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {tab !== "Fotografos" && (
              <IonIcon
                icon={arrowBack}
                size="medium"
                onClick={handleBack}
                className="cursor-pointer"
              />
            )}{" "}
            {tab}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid
          class="xl"
          style={{
            height: `calc(100vh - 60px)`,
            backgroundColor: "#0e5d7d57",
            color: "white",
          }}
        >
          <IonRow>{renderTab()}</IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Fotografos;
