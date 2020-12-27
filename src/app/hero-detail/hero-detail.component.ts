import { Component, Input, OnInit } from '@angular/core';
import { IHero } from '../model/hero.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../service/heroes/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: IHero;

  constructor(
    private route: ActivatedRoute, /** Holds information about the route to this instance of the HeroDetailComponent. */
    private heroService: HeroService, /** Get hero data from the remote server and this component will use it to get the hero-to-display */
    private location: Location /** angular server for interacting with the browser. */
  ) { }

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    /**
     * route.snapshot: is a static image of the route information shortly after the componente was created.
     * paramMap: is a dictionary of route parameter values extracted form the URL.
     */
    const id = this.route.snapshot.paramMap.get('id');
    const parsedId = id !== null ? +id : -1;

    this.heroService.getHero(parsedId).subscribe(hero => this.hero = hero);
  }

  save(): void {
    this.heroService.updateHero(this.hero!).subscribe(() => this.goBack())
  }

  goBack(): void  {
    this.location.back();
  }

}
