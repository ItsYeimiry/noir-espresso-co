/**
 * Single source of truth for the whole site.
 * To white-label the template: edit `site`, the two menus, and `ui`.
 * Images live in /public/images and are referenced by path below.
 */

export type Lang = "es" | "en";
export type L = Record<Lang, string>;

export const site = {
  name: "Noir Espresso Co.",
  url: "https://noir-espresso.example",
  defaultLang: "es" as Lang,
  currency: "$",
  /** International format, digits only. Reservations are sent to this WhatsApp number. */
  whatsapp: "10000000000",
  hours: { open: "08:00", close: "21:30" },
  address: {
    street: "Calle Ejemplo 123",
    city: "Tu ciudad",
    country: "País",
  },
  email: "hola@noir-espresso.example",
  phone: "+1 000 000 0000",
  social: {
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
  },
  maxGuests: 10,
  /** Footer credit required by the Claude Web Builder licence. Set to false to remove. */
  showCredit: true,
} as const;

export type Coffee = {
  id: string;
  image: string;
  name: L;
  kicker: L;
  notes: L[];
  description: L;
  origin: L;
  method: L;
  temp: string;
  time: string;
  price: number;
};

export type Pastry = {
  id: string;
  image: string;
  name: L;
  tag: L;
  description: L;
  notes: L[];
  pairing: string;
  price: number;
};

const l = (es: string, en: string): L => ({ es, en });

