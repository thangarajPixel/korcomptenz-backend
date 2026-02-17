/**
 * fabcon-reserve-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::fabcon-reserve-lead.fabcon-reserve-lead',
  ({ strapi }) => ({

    async create(ctx) {
      try {


        const data = ctx.request.body.data;

        const response = await super.create(ctx);
        const leadId = response.data.id;


        const lead = await strapi.entityService.findOne(
          'api::fabcon-reserve-lead.fabcon-reserve-lead',
          leadId
        ) as any;

        const SALES_EMAIL = strapi.config.get('emails.mail_to_emails.sales');
        const CC_EMAIL = strapi.config.get('emails.mail_to_emails.cc');

        const fullName = `${lead.firstName || ''} ${lead.lastName || ''}`;


        //  EMAIL TO USER


        // await strapi.plugin('email').service('email').send({
        //   to: lead.email,
        //   bcc: CC_EMAIL,
        //   subject: 'Korcomptenz | Fabcon Meeting Request Received',
        //   html: `
        //   <html>
        //   <body style="font-family:Arial,sans-serif;">
        //     <h3>Hello ${fullName},</h3>
        //     <p>Thank you for booking a meeting with us at FABCON.</p>
        //     <p>Our team will contact you shortly to confirm your time slot.</p>
        //     <br/>
        //     <strong>Regards,</strong><br/>
        //     Korcomptenz Team
        //   </body>
        //   </html>
        //   `,
        // });

        //EMAIL TO ADMIN


        await strapi.plugin('email').service('email').send({
          to: SALES_EMAIL,
          bcc: CC_EMAIL,
          subject: 'New FABCON Meeting Request',
          html: `
          <html>
          <body style="font-family:Arial,sans-serif;">
            <h3>New FABCON Booking</h3>
            <table border="1" cellpadding="8" cellspacing="0">
             
              <tr>
                <td><strong>Name</strong></td>
                <td>${fullName},</td>
              </tr>
              <tr>
                <td><strong>Company</strong></td>
                <td>${lead.company}</td>
              </tr>
              <tr>
                <td><strong>Time Slot</strong></td>
                <td>${lead.timeSlot}</td>
              </tr>
              <tr>
                <td><strong>Message</strong></td>
                <td>${lead.message}</td>
              </tr>
            </table>
          </body>
          </html>
          `,
        });

        // 4️⃣ Custom response
        return {
          data: {
            success: true,
            id: leadId,
            message: 'Fabcon meeting request created successfully',
          },
        };

      } catch (error: any) {
        console.error(error);
        return ctx.badRequest(error.message || 'Something went wrong');
      }
    },

  })
);
