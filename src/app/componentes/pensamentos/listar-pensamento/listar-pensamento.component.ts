import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent {
  listaPensamentos = [
    {
      conteudo: 'Teste teste som kkkk',
      autoria: 'Erick',
      modelo: 'modelo1'
    },
    {
      conteudo: 'Murray',
      autoria: 'Shaco',
      modelo: 'modelo3'
    }
  ];

}
