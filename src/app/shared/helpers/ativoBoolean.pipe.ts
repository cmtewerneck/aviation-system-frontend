import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ativoBoolean'
})
export class AtivoBooleanPipe implements PipeTransform {

  transform(ativo: boolean, args?: any): string {
    let ativoConvertido: string = "";

    if (ativo == true){
      ativoConvertido = "Sim";
    } 
    else if (ativo == false){
      ativoConvertido = "Não";
    }
    
    return ativoConvertido;
  }
}