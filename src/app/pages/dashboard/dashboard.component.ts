import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isDarkMode = true;
  userName = "Davi Emanuel";

  isTransactionModalOpen = false;

  hoje = new Date().toISOString().split('T')[0];

  constructor(private router: Router) { }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  logout() {
    this.router.navigate(['/']);
  }

  openTransactionModal() {
    this.isTransactionModalOpen = true;
  }

  closeTransactionModal() {
    this.isTransactionModalOpen = false;
  }

  salvarTransacao() {
    console.log("Transação salva! (Integração com Java em breve)");
    this.closeTransactionModal();
  }
}