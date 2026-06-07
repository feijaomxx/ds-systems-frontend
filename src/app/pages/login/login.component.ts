import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoginMode = true;
  isDarkMode = true;

  usuario = {
    nome: '',
    cpf: '',
    rg: '',
    telefone: '',
    rendaMensal: null,
    email: '',
    senha: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    municipio: '',
    estado: ''
  };

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      console.log("Fazendo login...", this.usuario.email);
    } else {
      this.usuarioService.cadastrar(this.usuario).subscribe({
        next: (resposta) => {
          alert('Conta criada com sucesso!');
          this.router.navigate(['/dashboard'], { state: { nomeUsuario: this.usuario.nome } });
        },
        error: (erro) => {
          console.error('Erro ao cadastrar:', erro);
          alert('Erro ao criar conta. Verifique o console.');
        }
      });
    }
  }
}