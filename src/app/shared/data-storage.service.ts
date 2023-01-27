import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}
  storeRecipe() {
    const recipe = this.recipeService.getRecipes();
    this.http
      .put(
        'https://angular-project-aa83d-default-rtdb.firebaseio.com/recipes.json',
        recipe
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchRecipe() {
    this.http
      .get<Recipe[]>(
        'https://angular-project-aa83d-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        })
      )
      .subscribe((recipes) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
