import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduto } from 'src/app/interfaces/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos',
  templateUrl: 'editar-produtos.component.html',
  styleUrls: ['editar-produtos.component.css'],
})
export class EditarProdutosComponent implements OnInit {
  produtoForm: FormGroup;
  produto?: IProduto;

  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.produtoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      codigoBarras: ['', Validators.required],
      preco: [0, Validators.min(0.01)],
    });
  }

  ngOnInit() {
    const paramMap = this.route.snapshot.paramMap;
    const produtoId = paramMap?.get('id');
  
    if (produtoId) {
      const id = +produtoId;
      this.produtosService.buscarPorId(id).subscribe((produto) => {
        this.produto = produto;
        this.produtoForm.patchValue(produto);
      });
    }
  }
  
  editarProduto() {
    if (this.produto && this.produtoForm.valid) {
      const produtoEditado = { ...this.produto, ...this.produtoForm.value };
      this.produtosService.editarProduto(produtoEditado).subscribe(
        () => {
          this.router.navigate(['/produtos']);
          Swal.fire('Tudo certo!', 'Produto editado com sucesso', 'success');
        },
        (error: Error) => {
          Swal.fire('Ops! Algo deu errado', error.message, 'error');
        }
      );
    }
  }
  
}