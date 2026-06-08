import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransacaoService } from '../../services/transacao.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  isDarkMode = true;
  userName = "Visitante";
  userId: number | null = null;

  saldoTotal = 0.00;
  totalReceitas = 0.00;
  totalDespesas = 0.00;
  transacoes: any[] = [];

  isTransactionModalOpen = false;

  hoje = new Date().toISOString().split('T')[0];

  novaTransacao = {
    usuario: { id: 0 },
    categoria: { id: null },
    valor: null,
    dataTransacao: this.hoje,
    descricao: ''
  };

  constructor(private router: Router, private transacaoService: TransacaoService, private cdr: ChangeDetectorRef) {
    const storedName = localStorage.getItem('userName');
    const storedId = localStorage.getItem('userId');




    if (storedName) {
      this.userName = storedName;
    }

    if (storedId) {
      this.userId = Number(storedId);
      this.novaTransacao.usuario.id = this.userId;
    }
  }

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');

    if (storedId) {
      this.userId = parseInt(storedId);
      console.log("Gatilho ativado: Carregando dados para o ID", this.userId);

      this.carregarTransacoes();
    } else {
      console.warn("Nenhum usuário logado. Redirecionando...");
      this.router.navigate(['/login']);
    }
  }

  carregarTransacoes() {
    if (!this.userId) return;

    this.transacaoService.buscarPorUsuario(this.userId).subscribe({
      next: (dados) => {
        this.transacoes = dados;
        this.calcularSaldos();
        this.calcularResumoCategorias();
        this.cdr.detectChanges();
        console.log("Dados carregados e interface forçada a atualizar.");
      },
      error: (erro) => console.error("Erro ao carregar:", erro)
    });
  }

  calcularSaldos() {
    this.saldoTotal = 0;
    this.totalReceitas = 0;
    this.totalDespesas = 0;

    for (let t of this.transacoes) {
      if (t.categoria.tipo === 'RECEITA') {
        this.totalReceitas += t.valor;
        this.saldoTotal += t.valor;
      } else {
        this.totalDespesas += t.valor;
        this.saldoTotal -= t.valor;
      }
    }
  }

  resumoCategorias: any[] = [];

  calcularResumoCategorias() {
    const resumoMap = new Map<string, { total: number, tipo: string }>();
    let maxTotal = 0;

    this.transacoes.forEach(t => {
      const categoriaNome = t.categoria.nome;
      const tipo = t.categoria.tipo;

      const dadosAtuais = resumoMap.get(categoriaNome) || { total: 0, tipo: tipo };
      const novoTotal = dadosAtuais.total + Number(t.valor);

      resumoMap.set(categoriaNome, { total: novoTotal, tipo: tipo });

      if (novoTotal > maxTotal) {
        maxTotal = novoTotal;
      }
    });

    this.resumoCategorias = Array.from(resumoMap, ([nome, dados]) => ({
      nome,
      total: dados.total,
      tipo: dados.tipo,
      percentual: maxTotal > 0 ? (dados.total / maxTotal) * 100 : 0
    }));

    this.resumoCategorias.sort((a, b) => b.total - a.total);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  sair() {
    this.router.navigate(['/']);
    localStorage.clear();
  }

  openTransactionModal() {
    this.isTransactionModalOpen = true;
  }

  closeTransactionModal() {
    this.isTransactionModalOpen = false;
  }

  salvarTransacao() {
    if (!this.userId) return;

    this.transacaoService.lancar(this.novaTransacao).subscribe({
      next: (resposta) => {
        this.closeTransactionModal();
        this.novaTransacao.valor = null;
        this.novaTransacao.descricao = '';

        this.carregarTransacoes();
      },
      error: (erro) => alert('Erro ao registrar a transação.')
    });
  }



}