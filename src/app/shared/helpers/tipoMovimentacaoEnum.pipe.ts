import { Pipe, PipeTransform } from '@angular/core';
import { TipoMovimentacaoEnum } from 'app/modules/cadastros/suprimentoMovimentacao/tipoMovimentacao.enum';

@Pipe({
  name: 'tipoMovimentacaoEnum'
})
export class TipoMovimentacaoEnumPipe implements PipeTransform {

  transform(tipo: TipoMovimentacaoEnum, args?: any): string {
    let tipoConvertido: string = "";

    if (tipo == 1){
      tipoConvertido = "Entrada";
    } 
    else if (tipo == 2){
      tipoConvertido = "Saída";
    }
    
    return tipoConvertido;
  }
}