/**
 * case-study-lead controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::case-study-lead.case-study-lead', ({ strapi }) => ({
  async create(ctx) {
    try {
      const data = ctx.request.body.data;
      if (data.caseStudyId) {
        const caseStudy = await strapi.db.query('api::case-study.case-study').findOne({
          where: {
            id: data.caseStudyId,
          },
          populate: {
            attachment: true,
            slug:true,
            document_Id: true
          }
        });
       
        if (caseStudy) {
          await super.create(ctx);
          console.log("Case study lead created successfully", caseStudy?.attachment);
          // const res = await strapi.plugin('email-designer');
          const info = await strapi.plugin('email').service('email').send({
            // from: '"Korcomptenz" <maddison53@ethereal.email>',
            to: data?.email,
            
            subject: "Thank you for your interest in our Case Study ",
            text: "Hello world?", // plain‑text body
            html: caseStudy?.attachment?.size > 400000 ? `
     
    
                 </b><br/>
               <p>Please download the case study using the link below:</p>
              <a href="${caseStudy?.attachment?.url}" target="_blank">Download Case Study</a>
                     ` : `
         <div style="font-family: Outfit", "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji; font-size:20px; line-height:1.6; color:#111;">
          <p><b>Hi ${data?.fullName},</b></p>

            <p>Thank you for your interest in our solutions. In addition to that case study, here are some other resources we believe may be useful to you. Kindly click on the links below:</p>

              <p>
             <a href="https://www.korcomptenz.com/client-success/ " target="_blank">https://www.korcomptenz.com/client-success/</a><br>
             <a href="https://www.korcomptenz.com/insights/" target="_blank">https://www.korcomptenz.com/insights/</a>
            </p>

              <p>Thank you for your time and consideration.</p>

                     <p>Sincerely,<br>
                     KORCOMPTENZ ,<br>
                      Customer Solutions Team</p>
</div>

  `,
            attachments: (!!caseStudy?.attachment?.url && caseStudy?.attachment?.size > 700000) ? [
              {
                filename: caseStudy?.attachment?.name,
                href: caseStudy?.attachment?.url
              },
            ] : undefined,
          });
           const info2 = await strapi.plugin('email').service('email').send({
            // from: '"Korcomptenz" <maddison53@ethereal.email>',
            to: "arasuoffice77@gmail.com",
            cc:"padmakumar739@gmail.com",
            subject: "Case Study Download  ",
            // text: "Hello world?", // plain‑text body
            html: `
         <div style="font-family: Outfit", "Apple Color Emoji", "Segoe UI Emoji",
         "Segoe UI Symbol", "Noto Color Emoji; font-size:14px; line-height:1.6; color:#111;">
          <p><b>Hi</b>
          </p>

            <p>Name:${data?.fullName}, <br>
            Email:${data?.email},<br>
             Oraganization:${data?.organization},<br>
              Phone Number:${data?.phone},<br>
               Message:${data?.message}<br>
               Page URL: <a href="https://www.korcomptenz.com/case-studies/${caseStudy?.slug}" target="_blank">https://www.korcomptenz.com/case-studies/${caseStudy?.slug}</a></p> </div> `});
               

          console.log("Message sent:", info.messageId);
           console.log("Message sent:", info2.messageId);
          return { data: { success: true, message: 'Case study lead created successfully', attachment: caseStudy?.attachment } };
        }
        return ctx.notFound('Case study not found');
      }
      return ctx.notFound('Case study not found');
    } catch (error) {
      console.log(error);
      return ctx.badRequest(error);
    }
  }
}));
