import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import Modal from "../modais";

interface CardProps {
  nome: string;
  desc?: string;
  linkImg?: string;
  descButton: string;
  modal?: boolean;
  onClick: () => void;
  price?: string | number;
}

function Card({
  nome,
  desc,
  linkImg,
  descButton,
  modal,
  onClick,
  price,
}: Readonly<CardProps>) {
  return (
    <IonCard className="h-60 max-w-[450px]">
      {linkImg && <img alt="img" src={linkImg} className="h-36 w-full" />}
      <IonCardHeader>
        <IonCardTitle>{nome}</IonCardTitle>
      </IonCardHeader>

      {desc && <IonCardContent>{desc}</IonCardContent>}

      <div className="w-full flex absolute bottom-0 justify-between ml-2">
        {modal ? (
          <Modal />
        ) : (
          <>
            {price && <h2>{price}</h2>}
            <IonButton fill="clear" color="primary" onClick={onClick}>
              {descButton}
            </IonButton>
          </>
        )}
      </div>
    </IonCard>
  );
}
export default Card;
