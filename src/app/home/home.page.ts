import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/environments/environment';
import { Course } from '../models/course.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  courses: Course[]
  constructor(private menu: MenuController, public authService: AuthService) {
    getDocs(collection(db, 'courses')).then((snapshot) => {
      const allCourses = [];
      snapshot.docs.forEach((doc) => {
        allCourses.push(doc.data());
      });
      this.courses = allCourses;
    })
  }



  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}