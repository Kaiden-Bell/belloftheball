export const SITE_SLOGAN = 'We Love To Party';

export const CONTACT_EMAIL = 'contact@belloftheballreno.com';
export const CONTACT_PHONE = '775-203-4065';

export type FormProvider = 'web3forms' | 'formspree';

/*
 * The two services read different field names for the same two jobs. Set this
 * wrong and mail still arrives, but under the service's default subject and
 * with the no-JavaScript honeypot inert.
 *
 *              subject     honeypot
 *   web3forms  subject     botcheck
 *   formspree  _subject    _gotcha
 */
export const FORM_PROVIDER: FormProvider = 'web3forms';

export const FORM_ENDPOINT = 'https://api.web3forms.com/submit';

// Public by design — it ships in the HTML and can only send mail to the
// address that owns it.
export const FORM_ACCESS_KEY = '7bc48d4f-0a60-4cdd-8394-a8198bd55b4b';

export const FORM_SUBJECT = 'New consultation request — belloftheballreno.com';

export const FORM_FIELDS =
  FORM_PROVIDER === 'web3forms'
    ? { subject: 'subject', honeypot: 'botcheck' }
    : { subject: '_subject', honeypot: '_gotcha' };

export const FORM_IS_CONFIGURED = FORM_ENDPOINT.trim().length > 0;
