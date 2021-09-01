import { Pipe, PipeTransform } from '@angular/core';
import { SituacaoPagamentoEnum } from 'app/modules/cadastros/diaria/situacaoPagamento.enum';

@Pipe({
  name: 'statusPagamentoEnum'
})
export class StatusPagamentoEnumPipe implements PipeTransform {

  transform(status: SituacaoPagamentoEnum, args?: any): string {
    let statusConvertido: string = "";

    if (status == 1){
      statusConvertido = "Pago";
    } 
    else if (status == 2){
      statusConvertido = "Não Pago";
    }
    
    return statusConvertido;
  }
}