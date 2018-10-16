import './index.css'
import numeral from 'numeral';

const serviceValue = numeral(1000).format('$0,0.00');
//debugger;
console.log(`Pagaría ${serviceValue} por ese servicio.`);
