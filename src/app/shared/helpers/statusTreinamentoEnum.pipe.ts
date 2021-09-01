import { Pipe, PipeTransform } from '@angular/core';
import { SituacaoTreinamentoEnum } from 'app/modules/cadastros/sae/situacaoTreinamento.enum';

@Pipe({
  name: 'statusTreinamentoEnum'
})
export class StatusTreinamentoEnumPipe implements PipeTransform {

  transform(status: SituacaoTreinamentoEnum, args?: any): string {
    let statusConvertido: string = "";

    if (status == 1){
      statusConvertido = "Em Andamento";
    } 
    else if (status == 2){
      statusConvertido = "Pendente";
    }
    else if (status == 3){
      statusConvertido = "Finalizado";
    }
    
    return statusConvertido;
  }
}