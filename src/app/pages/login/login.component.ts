import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
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
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      municipio: '',
      estado: ''
    }
  };

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  onSubmit() {
    
    if (this.usuario.email) {
      this.usuario.email = this.usuario.email.toLowerCase();
    }

    if (this.isLoginMode) {
      const credenciais = {
        email: this.usuario.email,
        senha: this.usuario.senha
      };

      this.usuarioService.login(credenciais).subscribe({
        next: (resposta) => {
          localStorage.setItem('userId', resposta.id.toString());
          localStorage.setItem('userName', resposta.nome);

          this.router.navigate(['/dashboard']);
        },
        error: (erro) => {
          console.error('Erro no login:', erro);
          alert('E-mail ou senha inválidos. Tente novamente.');
        }
      });
    } else {
      this.usuarioService.cadastrar(this.usuario).subscribe({
        next: (resposta) => {
          alert('Conta criada com sucesso!');
          this.router.navigate(['/dashboard'], {
            state: {
              nomeUsuario: this.usuario.nome,
              idUsuario: resposta.id
            }
          });
        },
        error: (erro) => {
          console.error('Erro ao cadastrar:', erro);
          alert('Erro ao criar conta. Verifique o console.');
        }
      });
    }
  }


  buscarEndereco() {

    const cepLimpo = this.usuario.endereco.cep.replace(/\D/g, '');


    if (cepLimpo.length === 8) {
      fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
          if (!dados.erro) {

            this.usuario.endereco.logradouro = dados.logradouro;
            this.usuario.endereco.bairro = dados.bairro;
            this.usuario.endereco.municipio = dados.localidade;
            this.usuario.endereco.estado = dados.uf;
          } else {
            alert('CEP não encontrado. Por favor, verifique.');
          }
        })
        .catch(erro => console.error('Erro ao buscar o CEP:', erro));
    }
  }
}