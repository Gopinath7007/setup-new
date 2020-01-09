import { Injectable } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor(
  ) {

  }

  generatePdf(bill){

    let newData = [];
    let rows = [[
      {text: 'SNO', style: 'tableHeader', key: 'index'},
      {text: 'DESCRIPTION', style: 'tableHeader', key:'name'},
      {text: 'HSN CODE', style: 'tableHeader', key: 'hsnId'},
      {text: 'MRP', style: 'tableHeader', key: 'mrp'},
      {text: 'QUANTITY', style: 'tableHeader', key: 'count'},
      {text: 'RATE', style: 'tableHeader', key: 'price'},
      {text: 'TOTAL', style: 'tableHeader', key: 'total'},
      {text: 'TAXABLE VALUE', style: 'tableHeader', key: 'total'},
      {text: 'CGST', style: 'tableHeader', key: 'cGst'},
      {text: 'SGST', style: 'tableHeader', key: 'sGst'},

    ],
    [1,2,3,4,5,6,7,8,9,1]];

    let i = 0;
    do {
        rows.push([
          100, 200, 400, 1,1,2,3,4,4,5
        ])
        i +=1;
    }
    while(i < 100);
    console.log(rows);
   const documentDefinition = {
     content: [
       'This is an sample PDF printed with pdfMake',
       {
           alignment: 'justify',
           columns: [
             {
               text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
             },
             {
               text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
             }
           ]
        },
        {
            layout: 'lightHorizontalLines', // optional
            style: 'tableExample',
            table: {
              headerRows: 1,
              // dontBreakRows: true,
              // keepWithHeaderRows: 1,
              alignment: 'justify',
              body:  rows


            }
          },
      ]
    }
   pdfMake.createPdf(documentDefinition).open();
  }
}
