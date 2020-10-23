export class DestinoViaje {
  private selected: boolean;
  public servicios: string[];

  constructor(public nombre: string, public descripcion: string, public url: string, public votes: number = 0) {
    this.servicios = ['Desayuno', 'Almuerzo', 'Cena'];
  }

  isSelected(): boolean {
    return this.selected;
  }

  setValue(value: boolean) {
    this.selected = value;
  }

  voteUp() {
    this.votes++;
  }

  voteDown() {
    this.votes--;
  }
}
