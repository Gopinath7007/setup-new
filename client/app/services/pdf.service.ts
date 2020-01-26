import { Injectable } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Bill from 'server/models/bill';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor(
  ) {

  }
  sendPdf(bill) {
    // const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    

    console.log(bill);
    let newData = [];
    let rows = [[
      {text: 'SNO', style: 'header', key: 'index'},
      {text: 'DESCRIPTION', style: 'header', key:'name'},
      {text: 'HSN CODE', style: 'header', key: 'hsnId'},
      {text: 'MRP', style: 'header', key: 'mrp'},
      {text: 'QUANTITY', style: 'header', key: 'count'},
      {text: 'RATE', style: 'header', key: 'price'},
      {text: 'TOTAL', style: 'header', key: 'total'},
      {text: 'TAXABLE VALUE', style: 'header', key: 'total'},
      {text: 'CGST', style: 'header', key: 'cGst'},
      {text: 'SGST', style: 'header', key: 'sGst'},

    ]];

    let i = 0;
    let total = 0;
    bill.spares.map((data,index)=> {
      
      total += data.total * data.count;
      let newSpares = [];
      newSpares[0] = index;
      newSpares[1] = data.name;
      newSpares[2] = data.hsnId.hsnId;
      newSpares[3] = data.total * data.count;
      newSpares[4] = data.count;
      newSpares[5] = data.price;
      newSpares[6] = data.total * data.count;
      newSpares[7] = data.total * data.count;
      newSpares[8] = data.hsnId.cGst;
      newSpares[9] = data.hsnId.sGst;
      rows.push(newSpares);
    })
    bill.works.map((data,index)=> {
    
      total += data.total * data.count;  
      let newSpares = [];
      newSpares[0] = index + bill.spares.length;
      newSpares[1] = data.name;
      newSpares[2] = data.hsnId.hsnId;
      newSpares[3] = data.total * data.count;
      newSpares[4] = data.count;
      newSpares[5] = data.price;
      newSpares[6] = data.total * data.count;
      newSpares[7] = data.total * data.count;;
      newSpares[8] = data.hsnId.cGst;
      newSpares[9] = data.hsnId.sGst;
      rows.push(newSpares);
    })
    // row.push(['',2,3,4,5,7,8,8])
    let totalAmount = []
    totalAmount = [
        bill._id,        
        Math.round(bill.amount),
    ];
    let rowsNew = [];
    rowsNew.push([
      {text: '  INVOICE NUMBER', style: 'header', key: 'index'},
      {text: 'TOTAL', style: 'header', key:'name'}      
    ])
    rowsNew.push(totalAmount);
    
    console.log(bill);
   const documentDefinition = {
     content: [
        {
          table: 
          {
            headerRows: 1,
            widths: [ '*', '*', '*', '*' ],
            body: [
              [
                { text: 'Header 1', style: 'tableHeader' }, 
                { text: 'Header 2', style: 'tableHeader' }, 
                  { text: 'Header 3', style: 'tableHeader' }
              ],
              [
                { text: 'Hello' }, 
                { text: 'I' }, 
                { text: 'am' }
              ],
              [
                { text: 'a' }, 
                { text: 'table' }, 
                { text: '.' }
              ]
            ]
          }
        },
        // alignment: 'justify',
        {
          columns: [
          {
            text: '',
            style: 'labels'
          },
          {
            text: ' ',
            style: 'labels'
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
        {
        columns: [
          {
            text: 'Customer Name',
            style: 'labels'
          },
          {
            text: bill.customerName,
            style: 'labels'
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
       {
        // alignment: 'justify',
        columns: [
          {
            text: 'Customer Address',
            style: 'labels'
          },
          {
            text: bill.customerAddress,
            style: 'labels'
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
       {
        // alignment: 'justify',
        columns: [
          {
            text: 'Vehicle Number',
            style: 'labels'
          },
          {
            text: bill.vehicleNumber,
            style: 'labels'
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
       {
        // alignment: 'justify',
        columns: [
          {
            text: 'Total',
            style: 'labels'
          },
          {
            text: Math.round(total),
            style: 'labels'
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
       {
        // alignment: 'justify',
        columns: [
          {
            text: '  '
          },
          {
            text: '  '
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
       {
        // alignment: 'justify',
        columns: [
          {
            text: '  '
          },
          {
            text: '  '
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
       {
        // alignment: 'justify',
        columns: [
          {
            text: '  '
          },
          {
            text: '  '
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
      //  {
      //      alignment: 'justify',
      //      columns: [
      //        {
      //          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
      //        },
      //        {
      //          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
      //        }
      //      ]
      //   },
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
          {
            layout: 'lightHorizontalLines', // optional
            style: 'tableExample',            
            margin: 30,
            table: {
              headerRows: 1,
              // dontBreakRows: true,
              // keepWithHeaderRows: 1,
              alignment: 'justify',
              body:  rowsNew


            }
          },
          
      ],
      styles: {
        header: {
          fontSize: 8,
          color:'green',
          bold: true,

        },
        labels: {
          fontSize: 10,
          color: 'brown'
        },
        labelText:{
          fontSize: 15,
          color: 'green'
        },
        anotherStyle: {
          italics: true,
          alignment: 'right'
        }
      }
    }
  //  pdfMake.createPdf(documentDefinition);
  //  pdfMake.getBase64((data) => {
  //   alert(data);
  // });

  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
  pdfDocGenerator.getBase64((data) => {
    // alert(data);
    const shareData = {
      title: 'MDN',
      text: data,
      url: data,
    }    
    navigator['share'](shareData);
  });
  }
  
  generatePdf(bill){
    
    console.log(bill);
    let newData = [];
    let rows = [[
      {text: 'SNO', style: 'header', key: 'index'},
      {text: 'DESCRIPTION', style: 'header', key:'name'},
      {text: 'HSN CODE', style: 'header', key: 'hsnId'},
      {text: 'MRP', style: 'header', key: 'mrp'},
      {text: 'QUANTITY', style: 'header', key: 'count'},
      {text: 'RATE', style: 'header', key: 'price'},
      {text: 'TOTAL', style: 'header', key: 'total'},
      {text: 'TAXABLE VALUE', style: 'header', key: 'total'},
      {text: 'CGST', style: 'header', key: 'cGst'},
      {text: 'SGST', style: 'header', key: 'sGst'},

    ]];

    let i = 0;
    let total = 0;
    bill.spares.map((data,index)=> {
      
      total += data.total * data.count;
      let newSpares = [];
      newSpares[0] = index;
      newSpares[1] = data.name;
      newSpares[2] = data.hsnId.hsnId;
      newSpares[3] = (data.total * data.count).toFixed(2);
      newSpares[4] = data.count;
      newSpares[5] = data.price;
      newSpares[6] = (data.total * data.count).toFixed(2);
      newSpares[7] = (data.total * data.count).toFixed(2);
      newSpares[8] = data.hsnId.cGst+ '%';
      newSpares[9] = data.hsnId.sGst+ '%';
      rows.push(newSpares);
    })
    bill.works.map((data,index)=> {
    
      total += data.total * data.count;  
      let newSpares = [];
      newSpares[0] = index + bill.spares.length;
      newSpares[1] = data.name;
      newSpares[2] = data.hsnId.hsnId;
      newSpares[3] = (data.total * data.count.toFixed(2));
      newSpares[4] = data.count;
      newSpares[5] = data.price;
      newSpares[6] = (data.total * data.count).toFixed(2);
      newSpares[7] = (data.total * data.count).toFixed(2);
      newSpares[8] = data.hsnId.cGst + '%';
      newSpares[9] = data.hsnId.sGst + '%';
      rows.push(newSpares);
    })
    // row.push(['',2,3,4,5,7,8,8])
    let totalAmount = []
    totalAmount = [
        bill._id,        
        bill.amount.toFixed(2),
    ];
    let rowsNew = [];
    rowsNew.push([
      {text: '  INVOICE NUMBER', style: 'header', key: 'index'},
      {text: 'TOTAL', style: 'header', key:'name'}      
    ])
    rowsNew.push(totalAmount);
    
    console.log(bill);
   const documentDefinition = {
     content: [
      {
        text:  'Sri Ram Auto Carriage',
        style: 'mainHeader'
      },
      
       {
        columns: [
        {
          text: '',
          style: 'labels'
        },
        {
          text: ' ',
          style: 'labels'
        },
        {
          text: ' ',
          style: ''
        },
        {
          text: ' ',
          style: ''
        }
      ]
     },
        // alignment: 'justify',
        {
          table: 
          {
            headerRows: 1,
            widths: [ '*', '*', '*' ],
            body: [
              [
                { text: 'Customer Name', style: 'tableHeader' }, 
                { text: 'Address', style: 'tableHeader' }, 
                  { text: 'Vehicle Number', style: 'tableHeader' }
              ],
              
              [
                { text: bill.customerName }, 
                { text: bill.customerAddress }, 
                { text: bill.vehicleNumber }
              ]
            ]
          }
        },
        {
          columns: [
          {
            text: '',
            style: 'labels'
          },
          {
            text: ' ',
            style: 'labels'
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
        {
          table: 
          {
            headerRows: 1,
            widths: [ '*' ],
            body: [
              [
                { text: 'Total Amount', style: 'tableHeader2' }
              ],
              
              [
                { text: total.toFixed(2) }, 
              ]
            ]
          }
        },
        {
          columns: [
          {
            text: '',
            style: 'labels'
          },
          {
            text: ' ',
            style: 'labels'
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
    
    
       {
        // alignment: 'justify',
        columns: [
          {
            text: '  '
          },
          {
            text: '  '
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
       {
        // alignment: 'justify',
        columns: [
          {
            text: '  '
          },
          {
            text: '  '
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
       {
        // alignment: 'justify',
        columns: [
          {
            text: '  '
          },
          {
            text: '  '
          },
          {
            text: ' ',
            style: ''
          },
          {
            text: ' ',
            style: ''
          }
        ]
       },
      //  {
      //      alignment: 'justify',
      //      columns: [
      //        {
      //          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
      //        },
      //        {
      //          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
      //        }
      //      ]
      //   },
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
          {
            layout: 'lightHorizontalLines', // optional
            style: 'tableExample',            
            margin: 30,
            table: {
              headerRows: 1,
              // dontBreakRows: true,
              // keepWithHeaderRows: 1,
              alignment: 'justify',
              body:  rowsNew


            }
          },
          
      ],
      styles: {
        header: {
          fontSize: 8,
          color:'green',
          bold: true,

        },
        mainHeader:{
          textAlign: 'center',
          fontSize: 20,
          color: 'brown',
          fontWeight: 600
        },
        tableHeader: 
        {
          fillColor: '#4CAF50',
          color: 'white'
        },
        tableHeader2: 
        {
          fillColor: 'orange',
          color: 'white'
        },
        labels: {
          fontSize: 10,
          color: 'brown'
        },
        labelText:{
          fontSize: 15,
          color: 'green'
        },
        anotherStyle: {
          italics: true,
          alignment: 'right'
        }
      }
    }
   pdfMake.createPdf(documentDefinition).open();
  }
}
