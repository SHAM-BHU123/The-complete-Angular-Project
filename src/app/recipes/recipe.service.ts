import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListServices } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Burger',
      'This is test Data',
      'https://thumbs.dreamstime.com/b/veggie-burger-isolated-white-background-healthy-black-bean-veggie-burger-white-background-work-path-included-171567596.jpg',
      [new Ingredient('Meat', 1), new Ingredient('France Fries', 20)]
    ),
    new Recipe(
      'Pizza',
      'This is new test Data',
      'https://c4.wallpaperflare.com/wallpaper/849/987/715/food-pizza-wallpaper-preview.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  constructor(private slService: ShoppingListServices) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppinglist(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
