// Country code included, no + or spaces — update with your real WhatsApp number
export const WHATSAPP_NUMBER = '918019349487';

export const STORE = {
  name: 'OliveCare – Gadget Repair & Service Centre',
  addressLines: [
    '4/101, 8-2-684/I, Road No. 12,',
    'Kaushik Society, Bhavani Nagar,',
    'Banjara Hills, Hyderabad,',
    'Telangana 500034',
  ],
  landmark: 'Beside Almond House, Road No. 12',
  hours: 'Mon – Sat: 10:00 AM – 7:00 PM',
  closed: 'Sunday: Closed',
  phoneDisplay: '090637 59757',
  phoneHref: 'tel:+919063759757',
  placeId: 'ChIJ91V0Kt-XyzsRqRDYBCp1wp0',
};

const STORE_QUERY = encodeURIComponent(
  'OliveCare - Gadget Repair and Service Centre, Banjara Hills, Hyderabad',
);

export const STORE_MAP_EMBED_URL = `https://maps.google.com/maps?q=${STORE_QUERY}&z=16&output=embed`;
export const STORE_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${STORE_QUERY}&destination_place_id=${STORE.placeId}`;

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