export const coffees: Coffee[] = [
  {
    id: "geisha",
    image: "/images/coffee/01-geisha.jpg",
    name: l("Geisha Panameño", "Panama Geisha"),
    kicker: l("En V60", "V60 pour-over"),
    notes: [l("Floral", "Floral"), l("Cítrico", "Citrus"), l("Bergamota", "Bergamot")],
    description: l(
      "Un café de altura servido en filtro para que se note cada capa. Aroma de jazmín, acidez limpia de cítricos y un final largo y delicado.",
      "A high-altitude coffee brewed through paper so every layer shows. Jasmine aroma, clean citrus acidity and a long, delicate finish.",
    ),
    origin: l("Boquete, Panamá", "Boquete, Panama"),
    method: l("Filtrado V60", "V60 pour-over"),
    temp: "92 °C",
    time: "3:30",
    price: 16,
  },
  {
    id: "siphon",
    image: "/images/coffee/02-siphon.jpg",
    name: l("Blue Mountain", "Blue Mountain"),
    kicker: l("Sifón japonés", "Japanese siphon"),
    notes: [l("Suave", "Smooth"), l("Dulce", "Sweet"), l("Sin amargor", "No bitterness")],
    description: l(
      "Preparado frente a ti con vapor y vacío. Una taza ligera, aterciopelada y muy limpia, con dulzor de nuez y cacao.",
      "Brewed at your table with steam and vacuum. A light, velvety, very clean cup with notes of walnut and cacao.",
    ),
    origin: l("Montañas Azules, Jamaica", "Blue Mountains, Jamaica"),
    method: l("Sifón", "Siphon"),
    temp: "90 °C",
    time: "1:45",
    price: 18,
  },
  {
    id: "nitro",
    image: "/images/coffee/03-nitro.jpg",
    name: l("Nitro Cold Brew", "Nitro Cold Brew"),
    kicker: l("Infusión de nitrógeno", "Nitrogen-infused"),
    notes: [l("Cremoso", "Creamy"), l("Cacao", "Cacao"), l("Frío", "Cold")],
    description: l(
      "Veinte horas de extracción en frío y una cascada de nitrógeno que lo vuelve espeso y sedoso, sin leche ni azúcar.",
      "Twenty hours of cold extraction and a cascade of nitrogen that makes it thick and silky, with no milk or sugar.",
    ),
    origin: l("Huila, Colombia", "Huila, Colombia"),
    method: l("Cold brew + N₂", "Cold brew + N₂"),
    temp: "4 °C",
    time: "20 h",
    price: 8,
  },
  {
    id: "flatwhite",
    image: "/images/coffee/04-flatwhite.jpg",
    name: l("Flat White", "Flat White"),
    kicker: l("Arte latte avanzado", "Advanced latte art"),
    notes: [l("Sedoso", "Silky"), l("Caramelo", "Caramel"), l("Intenso", "Bold")],
    description: l(
      "Doble ristretto y leche texturizada a microespuma. Cada taza lleva un dibujo hecho a mano por nuestro barista.",
      "Double ristretto and micro-foamed milk. Every cup carries a design poured by hand by our barista.",
    ),
    origin: l("Cerrado, Brasil", "Cerrado, Brazil"),
    method: l("Espresso + leche", "Espresso + milk"),
    temp: "62 °C",
    time: "0:28",
    price: 6,
  },
  {
    id: "macchiato",
    image: "/images/coffee/05-macchiato.jpg",
    name: l("Macchiato Ahumado", "Smoked Macchiato"),
    kicker: l("Madera de manzano", "Applewood smoke"),
    notes: [l("Humo suave", "Soft smoke"), l("Manzana", "Apple"), l("Tostado", "Toasted")],
    description: l(
      "Espresso corto con una nube de humo de manzano que se libera al levantar la campana de cristal.",
      "A short espresso under a cloud of applewood smoke, released when the glass cloche is lifted.",
    ),
    origin: l("Antigua, Guatemala", "Antigua, Guatemala"),
    method: l("Espresso ahumado", "Smoked espresso"),
    temp: "65 °C",
    time: "0:30",
    price: 9,
  },
  {
    id: "tonic",
    image: "/images/coffee/06-tonic.jpg",
    name: l("Espresso Tonic", "Espresso Tonic"),
    kicker: l("Tónica artesanal y romero", "Craft tonic and rosemary"),
    notes: [l("Burbujeante", "Sparkling"), l("Herbal", "Herbal"), l("Cítrico", "Citrus")],
    description: l(
      "Tónica artesanal sobre hielo claro, una ramita de romero y un espresso que cae despacio por encima. Fresco y amargo en el punto justo.",
      "Craft tonic over clear ice, a sprig of rosemary and an espresso poured slowly on top. Fresh, with just the right bitterness.",
    ),
    origin: l("Yirgacheffe, Etiopía", "Yirgacheffe, Ethiopia"),
    method: l("Espresso + tónica", "Espresso + tonic"),
    temp: "6 °C",
    time: "0:40",
    price: 8,
  },
  {
    id: "rose",
    image: "/images/coffee/07-rose.jpg",
    name: l("Latte de Rosa", "Rose Latte"),
    kicker: l("Pétalos y cardamomo", "Petals and cardamom"),
    notes: [l("Floral", "Floral"), l("Especiado", "Spiced"), l("Cremoso", "Creamy")],
    description: l(
      "Jarabe de pétalos de rosa y cardamomo molido al momento, con leche cremosa y un espresso suave.",
      "Rose-petal syrup and freshly ground cardamom with creamy milk and a gentle espresso.",
    ),
    origin: l("Sidamo, Etiopía", "Sidamo, Ethiopia"),
    method: l("Espresso + leche", "Espresso + milk"),
    temp: "60 °C",
    time: "0:35",
    price: 8,
  },
  {
    id: "affogato",
    image: "/images/coffee/08-affogato.jpg",
    name: l("Affogato Premium", "Premium Affogato"),
    kicker: l("Gelato de vainilla en vaina", "Vanilla-bean gelato"),
    notes: [l("Vainilla", "Vanilla"), l("Caliente y frío", "Hot and cold"), l("Postre", "Dessert")],
    description: l(
      "Doble espresso caliente sobre una bola de gelato de vainilla en vaina. Se sirve en el momento y se come con cuchara.",
      "A hot double espresso over a scoop of vanilla-bean gelato. Served at once and eaten with a spoon.",
    ),
    origin: l("Tarrazú, Costa Rica", "Tarrazú, Costa Rica"),
    method: l("Doble espresso", "Double espresso"),
    temp: "—",
    time: "0:30",
    price: 9,
  },
  {
    id: "mocha",
    image: "/images/coffee/09-mocha.jpg",
    name: l("Moca Belga", "Belgian Mocha"),
    kicker: l("Chocolate al 70%", "70% chocolate"),
    notes: [l("Chocolate oscuro", "Dark chocolate"), l("Avellana", "Hazelnut"), l("Redondo", "Round")],
    description: l(
      "Chocolate belga al 70% fundido a mano con espresso doble y leche vaporizada. Intenso, sin ser empalagoso.",
      "70% Belgian chocolate melted by hand with double espresso and steamed milk. Rich without being sweet.",
    ),
    origin: l("Oaxaca, México", "Oaxaca, Mexico"),
    method: l("Espresso + leche", "Espresso + milk"),
    temp: "64 °C",
    time: "0:45",
    price: 7,
  },
  {
    id: "olla",
    image: "/images/coffee/10-olla.jpg",
    name: l("Café de Olla", "Café de Olla"),
    kicker: l("Deconstruido, extracción en frío", "Deconstructed, cold extraction"),
    notes: [l("Canela", "Cinnamon"), l("Piloncillo", "Piloncillo"), l("Clavo", "Clove")],
    description: l(
      "La receta de siempre separada en tres: extracción en frío, jarabe de piloncillo y canela, y una espuma de clavo.",
      "The classic recipe split into three parts: a cold extraction, a piloncillo and cinnamon syrup, and a clove foam.",
    ),
    origin: l("Chiapas, México", "Chiapas, Mexico"),
    method: l("Extracción en frío", "Cold extraction"),
    temp: "8 °C",
    time: "16 h",
    price: 7,
  },
];

