import {
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid
          style={{
            height: `calc(100vh - 60px)`,
            backgroundColor: "#0e5d7d57",
            color: "white",
          }}
        >
          <IonLabel>
            <h1 style={{ fontWeight: "bold", paddingLeft: "30px" }}>
              Bem-vindo ao App!
            </h1>
            <p style={{ fontWeight: "bolder", paddingLeft: "30px" }}>
              Utilize o menu abaixo para navegação
            </p>
          </IonLabel>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
