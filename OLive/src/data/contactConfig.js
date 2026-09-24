// Country code included, no + or spaces — update with your real WhatsApp number
export const WHATSAPP_NUMBER = '918019349487';

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hi Olive ifixit, I need help with a repair. My device is ';

export const getWhatsAppUrl = (message = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const SERVICE_LABELS = {
  walkin: 'Walk-in Repair',
  delivery: 'Doorstep Pickup & Delivery',
};

export function buildBookingWhatsAppMessage({
  categoryName,
  modelInput,
  issueLabel,
  serviceMode,
  deliveryAddress,
  customerName,
  customerPhone,
  customerEmail,
  notes,
}) {
  const lines = [
    "Hi Olive iFixit, I'd like to book a repair.",
    '',
    `Device: ${categoryName} — ${modelInput}`,
    `Issue: ${issueLabel}`,
    `Service: ${SERVICE_LABELS[serviceMode] || serviceMode}`,
  ];

  if (serviceMode === 'delivery' && deliveryAddress) {
    lines.push(`Address: ${deliveryAddress}`);
  }

  lines.push(
    `Name: ${customerName}`,
    `Phone: ${customerPhone}`,
    `Email: ${customerEmail}`,
  );

  if (notes?.trim()) {
    lines.push(`Notes: ${notes.trim()}`);
  }

  lines.push('', 'Please confirm my booking. Thank you!');

  return lines.join('\n');
}

export function buildWarrantyWhatsAppMessage({
  customerName,
  customerPhone,
  deviceModel,
  imei,
  jobNumber,
  repair,
  warrantyPeriod,
  deliveryDate,
  validTill,
  issue,
  fileName,
}) {
  const lines = [
    "Hi Olive iFixit, I'd like to submit a warranty application.",
    '',
    `Name: ${customerName}`,
    `Phone: ${customerPhone}`,
    `Device: ${deviceModel}`,
  ];

  if (imei?.trim()) {
    lines.push(`IMEI / Serial: ${imei.trim()}`);
  }

  lines.push(
    `Job / Invoice: ${jobNumber}`,
    `Repair / Service: ${repair}`,
    `Warranty Period: ${warrantyPeriod}`,
    `Delivery Date: ${deliveryDate}`,
    `Warranty Valid Till: ${validTill}`,
    `Issue: ${issue}`,
  );

  if (fileName) {
    lines.push(
      `Warranty card / invoice file: ${fileName}`,
      'I will send the photo in this chat.',
    );
  }

  lines.push('', 'Please review my warranty request. Thank you!');

  return lines.join('\n');
}
