import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ExperienciaService } from '../../services/experiencia.service';
import { User } from '../../models/user.model';
import { Experiencia } from '../../models/experiencia.model';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]

})
export class BuscadorExperienciasComponent implements OnInit {
  usuarios: User[] = []; // Lista de usuarios para el dropdown o buscador
  experiencias: Experiencia[] = []; // Experiencias filtradas del usuario seleccionado
  usuarioSeleccionado: string = ''; // ID del usuario seleccionado en el buscador
  errorMessage: string = ''; // Para mostrar errores

  constructor(
    private userService: UserService,
    private experienciaService: ExperienciaService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // Cargar lista de usuarios desde el servicio
  cargarUsuarios(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.usuarios = data;
        console.log('Usuarios cargados:', data);
      },
      (error) => {
        this.errorMessage = 'Error al cargar los usuarios.';
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  // Buscar experiencias basadas en el usuario seleccionado
  buscarExperiencias(): void {
    if (!this.usuarioSeleccionado) {
      this.errorMessage = 'Por favor selecciona un usuario.';
      return;
    }

    this.experienciaService.getExperiencias().subscribe(
      (data: Experiencia[]) => {
        // Filtrar experiencias por el propietario (owner)
        this.experiencias = data.filter(
          (experiencia) => experiencia.owner === this.usuarioSeleccionado
        );
        console.log('Experiencias del usuario:', this.experiencias);
      },
      (error) => {
        this.errorMessage = 'Error al cargar las experiencias.';
        console.error('Error al cargar las experiencias:', error);
      }
    );
  }
}

