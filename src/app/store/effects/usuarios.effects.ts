import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as usuariosActions from '../actions';

@Injectable()
export class UsuariosEffects {

    constructor(private actions$: Actions, // observable que está escuchando los cambios
        private usuarioService: UsuarioService) { }


    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            mergeMap(
                () => this.usuarioService.getUsers()
                    .pipe(
                        map(users => usuariosActions.cargarUsuariosSuccess({ usuarios: users })),
                        catchError(err => of(usuariosActions.cargarUsuariosError({ payload: err })))
                    )
            )
        )
    );
}