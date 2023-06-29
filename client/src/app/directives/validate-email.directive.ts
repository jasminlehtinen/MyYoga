import { Directive } from '@angular/core'
import { AbstractControl, NG_ASYNC_VALIDATORS, AsyncValidator, ValidationErrors } from '@angular/forms'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { CustomValidationService } from '../services/custom-validation.service'

@Directive({
  selector: '[appValidateEmail]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: ValidateEmailDirective, multi: true }]
})

export class ValidateEmailDirective implements AsyncValidator {

  constructor(private customValidator: CustomValidationService) { }

  // Check if an user with the same email already exists
  // Request made in custom validation service
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.customValidator.checkEmail(control.value).pipe(
      map(isTaken => (isTaken ? null : {emailTaken : true})),
      catchError(() => of(null))
    )
  }
}
