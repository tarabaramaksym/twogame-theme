import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import Form from 'Component/Form';
import {
    MyAccountCreateAccountComponent as SourceMyAccountCreateAccountComponent,
} from 'SourceComponent/MyAccountCreateAccount/MyAccountCreateAccount.component';
import history from 'Util/History';
import { validatePassword } from 'Util/Validator';
import { ValidationInputType } from 'Util/Validator/Config';

/** @namespace Scandipwa/Component/MyAccountCreateAccount/Component */
export class MyAccountCreateAccountComponent extends SourceMyAccountCreateAccountComponent {
    /**
     * Overriden to remove header text
     */
    renderCreateAccountPersonalInfoFields() {
        const { newsletterActive } = this.props;
        const { location: { state: { firstName = '', lastName = '' } = {} } } = history;

        return (
            <fieldset block="MyAccountOverlay" elem="Legend">
                <Field
                  type={ FieldType.TEXT }
                  label={ __('First Name') }
                  attr={ {
                      id: 'firstname',
                      name: 'firstname',
                      defaultValue: firstName,
                      placeholder: __('Your first name'),
                      autoComplete: 'given-name',
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      inputType: ValidationInputType.ALPHASPACE,
                      isRequired: true,
                  } }
                  addRequiredTag
                />
                <Field
                  type={ FieldType.TEXT }
                  label={ __('Last Name') }
                  attr={ {
                      id: 'lastname',
                      name: 'lastname',
                      defaultValue: lastName,
                      placeholder: __('Your last name'),
                      autoComplete: 'family-name',
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      inputType: ValidationInputType.ALPHASPACE,
                      isRequired: true,
                  } }
                  addRequiredTag
                />
                { this.renderVatNumberField() }
                { newsletterActive && this.renderSubscribeToNewsletter() }
            </fieldset>
        );
    }

    /**
     * Overriden to change label text
     */
    renderSubscribeToNewsletter() {
        return (
            <Field
              type={ FieldType.CHECKBOX }
              label={ __('Send me exclusive gaming deals and a birthday gift!') }
              attr={ {
                  id: 'is_subscribed',
                  name: 'is_subscribed',
                  placeholder: __('Your Tax/VAT Number'),
              } }
              mix={ { block: 'MyAccountOverlay', elem: 'Checkbox' } }
            />
        );
    }

    /**
     * Overriden to remove header text
     * To change placeholder text
     */
    renderCreateAccountSignUpInfoFields() {
        const { location: { state: { email = '' } = {} } } = history;
        const { range, minimunPasswordCharacter } = this.props;

        return (
            <fieldset block="MyAccountOverlay" elem="Legend">
                <Field
                  type={ FieldType.EMAIL }
                  label={ __('Email') }
                  attr={ {
                      id: 'email',
                      name: 'email',
                      defaultValue: email,
                      placeholder: __('Email address'),
                      autoComplete: 'email',
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: ValidationInputType.EMAIL,
                  } }
                  addRequiredTag
                />
                <div block="MyAccountOverlay" elem="PasswordBlock">
                    <Field
                      type={ FieldType.PASSWORD }
                      label={ __('Password') }
                      attr={ {
                          id: 'password',
                          name: 'password',
                          placeholder: __('Password'),
                          autoComplete: 'new-password',
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true,
                          inputType: ValidationInputType.PASSWORD,
                          match: (value) => {
                              const email = document.getElementById('email');

                              if (value && email.value === value) {
                                  return __('Passwords can\'t be the same as email!');
                              }

                              return validatePassword(value, range, minimunPasswordCharacter);
                          },
                      } }
                      addRequiredTag
                    />
                    <Field
                      type={ FieldType.PASSWORD }
                      label={ __('Confirm password') }
                      attr={ {
                          id: 'confirm_password',
                          name: 'confirm_password',
                          placeholder: __('Retype your password'),
                          autoComplete: 'new-password',
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true,
                          inputType: ValidationInputType.PASSWORD,
                          match: (value) => {
                              const password = document.getElementById('password');

                              return value && password.value === value;
                          },
                          customErrorMessages: {
                              onMatchFail: __('Passwords do not match!'),
                          },
                      } }
                      addRequiredTag
                    />
                </div>
            </fieldset>
        );
    }

    /**
     * Overriden to change order between SignUpInfoFields and PersonalInfoFields
     */
    renderCreateAccountForm() {
        const { onError, onSuccess } = this.props;

        return (
            <Form
              key="create-account"
              onSubmit={ onSuccess }
              onError={ onError }
            >
                { this.renderCreateAccountSignUpInfoFields() }
                { this.renderCreateAccountPersonalInfoFields() }
                { this.renderSubmitButton() }
            </Form>
        );
    }

    /**
     * Overriden to remove the renderAdditionalField function invocation
     */
    render() {
        return this.renderCreateAccountForm();
    }
}

export default MyAccountCreateAccountComponent;
