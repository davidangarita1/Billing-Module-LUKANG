import jsPDF from 'jspdf';

export const PdfGenerate = (addedProduct) => {
	var doc = new jsPDF('landscape', 'px', 'a4', 'false');
	doc.text(500, 60, 'Factura #1');
	doc.setFont('Helvetica', 'bold');
	doc.text(60, 120, 'Código');
	doc.text(160, 120, 'Producto');
	doc.text(300, 120, 'Precio');
	doc.text(400, 120, 'Stock');
	doc.setFont('Helvetica', 'normal');
	
	for (let i = 0; i < addedProduct.length; i++) {
		doc.text(60, 140 + i * 20, `${addedProduct[i].id}`);
		doc.text(160, 140 + i * 20, `${addedProduct[i].name}`);
		doc.text(300, 140 + i * 20, `${addedProduct[i].price}`);
		doc.text(400, 140 + i * 20, `${addedProduct[i].stock}`);
	}
	doc.save('factura.pdf');
}


export default PdfGenerate;