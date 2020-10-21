import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DestinoViaje} from "../models/DestinoViaje.model";
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from "rxjs/operators";
import {ajax} from "rxjs/ajax";


@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  @Output() willFavorite: EventEmitter<boolean>;
  formDj: FormGroup;
  missingName: boolean = false;
  missingDesc: boolean = false;
  badName: boolean = false;
  minLengthNombre = 3;
  classInvalidNombre: string = '';
  classInvalidDesc: string = '';
  results: string [];

  constructor(private formulario: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.willFavorite = new EventEmitter();
    this.formDj = formulario.group({
      nombre: ['', Validators.compose([Validators.required, this.nombreValidatorParametizable(this.minLengthNombre)])],
      descripcion: ['', Validators.required],
      url: [''],
      favorite: [false]
    });

  }

  ngOnInit(): void {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 4),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(() => ajax('/assets/json/datos.json'))
      ).subscribe(ajaxResponse => {
      this.results = ajaxResponse.response;
    })

  }

  guardar(nombre: string, descripcion: string, url: string, favorite: boolean): boolean {
    if (nombre === '' || nombre === null) {
      this.missingName = true;
      this.classInvalidNombre = 'is-invalid';
    }
    if (descripcion === '' || descripcion === null) {
      this.missingDesc = true;
      this.classInvalidDesc = 'is-invalid';
    }

    if (this.formDj.valid) {
      const destino = new DestinoViaje(this.upperFirst(nombre), this.upperFirst(descripcion), url);
      this.willFavorite.emit(favorite)
      this.onItemAdded.emit(destino);
      this.classInvalidDesc = '';
      this.classInvalidNombre = '';
      this.missingDesc = false;
      this.missingName = false;
      this.formDj.reset({favorite: false});
    }
    return false;

  };


  nombreValidator(control: FormControl): { [s: string]: boolean } {
    try {
      const length = control.value.toString().trim().length;
      if (length > 0 && length < 3) {
        return {invalidNombre: true}
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }


  nombreValidatorParametizable(minLength: number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      this.missingName = false;
      if (control.value !== null) {
        const length = control.value.toString().trim().length;
        if (length > 0 && length < minLength) {
          this.badName = true;
          this.classInvalidNombre = 'is-invalid';
          return {minLengthNombre: true}
        } else {
          this.badName = false;
          this.classInvalidNombre = '';
        }
      }

      return null;
    }
  }

  quitMessageDesc() {
    this.missingDesc = false;
    this.classInvalidDesc = '';
  }

  upperFirst = (text) => {
    if (typeof text !== 'string') return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
  }


}
