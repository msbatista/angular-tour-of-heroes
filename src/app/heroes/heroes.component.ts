import { Component, OnInit } from '@angular/core';
import { IHero } from '../model/hero.model';
import { HeroService } from '../service/heroes/hero.service';
import { MessagesService } from '../service/messages/messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: IHero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();

    if (!name) {
      return;
    }

    this.heroService.addHero({ name } as IHero).subscribe(
      (hero: IHero) => {
        this.heroes.push(hero);
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes()
                    .subscribe(heroes => this.heroes = heroes);
  }

  delete(hero: IHero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
