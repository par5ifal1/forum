import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn : 'root'
})
export class ConfirmPassValidator{
  public confirmPass(control : AbstractControl) : ValidationErrors | null
  {
    // @ts-ignore
    if (!control.get('password').value || !control.get('confirm').value)
      return null;

    // @ts-ignore
    if (control.get('password').value != control.get('confirm').value)
      return { notSamePasswords : true };

    return null;
  }
}
