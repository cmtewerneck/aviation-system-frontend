import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPagamentoBoolean'
})
export class StatusPagamentoBooleanPipe implements PipeTransform {

  transform(status: boolean, args?: any): string {
    let statusConvertido: string = "";

    if (status == true){
      statusConvertido = "Pago";
    } 
    else if (status == false){
      statusConvertido = "Não Pago";
    }
    
    return statusConvertido;
  }
}