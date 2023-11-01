import { Component } from '@angular/core';
import { IProduto } from 'src/app/interfaces/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent {
  produtos: IProduto[] = [];

  constructor(private produtosService: ProdutosService) {}

  ngOnInit() {
    this.produtosService.buscarTodos().subscribe(
      (produtos) => {
        this.produtos = produtos;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  remover(id: number) {
    Swal.fire({
      title:'Você tem certeza que deseja deletar este item?',
      text: 'Essa ação é permanente e o item não poderá ser recuperado',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#FF0000',
      confirmButtonColor: '#00FF00',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Não, cancelar'
    }).then((resposta) =>{
      if(resposta.isConfirmed){
       this.produtos = this.produtos.filter((produto) => produto.id !== id);  
      }
    })
   
  }

}