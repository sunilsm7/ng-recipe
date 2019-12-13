import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { environment } from '../../../environments/environment';


const API_URL = environment.firebaseUrl;


@Injectable()
export class RecipeEffects {

  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      withLatestFrom(this.store.select('recipes')),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          `${API_URL}/recipes.json`
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      map(recipes => {
        return RecipesActions.setRecipes({ recipes: recipes });
      })
    )
  );

  storeRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.storeRecipes),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState]) => {
        return this.http.put(
          `${API_URL}/recipes.json`,
          recipesState.recipes
        );
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) { }
}
