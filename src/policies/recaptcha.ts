import { errors } from '@strapi/utils';
const { PolicyError, ApplicationError } = errors;

// This project has two installed copies of @strapi/utils (root + nested under
// @strapi/core) with mismatched versions, so `instanceof` checks against the
// core error-formatting middleware's copy of ApplicationError/PolicyError fail
// and every thrown error here falls back to a generic 500. Setting `.status`
// directly makes Strapi's error formatter honor the intended HTTP status
// regardless of that class-identity mismatch (see `http-errors`' createError,
// which reads `.status` off the error object rather than relying on instanceof).
function withStatus<T extends Error>(error: T, status: number): T {
  (error as any).status = status;
  (error as any).statusCode = status;
  return error;
}

interface TurnstileVerificationResponse {
  success: boolean;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
  'error-codes'?: string[];
}

export default async (ctx, config, { strapi }) => {
  // Correct path: token is nested inside ctx.request.body.data
  const { turnstileToken, ...cleanData } = ctx.request.body.data || {};

  // console.log('Received Turnstile token:', turnstileToken);
  // console.log('Using secret key from config:', ctx.request.body);

  if (!turnstileToken) {
    throw withStatus(new PolicyError('Turnstile token is missing', { status: 400 }), 400);
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  // console.log('Using secret key from environment variable:', !!secret);

  if (!secret) {
    strapi.log.error('TURNSTILE_SECRET_KEY not configured');
    throw withStatus(new ApplicationError('Captcha configuration error'), 400);
  }

  try {
    const cloudflareResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: turnstileToken }),
      }
    );

    const verification =
      (await cloudflareResponse.json()) as TurnstileVerificationResponse;

    if (!verification.success) {
      throw withStatus(new PolicyError('Captcha verification failed'), 403);
    }

    const expectedAction = config?.action;
    if (expectedAction && verification.action !== expectedAction) {
      throw withStatus(new PolicyError('Invalid Turnstile action'), 403);
    }

    //  Strip turnstileToken from body BEFORE Strapi validates it
    ctx.request.body.data = cleanData;

    console.log(' Turnstile token validated successfully');
    // console.log(' Form data entering controller:', cleanData);


    return true;
  } catch (error) {
    // Re-throw Strapi errors as-is, only wrap unexpected ones
    if (error instanceof PolicyError || error instanceof ApplicationError) {
      throw error;
    }
    strapi.log.error('Turnstile verification error', error);
    throw withStatus(new ApplicationError('Captcha validation error'), 400);
  }
};
