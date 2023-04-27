import { Controller, Post, Body } from '@nestjs/common';
import { SendGridService } from './sendgrid.service';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('send/email')
export class EmailController {
  constructor(private readonly sendGridService: SendGridService) {}

  @Post('test')
  @UseGuards(AuthGuard)
  async sendEmail(@Body() body) {
    const { to, subject, text, html } = body;
    await this.sendGridService.sendEmail(to, subject, text, html);
    return { status: 'Email enviado' };
  }

  @Post('activation')
  @Public()
  async sendActivationEmail(@Body() body: { to: string; name: string }) {
    const { to, name } = body;

    const htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Activación de cuenta</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
            }
    
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 32px;
                box-sizing: border-box;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                font-size: 24px;
                color: #333333;
                margin-bottom: 16px;
            }
    
            p {
                font-size: 16px;
                color: #666666;
                line-height: 1.4;
                margin-bottom: 16px;
            }
    
            .footer {
                font-size: 12px;
                color: #999999;
                text-align: center;
                margin-top: 32px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>¡Tu cuenta ha sido activada!</h1>
            <p>Hola {{nombre}},</p>
            <p>Nos complace informarte que hemos activado tu cuenta con éxito. Ahora puedes acceder a nuestra plataforma utilizando tu correo electrónico:</p>
            <p><strong>{{email}}</strong></p>
            <p>¡Esperamos que disfrutes de todos los beneficios y características que nuestra plataforma tiene para ofrecerte!</p>
            <p>Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
            <p>¡Gracias por elegirnos!</p>
            <p>Saludos,</p>
            <p>El equipo de Contarg</p>
        </div>
        <div class="footer">
            &copy; 2023 Contarg. Todos los derechos reservados.
        </div>
    </body>
    </html>
    `;

    const filledTemplate = htmlTemplate
      .replace('{{nombre}}', name)
      .replace('{{email}}', to);

    try {
      await this.sendGridService.sendEmail(
        to,
        'Activación de cuenta',
        ' ',
        filledTemplate,
      );
      return { status: 'Email de activación enviado' };
    } catch (error) {
      console.error(
        'Error al enviar el correo electrónico:',
        error.response.body,
      );
      throw new HttpException(
        'Error al enviar el correo electrónico',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('contacto')
  @Public()
  async sendContactoEmail(@Body() body: { email: string; nombre: string }) {
    const { email, nombre } = body;

    const htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Solicitud de contacto</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
            }
    
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 32px;
                box-sizing: border-box;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                font-size: 24px;
                color: #333333;
                margin-bottom: 16px;
            }
    
            p {
                font-size: 16px;
                color: #666666;
                line-height: 1.4;
                margin-bottom: 16px;
            }
    
            .footer {
                font-size: 12px;
                color: #999999;
                text-align: center;
                margin-top: 32px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>¡Tu consulta ha sido registrada!</h1>
            <p>Hola {{nombre}},</p>
            <p>Nos complace informarte que hemos recibido tu consulta con éxito. En breve personal de nuestro equipo estara analizando vuestra consulta y respondiendo al correo:</p>
            <p><strong>{{email}}</strong></p>
            <p>¡Esperamos que disfrutes de todos los beneficios y características que nuestra plataforma tiene para ofrecerte!</p>
            <p>Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
            <p>¡Gracias por elegirnos!</p>
            <p>Saludos,</p>
            <p>El equipo de Contarg</p>
        </div>
        <div class="footer">
            &copy; 2023 Contarg. Todos los derechos reservados.
        </div>
    </body>
    </html>
    `;

    const filledTemplate = htmlTemplate
      .replace('{{nombre}}', nombre)
      .replace('{{email}}', email);

    try {
      await this.sendGridService.sendEmail(
        email,
        'Soliciud de contacto',
        ' ',
        filledTemplate,
      );
      return { status: 'Email de contacto enviado' };
    } catch (error) {
      console.error(
        'Error al enviar el correo electrónico:',
        error.response.body,
      );
      throw new HttpException(
        'Error al enviar el correo electrónico',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