export const pastries: Pastry[] = [
  {
    id: "tiramisu",
    image: "/images/pastry/01-tiramisu.jpg",
    name: l("Tiramisú de Autor", "Signature Tiramisu"),
    tag: l("Cremoso", "Creamy"),
    description: l(
      "Mascarpone batido, bizcocho empapado en espresso y cacao puro, coronado con láminas de oro comestible.",
      "Whipped mascarpone, espresso-soaked sponge and pure cocoa, finished with edible gold leaf.",
    ),
    notes: [l("Mascarpone", "Mascarpone"), l("Espresso", "Espresso"), l("Oro comestible", "Edible gold")],
    pairing: "flatwhite",
    price: 12,
  },
  {
    id: "opera",
    image: "/images/pastry/02-opera.jpg",
    name: l("Pastel Ópera", "Opéra Cake"),
    tag: l("Clásico", "Classic"),
    description: l(
      "Siete capas de bizcocho de almendra, crema de mantequilla de café y ganache de chocolate, con glaseado brillante.",
      "Seven layers of almond sponge, coffee buttercream and chocolate ganache under a mirror glaze.",
    ),
    notes: [l("Almendra", "Almond"), l("Café", "Coffee"), l("Chocolate", "Chocolate")],
    pairing: "siphon",
    price: 11,
  },
  {
    id: "matcha",
    image: "/images/pastry/03-matcha.jpg",
    name: l("Mille Crêpe de Matcha", "Matcha Mille Crêpe"),
    tag: l("Té", "Tea"),
    description: l(
      "Veinte crêpes finísimas de matcha de grado ceremonial intercaladas con crema de mascarpone.",
      "Twenty paper-thin ceremonial-grade matcha crêpes layered with mascarpone cream.",
    ),
    notes: [l("Matcha", "Matcha"), l("Mascarpone", "Mascarpone"), l("Ligero", "Light")],
    pairing: "tonic",
    price: 10,
  },
  {
    id: "macaron",
    image: "/images/pastry/04-macaron.jpg",
    name: l("Macaron Ispahan", "Ispahan Macaron"),
    tag: l("Frutal", "Fruity"),
    description: l(
      "Concha de almendra rosa rellena de crema de rosas, frambuesa fresca y lichi.",
      "A rose almond shell filled with rose cream, fresh raspberry and lychee.",
    ),
    notes: [l("Frambuesa", "Raspberry"), l("Lichi", "Lychee"), l("Rosa", "Rose")],
    pairing: "rose",
    price: 5,
  },
  {
    id: "basque",
    image: "/images/pastry/05-basque.jpg",
    name: l("Tarta de Queso Vasca", "Basque Cheesecake"),
    tag: l("Cremoso", "Creamy"),
    description: l(
      "Horneada a alta temperatura hasta quemar la superficie y dejar el centro cremoso, con un toque de miel trufada.",
      "Baked hot until the top caramelises and the centre stays creamy, with a touch of truffle honey.",
    ),
    notes: [l("Queso crema", "Cream cheese"), l("Miel trufada", "Truffle honey"), l("Caramelizado", "Caramelised")],
    pairing: "mocha",
    price: 10,
  },
  {
    id: "volcan",
    image: "/images/pastry/06-volcan.jpg",
    name: l("Volcán de Chocolate", "Dark Chocolate Fondant"),
    tag: l("Chocolate", "Chocolate"),
    description: l(
      "Chocolate oscuro con centro líquido, servido tibio. Se hornea al pedido, así que tarda doce minutos.",
      "Dark chocolate with a molten centre, served warm. Baked to order, so it takes twelve minutes.",
    ),
    notes: [l("Chocolate oscuro", "Dark chocolate"), l("Tibio", "Warm"), l("Centro líquido", "Molten centre")],
    pairing: "affogato",
    price: 11,
  },
  {
    id: "eclair",
    image: "/images/pastry/07-eclair.jpg",
    name: l("Éclair de Pistacho", "Pistachio Éclair"),
    tag: l("Frutal", "Fruity"),
    description: l(
      "Choux crujiente relleno de crema de pistacho de Bronte y frambuesas frescas.",
      "Crisp choux filled with Bronte pistachio cream and fresh raspberries.",
    ),
    notes: [l("Pistacho", "Pistachio"), l("Frambuesa", "Raspberry"), l("Crujiente", "Crisp")],
    pairing: "geisha",
    price: 9,
  },
  {
    id: "yuzu",
    image: "/images/pastry/08-yuzu.jpg",
    name: l("Tarta de Limón Yuzu", "Yuzu Lemon Tart"),
    tag: l("Cítrico", "Citrus"),
    description: l(
      "Base de mantequilla, crema de yuzu y merengue suizo flameado a la vista.",
      "Buttery shell, yuzu curd and Swiss meringue torched at the table.",
    ),
    notes: [l("Yuzu", "Yuzu"), l("Merengue", "Meringue"), l("Ácido", "Tart")],
    pairing: "tonic",
    price: 9,
  },
  {
    id: "praline",
    image: "/images/pastry/09-praline.jpg",
    name: l("Mousse de Praliné", "Hazelnut Praline Mousse"),
    tag: l("Chocolate", "Chocolate"),
    description: l(
      "Mousse aireada de praliné de avellanas sobre un crujiente de galleta, cubierta con glaseado espejo.",
      "An airy hazelnut praline mousse on a crisp biscuit base, finished with a mirror glaze.",
    ),
    notes: [l("Avellana", "Hazelnut"), l("Caramelo", "Caramel"), l("Glaseado espejo", "Mirror glaze")],
    pairing: "olla",
    price: 10,
  },
  {
    id: "pannacotta",
    image: "/images/pastry/10-pannacotta.jpg",
    name: l("Panna Cotta de Azafrán", "Saffron Panna Cotta"),
    tag: l("Cremoso", "Creamy"),
    description: l(
      "Crema temblorosa infusionada con azafrán y cardamomo, servida con un hilo de miel.",
      "A softly set cream infused with saffron and cardamom, served with a thread of honey.",
    ),
    notes: [l("Azafrán", "Saffron"), l("Cardamomo", "Cardamom"), l("Miel", "Honey")],
    pairing: "rose",
    price: 9,
  },
];

