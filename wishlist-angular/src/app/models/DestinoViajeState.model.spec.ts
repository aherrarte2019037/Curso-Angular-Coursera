import {
  DestinoViajeState,
  InitDataAction,
  initializeDestinoViajeState, NuevoDestinoAction,
  reducerDestinoViajes
} from "./DestinoViajeState.model";
import {DestinoViaje} from "./DestinoViaje.model";


describe('reducerDestinoViajes', () => {

  it('should reduce init data', function () {
    //SETUP
    const prevState: DestinoViajeState = initializeDestinoViajeState();
    const action:InitDataAction = new InitDataAction([new DestinoViaje('Paris','b','c'),new DestinoViaje('a','b','c')]);

    //ACTION
    const newState:DestinoViajeState = reducerDestinoViajes(prevState, action);

    //ASSERTIONS
    expect(newState.items.length).toEqual(2);
    expect(newState.items[0].nombre).toEqual('Paris')
  });

  it('should reduce new item added', function () {
    //SETUP
    const prevState: DestinoViajeState = initializeDestinoViajeState();
    const action:NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('Barcelona','Destino hermoso', 'google.com'));

    //ACTION
    const newState:DestinoViajeState = reducerDestinoViajes(prevState, action);

    //ASSERTIONS
    expect(newState.items.length).toEqual(1);
    expect(newState.items[0].nombre).toEqual('Barcelona')
  });

});
