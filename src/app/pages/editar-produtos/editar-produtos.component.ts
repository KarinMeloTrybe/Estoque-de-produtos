import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduto } from 'src/app/interfaces/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: 'editar-produtos.component.html',
  styleUrls: ['editar-produtos.component.css'],
})
export class EditarProdutosComponent {
  produto?: IProduto;
  produtoForm: FormGroup;

  constructor(
    private produtosService: ProdutosService,
    private activatedRoute: ActivatedRoute
    ) {
    const getId =  this.activatedRoute.snapshot.paramMap.get('id');
    this.produtosService.buscarPorId(parseInt(getId!)).subscribe(
      (produto) => {
        this.produto = produto;
      },
      (error) => {
        console.log(error);
      }
    );
  }


 ngOnInit() {
  
  }

  this.produtoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    codigoBarras: new FormControl('', Validators.required),
    preco: new FormControl(0.00)

}

/* 


enviar() {
  const produto: Partial<IProduto> = this.produtoForm.value as IProduto;

this.produtosService.cadastrarProduto(produto).subscribe((resultado) => {
  Swal.fire(
    'Tudo certo!',
    'Produto cadastrado com sucesso',
    'success'
      );
},
(error: Error) => {
  const { message } = error;
  Swal.fire('Ops! Algo deu errado', message, 'error')
      }
    );
  }
} */

