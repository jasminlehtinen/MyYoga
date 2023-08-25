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

  // Custom async validator to check if an email is already taken
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.customValidator.checkEmail(control.value).pipe(
      map(isTaken => (isTaken ? null : { emailTaken : true } )),
      catchError((error) => {
        console.error('Error in email validation:', error)
        return of({ serverValidation: true })
      })
    )
  }
}
