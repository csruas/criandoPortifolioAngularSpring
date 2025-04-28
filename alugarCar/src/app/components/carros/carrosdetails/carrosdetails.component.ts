import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

@Input("carro") carro: Carro = new Carro(0,"");
@Output("retorno") retorno = new EventEmitter<any>();

router = inject(ActivatedRoute);
router2 = inject(Router);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }else{
      this.carro = new Carro(0,"");
    }
  }

  findById(id: number){
    // Simulando a busca por ID (substitua pelo seu serviço real)
    let carroRetornado: Carro = new Carro(id, 'Fiesta');
    this.carro = carroRetornado;

  }

  save(){
    if(this.carro.id > 0){
      Swal.fire({
        title: 'Sucesso!',
        text: 'Carro Editado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      this.router2.navigate(['admin/carros'], { state: {carroEditado: this.carro } });

    }else {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Salvo com sucesso!',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      this.router2.navigate(['admin/carros'], { state: {carroNovo: this.carro} });
    }

    this.retorno.emit(this.carro);
  }

}
