import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NewCommentComponent} from "./new-comment/new-comment.component";


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'newComponent', component: NewCommentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
