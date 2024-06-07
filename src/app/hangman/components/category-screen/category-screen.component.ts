import { Component, OnInit } from '@angular/core';
import { HangmanService } from "../../services/hangman.service";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-category-screen',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './category-screen.component.html',
  styleUrl: './category-screen.component.css'
})
export class CategoryScreenComponent implements OnInit{
  categories: string[] = [];

  constructor(private hangManService: HangmanService) { }

  ngOnInit() {
    this.getCategories()
  }

  getCategories(): void {
    this.categories = this.hangManService.getCategories();
  }

  chooseCategory(category: string): void {
    this.hangManService.setCategory(category);
  }
}
