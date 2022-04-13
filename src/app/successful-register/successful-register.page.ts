import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-successful-register',
  templateUrl: './successful-register.page.html',
  styleUrls: ['./successful-register.page.scss'],
})
export class SuccessfulRegisterPage implements OnInit {
  course: any
  constructor(public authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.course = this.route.snapshot.params
  }

}
