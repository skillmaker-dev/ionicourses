import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'src/environments/environment';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  course: any
  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.course = this.route.snapshot.params
  }

  register(course: Course): void {
    this.router.navigate(['/successful-register', course]);
    let userId = JSON.parse(localStorage.getItem('user')!).uid;
    addDoc(collection(db, "subscriptions"), {
      course,
      userId
    })
  }
}
