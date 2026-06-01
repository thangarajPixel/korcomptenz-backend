import { errors } from '@strapi/utils';
const { PolicyError, ApplicationError } = errors;

interface RecaptchaVerificationResponse {
  success: boolean;
  score: number;
  action: string;
  hostname: string;
}

export default async (ctx, config, { strapi }) => {
  // Correct path: token is nested inside ctx.request.body.data
  const { recaptchaToken, ...cleanData } = ctx.request.body.data || {};

  // console.log('Received reCAPTCHA token:', recaptchaToken);
  // console.log('Using secret key from config:', ctx.request.body);

  if (!recaptchaToken) {
    throw new PolicyError('reCAPTCHA token is missing', { status: 400 });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  // console.log('Using secret key from environment variable:', !!secret);

  if (!secret) {
    strapi.log.error('RECAPTCHA_SECRET_KEY not configured');
    throw new ApplicationError('Captcha configuration error');
  }

  try {
    const googleResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: recaptchaToken }),
      }
    );

    const verification =
      (await googleResponse.json()) as RecaptchaVerificationResponse;

    if (!verification.success) {
      throw new PolicyError('Captcha verification failed');
    }

    const expectedAction = config?.action;
    if (expectedAction && verification.action !== expectedAction) {
      throw new PolicyError('Invalid reCAPTCHA action');
    }

    if (verification.score < 0.5) {
      throw new PolicyError('Low reCAPTCHA score');
    }

    //  Strip recaptchaToken from body BEFORE Strapi validates it
    ctx.request.body.data = cleanData;

    console.log(' reCAPTCHA token validated successfully');
    // console.log(' Form data entering controller:', cleanData);


    return true;
  } catch (error) {
    // Re-throw Strapi errors as-is, only wrap unexpected ones
    if (error instanceof PolicyError || error instanceof ApplicationError) {
      throw error;
    }
    strapi.log.error('reCAPTCHA verification error', error);
    throw new ApplicationError('Captcha validation error');
  }
};