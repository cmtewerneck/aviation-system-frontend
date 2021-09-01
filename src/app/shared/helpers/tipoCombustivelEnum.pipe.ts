import { Pipe, PipeTransform } from '@angular/core';
import { TipoCombustivelEnum } from 'app/modules/cadastros/veiculo/tipoCombustivel.enum';

@Pipe({
  name: 'tipoCombustivelEnum'
})
export class TipoCombustivelEnumPipe implements PipeTransform {

  transform(tipo: TipoCombustivelEnum, args?: any): string {
    let tipoConvertido: string = "";

    if (tipo == 1){
      tipoConvertido = "Gasolina";
    } 
    else if (tipo == 2){
      tipoConvertido = "Álcool";
    }
    else if (tipo == 3){
      tipoConvertido = "Diesel";
    }
    else if (tipo == 4){
      tipoConvertido = "Flex";
    }
    else if (tipo == 5){
      tipoConvertido = "Elétrico";
    }

    return tipoConvertido;
  }
}