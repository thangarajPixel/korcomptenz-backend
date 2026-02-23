interface RecaptchaVerificationResponse {
  success: boolean;
  score: number;
  action: string;
  hostname: string;
}

export default async (ctx, config, { strapi }) => {
  const recaptchaToken = ctx.request.body?.recaptchaToken;

  if (!recaptchaToken) {
    ctx.status = 400;
    ctx.body = { error: 'reCAPTCHA token is missing' };
    return false;
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    strapi.log.error('RECAPTCHA_SECRET_KEY not configured');
    ctx.status = 500;
    ctx.body = { error: 'Captcha configuration error' };
    return false;
  }

  try {
    const googleResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret,
          response: recaptchaToken,
        }),
      }
    );

    const verification =
      (await googleResponse.json()) as RecaptchaVerificationResponse;

    if (!verification.success) {
      ctx.status = 403;
      ctx.body = { error: 'Captcha verification failed' };
      return false;
    }

    if (verification.score < 0.5) {
      ctx.status = 403;
      ctx.body = { error: 'Low reCAPTCHA score' };
      return false;
    }

    return true; // ✅ continue to controller
  } catch (error) {
    strapi.log.error('reCAPTCHA verification error', error);
    ctx.status = 500;
    ctx.body = { error: 'Captcha validation error' };
    return false;
  }
};