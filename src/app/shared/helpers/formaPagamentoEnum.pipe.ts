import { Pipe, PipeTransform } from '@angular/core';
import { FormaPagamentoEnum } from 'app/modules/cadastros/passagemAerea/formaPagamento.enum';

@Pipe({
  name: 'formaPagamentoEnum'
})
export class FormaPagamentoEnumPipe implements PipeTransform {

  transform(formaPagamento: FormaPagamentoEnum, args?: any): string {
    let formaPagamentoConvertido: string = "";

    if (formaPagamento == 1){
      formaPagamentoConvertido = "Dinheiro";
    } 
    else if (formaPagamento == 2){
      formaPagamentoConvertido = "Cartão";
    }
    else if (formaPagamento == 3){
      formaPagamentoConvertido = "Boleto";
    }
    else if (formaPagamento == 4){
      formaPagamentoConvertido = "PIX";
    }
    else if (formaPagamento == 5){
      formaPagamentoConvertido = "Transferência";
    }

    return formaPagamentoConvertido;
  }
}