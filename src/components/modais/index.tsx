import React, { useRef } from "react";
import {
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { personCircle, checkmarkDone } from "ionicons/icons";

import "./main.css";

function Modal() {
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    console.log("fechou");
    modal.current?.dismiss();
  }

  return (
    <>
      <IonButton id="open-custom-dialog" fill="clear">
        Finalizar compra
      </IonButton>
      <IonContent class="ion-padding">
        <IonModal id="modal" ref={modal} trigger="open-custom-dialog">
          <div className="wrapper">
            <h1>Compra</h1>
            <div className="flex justify-center items-center">
              <IonIcon icon={checkmarkDone} color="success"></IonIcon>
            </div>
            <h2 className="px-6 pb-12">Compra finalizada com succeso!</h2>
          </div>
          <div className="w-full flex absolute bottom-0 justify-end">
            <IonButton fill="clear">Ver mais</IonButton>
            <IonButton fill="clear">Ok</IonButton>
          </div>
        </IonModal>
      </IonContent>
    </>
  );
}

export default Modal;
