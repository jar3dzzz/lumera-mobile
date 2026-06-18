export type SupportContactType = 'whatsapp' | 'call' | 'email';

export function getSupportContactAlert(type: SupportContactType): {
  title: string;
  message: string;
} {
  switch (type) {
    case 'whatsapp':
      return {
        title: 'WhatsApp Soporte',
        message: 'Abriendo chat de WhatsApp con soporte técnico (+52 55 1234 5678)...',
      };
    case 'call':
      return {
        title: 'Llamar a soporte',
        message: 'Iniciando llamada telefónica al 800-LUMERA-AGRO (Lun-Vie 9:00 - 18:00)...',
      };
    case 'email':
      return {
        title: 'Enviar correo',
        message: 'Abriendo cliente de correo hacia soporte@lumera.mx...',
      };
  }
}
