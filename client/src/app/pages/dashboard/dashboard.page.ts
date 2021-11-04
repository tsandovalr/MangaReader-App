import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../../core';
import { IPost } from 'src/core/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage {
  private Post: Post;
  /**
   * It contains the latest changes and updates
   */
  private lastupdates: IPost[];
//
  /**
   * A list of news on the home page
   */
  private news: any[];

  /**
   * Class Designer
   * @param router Router
   * @param IShortPostInfo service
   */
  constructor(
    private router: Router
  ) {
    this.Post = new Post();
  }

    /**
   * Opens the selected post
   * @param id uuid post  */
  private openPost(id: string): void {
    this.router.navigateByUrl(`/info/${id}`);
  }

  // tslint:disableNextLine:useLifeCycleInterface
  async ngOnInit() {
    this.lastupdates = await this.Post.getAll(null, { limit: '5', sort: '-updatedAt' });
  }
}