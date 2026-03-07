export const CONTACT = {
  address: "Tsu-120 Wakamatsumachi, Kanazawa, Ishikawa 920-1165",
  phone: "090-7086-3480",
  phoneTel: "tel:09070863480",
  lat: 36.5549,
  lon: 136.6956,
  get mapsDirectionsUrl() {
    return `https://www.google.com/maps/dir/?api=1&destination=${this.lat},${this.lon}`;
  },
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51811.27!2d136.6956!3d36.5549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff8339b84a5b3e5%3A0x68b1e28bf5d5b2cf!2sKanazawa%2C%20Ishikawa!5e0!3m2!1sen!2sjp!4v1",
  whatsappGroup: "https://chat.whatsapp.com/LdAkegfVEvGFnc5cNeiCBb?mode=gi_t",
  whatsappCommunity: "https://chat.whatsapp.com/FFyOi9ydqHg6cLNzFr0MIV",
  imam: {
    name: "Imam Maulana Ilyas",
    phone: "+62 823-2611-2991",
    whatsapp: "https://wa.me/6282326112991",
  },
};
