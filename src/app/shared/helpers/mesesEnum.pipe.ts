import { Pipe, PipeTransform } from '@angular/core';
import { MesEnum } from 'app/modules/cadastros/papeleta/mes.enum';

@Pipe({
  name: 'mesesEnum'
})
export class MesesEnumPipe implements PipeTransform {

  transform(mes: MesEnum, args?: any): string {
    let mesConvertido: string = "";

    if (mes == 1){
      mesConvertido = "Janeiro";
    } 
    else if (mes == 2){
      mesConvertido = "Fevereiro";
    }
    else if (mes == 3){
      mesConvertido = "Maro";
    }
    else if (mes == 4){
      mesConvertido = "Abril";
    }
    else if (mes == 5){
      mesConvertido = "Maio";
    }
    else if (mes == 6){
      mesConvertido = "Junho";
    }
    else if (mes == 7){
      mesConvertido = "Julho";
    }
    else if (mes == 8){
      mesConvertido = "Agosto";
    }
    else if (mes == 9){
      mesConvertido = "Setembro";
    }
    else if (mes == 10){
      mesConvertido = "Outubro";
    }
    else if (mes == 11){
      mesConvertido = "Novembro";
    }
    else if (mes == 12){
      mesConvertido = "Dezembro";
    }
    
    return mesConvertido;
  }
}