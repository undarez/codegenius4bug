// import ZebraBrowserPrintWrapper from './searchPrint';
import adressesIpImprimantes from '../JSON/ZebraIP.json';
import {serverZebra} from '../back/server.js'
export const QR = "https://www.exemple.com";
export function imprimer() {
  const cpcl = `! UTILITIES SETLP 7 0 15 PW 200 PRINT`;
  
  adressesIpImprimantes.forEach(adresseIpImprimante => {
    imprimerCodeBarre(adresseIpImprimante, cpcl, printQrCode);
  });
}

export const imprimerCodeBarre = async (adresseIpImprimante, cpcl, printQrCode) => {
  try {
    
    
    const defaultPrinter = await serverZebra.getDefaultPrinter();
    serverZebra.setPrinter(defaultPrinter);
    const etatImprimante = await serverZebra.checkPrinterStatus();
    if (etatImprimante.isReadyToPrint) {
      serverZebra.print(cpcl + printQrCode);
    } else {
      console.log(`Erreur(s) lors de l'impression sur l'imprimante ${adresseIpImprimante}`, etatImprimante.errors);
    }
  } catch (error) {
    console.log(`Erreur lors de l'impression sur l'imprimante ${adresseIpImprimante}`, error);
    throw new Error(error);
  }
};
// export const imprimerCodeBarre = async (adresseIpImprimante, cpcl, printQrCode) => {
//   try {
    
//     const browserPrint = new ZebraBrowserPrintWrapper();
//     const defaultPrinter = await browserPrint.getDefaultPrinter();
//     browserPrint.setPrinter(defaultPrinter);
//     const etatImprimante = await browserPrint.verifierEtatImprimante();
//     if (etatImprimante.estPretPourImprimer) {
//       browserPrint.imprimer(cpcl + printQrCode);
//     } else {
//       console.log(`Erreur(s) lors de l'impression sur l'imprimante ${adresseIpImprimante}`, etatImprimante.erreurs);
//     }
//   } catch (error) {
//     console.log(`Erreur lors de l'impression sur l'imprimante ${adresseIpImprimante}`, error);
//     throw new Error(error);
//   }
// };

export const printQrCode = async (adresseIpImprimante) => {
  const cpcl = `^XA ^FO50,50^BQN,2,4 ^FDMA,${QR}^FS ^XZ`;

  imprimerCodeBarre(adresseIpImprimante, cpcl);
};
