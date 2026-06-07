import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario';
import { Usuario } from '../../models/usuario.model';

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




  usuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    rendaMensal: 0,
    cpf: '',
    rg: '',
    telefone: ''
  };

  constructor(private usuarioService: UsuarioService) { }


  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      console.log('Tentando fazer login com:', this.usuario.email);

    } else {
      console.log('Enviando para o Java...', this.usuario);

      this.usuarioService.cadastrarUsuario(this.usuario).subscribe({
        next: (resposta) => {
          alert('Conta criada com sucesso! ID: ' + resposta.id);
          this.toggleMode();
        },
        error: (erro) => {
          alert('Erro ao criar conta: ' + erro.error.message);
        }
      });
    }
  }
}