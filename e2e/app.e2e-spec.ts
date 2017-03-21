import { JustwatchProjectPage } from './app.po';

describe('justwatch-project App', function() {
  let page: JustwatchProjectPage;

  beforeEach(() => {
    page = new JustwatchProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
