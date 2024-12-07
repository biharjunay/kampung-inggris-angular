import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertService } from "@services/alert.service";
import { AuthService } from "@services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  public form: FormGroup
  public loading: boolean = false

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.form = _fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get email() {
    return this.form.get('email')
  }

  get password() {
    return this.form.get('password')
  }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) this._router.navigateByUrl('/admin', {replaceUrl: true})
  }

  public login(): void {
    this.loading = true
    this._authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this._router.navigateByUrl('/admin/dashboard')
      }
    }).add(() => {
      this.loading = false
    })
  }
}
