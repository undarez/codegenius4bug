import React, { useState } from 'react';
import undarez from '../../asset/logo-undarez.png';
//import de la liste des adresses IP des Zebra
import ipZebra from '../../JSON/ZebraIP.json';
import Barcode from 'react-barcode';
import { QRCodeSVG } from 'qrcode.react';
import SelectedLocation, {
      CR1Placement,
} from '../../components/selectLocation/SelectedLocation';
import DataLocation from '../../JSON/Location.json';
import { imprimer, imprimerCodeBarre, printQrCode } from '../../function/zebra';

import './_home.scss';

const Home = () => {
      const QR = '123456789'; //valeur qr-code
      //impression qrcode et codebarre zebra selon ip dans le fichier json
      const handleImprimer = () => {
            imprimer();
      };

      const handleImprimerCodeBarre = () => {
            const adresseIpImprimante = '10.91.18.83'; // Remplacez par l'adresse IP réelle de l'imprimante
            const cpcl = '! UTILITIES SETLP 7 0 15 PW 200 PRINT';
            const printCodeBarreFn = () => {
                  const cpcl = `^XA ^FO50,50^BQN,2,4 ^FDMA,${QR}^FS ^XZ`;
                  imprimerCodeBarre(adresseIpImprimante, cpcl);
            };

            imprimerCodeBarre(adresseIpImprimante, cpcl, printCodeBarreFn);
      };

      const handleImprimerQrCode = () => {
            const adressesIpImprimantes = ['10.91.18.83']; // Remplacez par les adresses IP réelles des imprimantes
          
            // Appel de la fonction printQrCode pour chaque adresse IP d'imprimante
            adressesIpImprimantes.forEach(adresseIpImprimante => {
              printQrCode(adresseIpImprimante);
            });
          };

      //function telechargement qrcode
      const handleDllQrcode = (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ): void => {
            e.preventDefault();
            const qrCodeSvg = document.getElementById(
                  'qr-code-svg'
            ) as HTMLElement;
            const svgData = new XMLSerializer().serializeToString(qrCodeSvg);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
            const svgUrl = URL.createObjectURL(svgBlob);

            const downloadWindow = window.open(svgUrl, '_blank');
            downloadWindow!.document.write(`
              <html>
                <head>
                  <style>
                    #qr-code-svg {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      transform: translate(-50%,-50%);
                      width: 180px;
                      height: 180px;
                      margin: 0;
                      padding: 0;
                    }
                    p {
                        font-family: 'Gasoek One', sans-serif;
                        color: black;
                        font-size: 22px;
                    }
                  </style>
                </head>
                <body>
                  ${qrCodeSvg.outerHTML}
                  <p>${selectedLocation?.name || text}</p>
                </body>
              </html>
            `);
            const downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = 'qrcode.svg';
            downloadLink.click();
      };

      //function print qrcode

      const printQRCode = () => {
            const qrCodeSvg = document.getElementById(
                  'qr-code-svg'
            ) as HTMLElement;
            const printWindow = window.open(
                  '',
                  '_blank',
                  'width=1000,height=1200'
            );

            if (printWindow) {
                  printWindow.document.write(`<html>
              <head>
                <style>
                 div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction:column;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                  }
                  p {
                        font-family: 'Gasoek One', sans-serif;
                        font-weight:800;
                        color: black;
                        font-size: 22px;
                        text-align:center;
                    }
                </style>
              </head>
              <body>
              <div>
              ${qrCodeSvg!.outerHTML}
              <p>${selectedLocation?.name || text}</p>
              </div>
              </body>
            </html>`);
                  //   printWindow.document.write(qrCodeSvg.outerHTML);
                  printWindow.document.write('</body></html>');
                  printWindow.document.close();
                  printWindow.print();
            } else {
                  console.error("Impossible d'ouvrir la fenêtre d'impression");
            }
      };

      //function dll code barre
      const handleDllBarcode = (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ): void => {
            e.preventDefault();
            const barcodeSvg = document.getElementById('barcode-svg');
            const svgData = new XMLSerializer().serializeToString(barcodeSvg!);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
            const svgUrl = URL.createObjectURL(svgBlob);
            const downloadWindow = window.open(svgUrl, '_blank');
            downloadWindow!.document.write(`
            <html>
                <head>
                  <style>
                    #barcode-svg {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      transform: translate(-50%,-50%);
                      width: 180px;
                      height: 180px;
                      margin: 0;
                      padding: 0;
                    }
                  
                  </style>
                </head>
                <body>
                  ${barcodeSvg!.outerHTML}
                  
                </body>
              </html>
            `);
            const downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = 'barcode.svg';
            downloadLink.click();
      };

      //function print codebarre

      const printBarrecode = () => {
            const barcodeSvg = document.getElementById('barcode-svg');
            const printWindow = window.open(
                  '',
                  '_blank',
                  'width=1000,height=1200'
            );

            if (printWindow) {
                  printWindow.document.write(`<html>
              <head>
                <style>
                 div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                  }
                 
                </style>
              </head>
              <body>
              <div>
              ${barcodeSvg!.outerHTML}
              </div>
              </body>
            </html>`);
                  //   printWindow.document.write(qrCodeSvg.outerHTML);
                  printWindow.document.write('</body></html>');
                  printWindow.document.close();
                  printWindow.print();
            } else {
                  console.error("Impossible d'ouvrir la fenêtre d'impression");
            }
      };

      //useState pour qrCode
      const [text, settext] = useState('exemple');
      const [sizeState, setsizeState] = useState(180);
      const [bgColorState, setbgColorState] = useState('#ffffff');
      const [colorState, setColorState] = useState('#000000');
      const [selectedLocation, setSelectedLocation] = useState<CR1Placement>();

      //ajout d'un map pour selectionner toutes les adresses IP des zebra

      return (
            <div className="container-qrcode" id="image-Qrcode">
                  <form action="" method="get" className="container-form">
                        <SelectedLocation
                              data={DataLocation}
                              update={setSelectedLocation}
                        />

                        <label className="labelCss" htmlFor="sizeQrCode">
                              Entrée la taille en px de votre Qr-Code par
                              default (180px):
                        </label>
                        <input
                              className="inputCss"
                              type="number"
                              onChange={(e) =>
                                    setsizeState(Number(e.target.value))
                              }
                              id="sizeQrCode"
                        />
                        <br />
                        <label className="labelCss" htmlFor="lienQrCode">
                              Entrée le lien de votre Qr-Code ou de votre
                              texte/lien de Code-Barre:
                        </label>
                        <input
                              className="inputCss"
                              type="string"
                              onChange={(e) => settext(e.target.value)}
                              id="lienQrCode"
                        />
                        <br />
                        <label
                              className="labelCss"
                              htmlFor="bgQrCode colorQrCode "
                        >
                              veuillez choisir le background color par default
                              (blanc)
                        </label>
                        <input
                              className="bgcolorCss"
                              type="color"
                              id="bgQrCode"
                              onChange={(e) => setbgColorState(e.target.value)}
                        />
                        <br />
                        <label className="labelCss" htmlFor="colorQrCode">
                              Veuillez choisir la couleur du Qr-code par
                              default(noir)
                        </label>
                        <input
                              className="bgcolorCss"
                              type="color"
                              id="colorQrCode"
                              onChange={(e) => setColorState(e.target.value)}
                        />
                        <br />

                        <QRCodeSVG
                              //création d'un Id pour que l'utilisateur puisse imprimé le QRcode et ou le code barre.
                              id="qr-code-svg"
                              value={selectedLocation?.name || text} // Ici on utilise le location.name pour générer le QRCode et si il n'y a pas de location.name on utilise le text (exemple)
                              size={sizeState}
                              bgColor={bgColorState}
                              fgColor={colorState}
                              level="Q"
                              includeMargin={false}
                        />
                        <p>{selectedLocation?.name || text}</p>
                        {/*  Les 3 lignes qui suivent servent a afficher dans un <p> le code quand il n'est pas undefined, juste pour vérifier (au pire tu l'enlève si ça te plait pas :P )  */}
                        {selectedLocation !== undefined && (
                              <p>{selectedLocation.name}</p>
                        )}
                        {/*  Fin du morceau  */}
                        <div className="container-button">
                              <button
                                    className="buttonCss"
                                    onClick={handleDllQrcode}
                              >
                                    Download
                              </button>
                              <button
                                    className="buttonCss"
                                    onClick={printQRCode}
                              >
                                    Print
                              </button>
                        </div>
                        <br />
                        <div id="barcode-svg">
                              <Barcode
                                    value={selectedLocation?.name || text} // Pareil que pour le QRCode
                                    background={bgColorState}
                                    lineColor={colorState}
                              />
                        </div>
                        <div className="container-button">
                              <button
                                    className="buttonCss"
                                    onClick={handleDllBarcode}
                              >
                                    Download
                              </button>
                              <button
                                    className="buttonCss"
                                    onClick={printBarrecode}
                              >
                                    Print
                              </button>
                        </div>
                        <div className="container-button-2">
                              <button className="buttonCss-2" type='button'  onClick={handleImprimer}>Imprimer</button>
                              <button className="buttonCss-2" type='button' onClick={handleImprimerCodeBarre}>
                                    zebra Code-Barre
                              </button>
                              <button className="buttonCss-2" type='button' onClick={handleImprimerQrCode}>
                                    zebra QR Code
                              </button>
                        </div>
                        <div className="container-copy">
                              <a
                                    href="https://github.com/undarez"
                                    className="copyright"
                              >
                                    &copy; 2023 CodeGénius By undarez
                              </a>
                              <img src={undarez} alt={'logo undarez'} />
                        </div>
                  </form>
            </div>
      );
};

export default Home;
