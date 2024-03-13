import { IonBackButton, IonButton, IonCardSubtitle, IonButtons, IonCard, IonItem, IonIcon, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonCardContent, IonImg, IonLabel, IonModal, IonFooter } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import useApi, { DetailsResult } from '../hooks/useApi';
import { useState } from 'react';
import { bodyOutline, clipboardOutline, starHalfOutline, trophyOutline } from 'ionicons/icons';


interface DetailsPageProps
    extends RouteComponentProps<{
        id: string;
    } >{}


const Details: React.FC<DetailsPageProps> = ({ match }) => {
    const{ getDetails } = useApi()
    const [information, setInformation] = useState<DetailsResult | null>(null);
    useIonViewWillEnter(async() => {
        const id = match.params.id;
        const data = await getDetails(id)
        setInformation(data)
    
    });
    


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot='start'>
            <IonBackButton defaultHref="/movies"></IonBackButton>
            </IonButtons>
          <IonTitle>{information?.Genre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {information && (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{information.Title}</IonCardTitle>
                <IonCardSubtitle>{information.Year}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <IonImg src={information.Poster} />

                <IonItem lines="none">
                    <IonIcon icon={starHalfOutline} slot="start" color="warning" />
                    <IonLabel>{information.imdbRating}</IonLabel>
                </IonItem>


            </IonCardContent>



        </IonCard>
    
        )}
        
        
        <IonModal trigger='open-modal' initialBreakpoint={0.25} breakpoints={[0, .25, .5, .75]}>
            <IonContent className="ion-padding"> 
            <IonItem lines="none">
                <IonIcon icon={clipboardOutline} slot="start" />
                <IonLabel>{information?.Director}</IonLabel>
            </IonItem>
            
            <IonItem lines="none">
                <IonIcon icon={trophyOutline} slot="start" />
                <IonLabel>{information?.Awards}</IonLabel>
            </IonItem>

            <IonItem lines="none">
                <IonIcon icon={bodyOutline} slot="start" />
                <IonLabel>{information?.Actors}</IonLabel>
            </IonItem>
            
            <p className="ion-padding">{information?.Plot}</p>
            
            </IonContent>
        </IonModal>
      </IonContent>
      <IonFooter>
        <IonButton expand='full' id="open-modal">Show More</IonButton>
      </IonFooter>
    </IonPage>
  )
}
export default Details;