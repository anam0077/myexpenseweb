import { MyExpenseWebPage } from './app.po';

describe('material-dashboard-angular App', () => {
  let page: MyExpenseWebPage;

  beforeEach(() => {
    page = new MyExpenseWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
