import { Observable } from 'rxjs';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit{
  listaPensamentos: Pensamento[] = [];
  paginaAtual = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural'

  constructor(
    private service: PensamentoService,
    private router: Router) {}


  ngOnInit(): void {
    this.service.listar(1, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    })
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos.push(...listaPensamentos);
        if(!listaPensamentos.length){
          this.haMaisPensamentos = false;
        }
      })
  }

  pesquisarPensamentos(){
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos;
      })
  }

  recarregarComponente() {
    this.favoritos = false;
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  listarFavoritos() {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.favoritos = true
    this.titulo = 'Meus Favoritos'

    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentosFavoritos => {
        this.listaPensamentos = listaPensamentosFavoritos;
        this.listaFavoritos = listaPensamentosFavoritos;
      })
  }
}

