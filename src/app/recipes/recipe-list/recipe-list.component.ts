import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe',
    'Recipe description',
    'https://natashaskitchen.com/wp-content/uploads/2018/08/Chicken-Stir-Fry-1-1-600x900.jpg'),
    new Recipe('A Test Recipe',
    'Recipe description',
    'https://cb-web-assets.imgix.net/getmagicbullet/img/recipe-red-pepper-deviled-eggs.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
