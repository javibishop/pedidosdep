import { PedidosPage } from './app.po';

describe('pedidos App', () => {
  let page: PedidosPage;

  beforeEach(() => {
    page = new PedidosPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
