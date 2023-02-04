// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Recipe } from '../recipes/recipe.model';
// import { RecipeService } from '../recipes/recipe.service';
// import { map, tap } from 'rxjs';
// @Injectable({
//   providedIn: 'root',
// })
// export class DataStorageService {
//   constructor(private http: HttpClient, private recipeService: RecipeService) {}
//   storeRecipe() {
//     const recipe = this.recipeService.getRecipes();
//     this.http
//       .put(
//         'https://angular-project-aa83d-default-rtdb.firebaseio.com/recipes.json',
//         recipe
//       )
//       .subscribe((response) => {
//         console.log(response);
//       });
//   }
//   fetchRecipe() {
//     return this.http
//       .get<Recipe[]>(
//         'https://angular-project-aa83d-default-rtdb.firebaseio.com/recipes.json'
//       )
//       .pipe(
//         map((recipes) => {
//           return (
//             recipes.map((recipe) => {
//               return {
//                 ...recipe,
//                 ingredients: recipe.ingredients ? recipe.ingredients : [],
//               };
//             }),
//             // The tap operator in RxJS is used to perform a side effect, such as logging or
//             //  debugging, on the values emitted by an observable stream without modifying the values
//             //  themselves. It is often used to perform actions such as logging or debugging on the values
//             //  emitted by an observable stream, without modifying the values themselves. It can also be used
//             //   to perform actions such as setting a loading indicator or updating a component's state based
//             //    on the values emitted by an observable stream. In Angular, it is commonly used in services
//             // to perform actions such as logging or error handling before or after making an HTTP request.
//             tap((recipes) => {
//               this.recipeService.setRecipes(recipes);
//             })
//           );
//         })
//       );
//   }
// }
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Recipe } from '../recipes/recipe.model';
// import { RecipeService } from '../recipes/recipe.service';
// import { map, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class DataStorageService {
//   private static readonly baseUrl =
//     'https://ng-course-recipe-book-bce51-default-rtdb.firebaseio.com';

//   constructor(private http: HttpClient, private recipeService: RecipeService) {}

//   storeRecipes() {
//     const recipes = this.recipeService.Recipes;
//     this.http
//       .put<Recipe[]>(`${DataStorageService.baseUrl}/recipes.json`, recipes)
//       .subscribe((response) => console.log(response));
//   }

//   fetchRecipes() {
//     return this.http
//       .get<Recipe[]>(`${DataStorageService.baseUrl}/recipes.json`)
//       .pipe(
//         map((recipes) => {
//           return recipes.map((recipe) => {
//             // Prevent ingredients from being null as the user is not
//             // required to enter ingredients for a recipe.
//             // Note that alternatively we could have done this in addRecipe
//             // and updateRecipe methods of the RecipeService.
//             return {
//               ...recipe,
//               ingredients: recipe.ingredients ? recipe.ingredients : [],
//             };
//           });
//         }),
//         tap((recipes) => (this.recipeService.Recipes = recipes))
//       );
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
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
  fetchRecipes() {
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
