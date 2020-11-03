import {Component, OnInit, Input, HostBinding, EventEmitter, Output} from '@angular/core';
import {DestinoViaje} from '../../models/DestinoViaje.model';
import {AppState} from "../../app.module";
import {Store} from "@ngrx/store";
import {VoteDownAction, VoteUpAction} from "../../models/DestinoViajeState.model";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css'],
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({
        backgroundColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [
        animate('0.5s')
      ]),
      transition('estadFavorito => estadoNoFavorito', [
        animate('1s')
      ])
    ])
  ]
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino: DestinoViaje;
  @Input() indice: number;
  @HostBinding('attr.class') cssClass = 'col-10 col-md-6 col-lg-5 col-xl-4 mb-3';
  @Output() clicked: EventEmitter<DestinoViaje>;
  @Output() eliminarDestino: EventEmitter<number>;


  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
    this.eliminarDestino = new EventEmitter();
  }

  ngOnInit(): void {
  }

  seleccionar() {
    this.clicked.emit(this.destino);
    return false;
  }

  setEliminarDestino(idEliminar: number) {
    this.eliminarDestino.emit(idEliminar)
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destino));
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destino));
  }

}
