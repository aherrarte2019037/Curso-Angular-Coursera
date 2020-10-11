export class DestinoViaje {
    private selected:boolean;
    public servicios: string[];

    constructor(public nombre:string, public url:string, public descripcion:string) {
      this.servicios = ['Desayuno', 'Almuerzo', 'Cena'];
    }

    isSelected():boolean {
      return this.selected;
    }

    setValue(value: boolean) {
      this.selected = value;
    }

}
