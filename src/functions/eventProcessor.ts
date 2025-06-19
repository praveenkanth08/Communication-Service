import { EmailService } from '@/services/emailService';
import { app, ServiceBusQueueHandler, InvocationContext } from '@azure/functions';

export const EmailProcessor: ServiceBusQueueHandler = async (
  message: any,
  context: InvocationContext
): Promise<void> => {
  try {
   
    context.log(`Processing email...`);
    context.log(`My Message ${JSON.stringify(message)}`);
    
    if(message.body) {
      const emailServiceInstance = new EmailService();
      const sendStatus = await emailServiceInstance.sendEmail(message.body)
      context.log(`Email sent successfully - template: `, message.body.templateId);

    }
    
  } catch (error) {
    context.error('Error processing email:', error);
    throw error; // Triggers retry and eventual dead letter
  }
};

app.serviceBusQueue('EmailProcessor', {
  connection: 'ServiceBusConnection',
  queueName: 'scheduled-emails',
  handler: EmailProcessor
});