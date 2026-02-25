export default () => {
  return async (ctx, next) => {
    const blockedDomains =
      process.env.BLOCKED_EMAIL_DOMAINS?.split(',').map(d => d.trim().toLowerCase()) || [];

    const blockedExtensions =
      process.env.BLOCKED_EMAIL_EXTENSIONS?.split(',').map(e => e.trim().toLowerCase()) || [];

    const checkEmail = (email: string) => {
      if (!email || !email.includes('@')) return false;

      const domain = email.split('@')[1]?.toLowerCase();
      if (!domain) return false;

      //  Exact domain match
      if (blockedDomains.includes(domain)) return true;

      //  Extension match
      if (blockedExtensions.some(ext => domain.endsWith(ext))) return true;

      return false;
    };

    const body = ctx.request.body;

    // REST standard
    if (body?.data?.email && checkEmail(body.data.email)) {
      return ctx.badRequest({
        errors: {
          email: "Email domain is not allowed",
        },
      });
    }

    // Direct body email
    if (body?.email && checkEmail(body.email)) {
      return ctx.badRequest({
        errors: {
          email: "Email domain is not allowed",
        },
      });
    }

    // Bulk create
    if (Array.isArray(body?.data)) {
      for (const item of body.data) {
        if (item.email && checkEmail(item.email)) {
          return ctx.badRequest({
            errors: {
              email: "Email domain is not allowed",
            },
          });
        }
      }
    }

    await next();
  };
};