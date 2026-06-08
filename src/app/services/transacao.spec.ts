import { TestBed } from '@angular/core/testing';

import { Transacao } from './transacao.service';

describe('Transacao', () => {
  let service: Transacao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Transacao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