export const ui = {
  nav: {
    coffee: l("Café", "Coffee"),
    method: l("Método", "Method"),
    pastry: l("Repostería", "Pastry"),
    reserve: l("Reservar", "Reserve"),
    menu: l("Menú", "Menu"),
    close: l("Cerrar", "Close"),
    skip: l("Saltar al contenido", "Skip to content"),
    theme: l("Cambiar tema", "Toggle theme"),
    language: l("Cambiar idioma", "Change language"),
    homeLabel: l("Noir Espresso Co., inicio", "Noir Espresso Co., home"),
  },
  hero: {
    open: l("Todos los días", "Every day"),
    title: l("Café de especialidad. Alta repostería.", "Specialty coffee. Fine pastry."),
    sub: l(
      "Diez cafés y diez postres, preparados a mano y servidos sin prisa.",
      "Ten coffees and ten desserts, made by hand and served without hurry.",
    ),
    seeMenu: l("Ver la carta", "See the menu"),
    book: l("Reservar mesa", "Reserve a table"),
  },
  statement: {
    text: l(
      "Tostamos en lotes pequeños, extraemos por gramos y servimos a la temperatura exacta. Lo demás es ruido.",
      "We roast in small batches, extract by the gram and serve at the exact temperature. Everything else is noise.",
    ),
  },
  tiles: {
    title: l("Qué encontrarás", "What you'll find"),
    coffee: { t: l("Diez cafés de especialidad", "Ten specialty coffees"), d: l("Del filtrado al sifón, uno por uno.", "From pour-over to siphon, one by one.") },
    pastry: { t: l("Diez postres de autor", "Ten signature desserts"), d: l("Hechos cada mañana en nuestro obrador.", "Made every morning in our pastry kitchen.") },
    reserve: { t: l("Una mesa para ti", "A table for you"), d: l("Reserva por WhatsApp en un minuto.", "Reserve on WhatsApp in a minute.") },
    cta: l("Explorar", "Explore"),
  },
  coffee: {
    eyebrow: l("La carta de café", "The coffee menu"),
    title: l("Diez formas de entender un grano.", "Ten ways to understand a bean."),
    details: l("Ver detalle", "View details"),
    origin: l("Origen", "Origin"),
    method: l("Método", "Method"),
    temp: l("Temperatura", "Temperature"),
    time: l("Tiempo", "Time"),
    notes: l("Notas", "Notes"),
    of: l("de", "of"),
    prev: l("Anterior", "Previous"),
    next: l("Siguiente", "Next"),
  },
  method: {
    eyebrow: l("El método", "The method"),
    title: l("Del cafetal a tu taza.", "From the farm to your cup."),
    steps: [
      {
        k: l("Origen", "Origin"),
        t: l("Compramos directo a productores.", "We buy direct from producers."),
        d: l(
          "Elegimos fincas por altura, variedad y proceso. Cada lote llega con su historia y su precio justo.",
          "We choose farms by altitude, variety and process. Every lot arrives with its story and a fair price.",
        ),
        image: "/images/method/origin.jpg",
      },
      {
        k: l("Tueste", "Roast"),
        t: l("Lotes de pocos kilos.", "Batches of a few kilos."),
        d: l(
          "Tostamos cada semana, con perfiles pensados para filtro o espresso, y dejamos reposar antes de servir.",
          "We roast every week with profiles built for filter or espresso, and rest the coffee before serving.",
        ),
        image: "/images/method/roast.jpg",
      },
      {
        k: l("Extracción", "Extraction"),
        t: l("Gramos, segundos y grados.", "Grams, seconds and degrees."),
        d: l(
          "Pesamos, medimos el agua y cronometramos cada preparación. Si la taza no cumple, se repite.",
          "We weigh, measure the water and time every brew. If the cup misses, we make it again.",
        ),
        image: "/images/method/extraction.jpg",
      },
      {
        k: l("Servicio", "Service"),
        t: l("Sin prisa, a tu ritmo.", "Unhurried, at your pace."),
        d: l(
          "Te contamos qué estás tomando si quieres saberlo, y te dejamos en paz si prefieres el silencio.",
          "We tell you what you're drinking if you want to know, and leave you in peace if you prefer silence.",
        ),
        image: "/images/method/service.jpg",
      },
    ],
  },
  pastry: {
    eyebrow: l("Alta repostería", "Fine pastry"),
    title: l("Postres que se piden dos veces.", "Desserts you order twice."),
    all: l("Todos", "All"),
    pairing: l("Maridaje sugerido", "Suggested pairing"),
    details: l("Ver detalle", "View details"),
    notes: l("Notas", "Notes"),
  },
  reserve: {
    eyebrow: l("Reservas", "Reservations"),
    title: l("Reserva tu mesa.", "Reserve your table."),
    sub: l(
      "Rellena el formulario y abrimos WhatsApp con tu mensaje listo. Te confirmamos en pocos minutos.",
      "Fill in the form and we open WhatsApp with your message ready. We confirm within minutes.",
    ),
    name: l("Nombre", "Name"),
    date: l("Fecha", "Date"),
    time: l("Hora", "Time"),
    guests: l("Personas", "Guests"),
    notes: l("Notas (opcional)", "Notes (optional)"),
    notesHint: l("Alergias, ocasión especial, mesa preferida…", "Allergies, special occasion, preferred table…"),
    submit: l("Reservar por WhatsApp", "Reserve on WhatsApp"),
    hours: l("Abrimos todos los días de", "Open every day from"),
    to: l("a", "to"),
    errName: l("Escribe tu nombre.", "Enter your name."),
    errDate: l("Elige una fecha.", "Pick a date."),
    errTime: l("Elige una hora entre la apertura y 30 minutos antes del cierre.", "Pick a time between opening and 30 minutes before closing."),
    message: (lang: Lang, v: { name: string; date: string; time: string; guests: string; notes: string }) =>
      lang === "es"
        ? `Hola, soy ${v.name}. Quiero reservar una mesa en ${site.name} el ${v.date} a las ${v.time} para ${v.guests} ${Number(v.guests) === 1 ? "persona" : "personas"}.${v.notes ? ` Notas: ${v.notes}` : ""}`
        : `Hi, I'm ${v.name}. I'd like to reserve a table at ${site.name} on ${v.date} at ${v.time} for ${v.guests} ${Number(v.guests) === 1 ? "guest" : "guests"}.${v.notes ? ` Notes: ${v.notes}` : ""}`,
  },
  footer: {
    visit: l("Visítanos", "Visit us"),
    hours: l("Horario", "Hours"),
    daily: l("Todos los días", "Every day"),
    contact: l("Contacto", "Contact"),
    follow: l("Síguenos", "Follow"),
    rights: l("Todos los derechos reservados.", "All rights reserved."),
    credit: l("Hecho con Claude Web Builder por", "Built with Claude Web Builder by"),
  },
  dialog: {
    close: l("Cerrar detalle", "Close details"),
    reserveCta: l("Reservar mesa", "Reserve a table"),
  },
  seo: {
    title: l(
      "Noir Espresso Co. | Café de especialidad y alta repostería",
      "Noir Espresso Co. | Specialty coffee and fine pastry",
    ),
    description: l(
      "Diez cafés de especialidad y diez postres de autor, preparados a mano. Abierto todos los días de 8:00 a 21:30. Reserva tu mesa por WhatsApp.",
      "Ten specialty coffees and ten signature desserts, made by hand. Open every day 8:00 AM to 9:30 PM. Reserve your table on WhatsApp.",
    ),
  },
};

export const t = (value: L, lang: Lang) => value[lang];
export const money = (n: number) => `${site.currency}${n}`;
export const coffeeById = (id: string) => coffees.find((c) => c.id === id);
