import { Pipe, PipeTransform } from '@angular/core';
import { TipoTreinamentoEnum } from 'app/modules/cadastros/nrt/tipoTreinamento.enum';

@Pipe({
  name: 'tipoTreinamentoEnum'
})
export class TipoTreinamentoEnumPipe implements PipeTransform {

  transform(tipo: TipoTreinamentoEnum, args?: any): string {
    let tipoConvertido: string = "";

    if (tipo == 1){
      tipoConvertido = "Inicial";
    } 
    else if (tipo == 2){
      tipoConvertido = "Periódico";
    }
    
    return tipoConvertido;
  }
}