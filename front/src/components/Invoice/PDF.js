import jsPDF from 'jspdf';

var cont = 0
var aux = ((cont * 16) + 156)
export const PdfGenerate = (addedProduct) => {
	//encabezado
	var doc = new jsPDF()
	doc.setFontSize(22)
	doc.setFont('Helvetica', 'bold');
	doc.text(60, 20, '*** Panadería LUKANG ***')
	doc.setFont('Helvetica', 'normal');
	doc.setFontSize(16)
	doc.text(85, 30, 'NIT: 911017755-9')
	doc.text(84, 40, 'Carrera 42 86 – 32')
	doc.text(65, 50, 'Resolución DIAN 191816549/8156')
	doc.text(79, 60, 'Autorizada el 01/12/2021')
	doc.rect(5, 65, 200, 1, 'F')

	//Datos del cliente col 1
	doc.setFont('Helvetica', 'bold');
	doc.text(90, 80, 'Factura de venta : POS - ')
	doc.setFont('Helvetica', 'normal');
	doc.text(10, 90, 'Fecha')
	doc.text(10, 100, 'Cliente')
	doc.text(10, 110, 'C.C / NIT')
	//col 2
	doc.text(170, 80, ' 2');
	doc.text(50, 90, "date")
	doc.text(50, 100, 'Nombre')
	doc.text(50, 110, 'C.C / NIT')
	doc.rect(5, 115, 200, 1, 'F')

	//cuerpo factura
	doc.setFontSize(19)
	doc.setFont('Helvetica', 'bold');
	doc.text(10, 130, 'Código');
	doc.text(40, 130, 'Producto');
	doc.text(90, 130, 'Precio');
	doc.text(130, 130, 'Unidades');
	doc.text(170, 130, 'Sub Total');
	doc.setFont('Helvetica', 'normal');
	doc.setFontSize(16)


	for (let i = 0; i < addedProduct.length; i++) {
		doc.text(10, 140 + i * 20, `${addedProduct[i].id}`);
		doc.text(40, 140 + i * 20, `${addedProduct[i].name}`);
		doc.text(90, 140 + i * 20, `${addedProduct[i].price}`);
		doc.text(130, 140 + i * 20, `${addedProduct[i].stock}`);
		doc.text(170, 140 + i * 20, `${addedProduct[i].stock * addedProduct[i].price}`);
		cont = i

		//console.log('cont'+cont+'aux'+aux);

	}
	aux = + ((cont * 16) + 156)

	doc.text(10, aux, '------------------------------------------------------------------------------------------------------');
	doc.setFont('Helvetica', 'bold');
	doc.text(130, (aux+10), 'Total:')
	doc.text(170, (aux+10), '10.000.000')
	doc.setFont('Helvetica', 'normal');
	console.log('cont' + cont + 'aux' + aux);

	doc.save('factura.pdf');
}
console.log('cont' + cont + 'aux' + aux);

export default PdfGenerate;