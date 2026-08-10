import { legalConfig } from "../../config/legalConfig.ts";

export type InformationPageLink = {
  href: string;
  label: string;
};

export type InformationPageSection = {
  heading: string;
  id: string;
  paragraphs: string[];
  items?: string[];
  links?: InformationPageLink[];
};

export type InformationPageContent = {
  canonicalPath: string;
  description: string;
  eyebrow: string;
  intro: string;
  notice?: string;
  sections: InformationPageSection[];
  title: string;
  updated?: string;
};

export const informationPages = {
  contact: {
    canonicalPath: "/contact",
    description: "Contact AVELIS customer care for fragrance, order and delivery support.",
    eyebrow: "Customer care",
    title: "A considered answer, from a real person.",
    intro:
      "Whether you are choosing a composition, tracing an order or caring for a bottle, begin with a short note. We reply with practical guidance rather than a script.",
    notice: legalConfig.isDemoStore
      ? "Demonstration storefront: support messages and orders are not processed commercially. The configured contact details are provided for portfolio testing."
      : undefined,
    sections: [
      {
        id: "write-to-us",
        heading: "Write to us",
        paragraphs: [
          `Email ${legalConfig.supportEmail} with your name, order number when relevant, and a concise description of what you need. Never include payment-card details or passwords.`,
          "Customer-care hours are Monday to Friday, 09:00-17:00 Europe/Warsaw. A thoughtful reply is normally prepared within two business days.",
        ],
        links: [
          {
            label: "Compose an email",
            href: `mailto:${legalConfig.supportEmail}`,
          },
        ],
      },
      {
        id: "order-support",
        heading: "Order support",
        paragraphs: [
          "For delivery, return or product-condition questions, include the order number shown in your confirmation and account history.",
        ],
        items: [
          "Delivery address corrections requested before dispatch",
          "Return guidance and withdrawal requests",
          "Damaged, missing or incorrect items",
          "Invoice and order-status questions",
        ],
      },
      {
        id: "fragrance-guidance",
        heading: "Fragrance guidance",
        paragraphs: [
          "Tell us which notes you enjoy, when you plan to wear the fragrance and whether you prefer a quiet or more expressive trail. We will suggest a short, explainable edit from the catalogue.",
        ],
        links: [{ label: "Open the fragrance guide", href: "/fragrance-guide" }],
      },
    ],
  },
  deliveryReturns: {
    canonicalPath: "/delivery-returns",
    description: "AVELIS delivery, cancellation, return and faulty-product guidance.",
    eyebrow: "Customer care",
    title: "Delivery with clarity. Returns without theatre.",
    intro:
      "The useful details should arrive before the parcel does: available methods, what happens after dispatch and how to ask for a return or remedy.",
    updated: "10 August 2026",
    notice: legalConfig.isDemoStore
      ? "Demonstration storefront: checkout does not charge a payment method or dispatch a parcel. This policy documents the intended customer-care flow."
      : `Returns are coordinated by ${legalConfig.operatorName}. Contact customer care before sending an item so the correct return address and reference can be issued.`,
    sections: [
      {
        id: "delivery",
        heading: "Delivery",
        paragraphs: [
          "Available delivery methods and their full price are shown at checkout before an order is placed. Dispatch begins after the order is confirmed and stock is allocated.",
          "Tracking details should be sent when a parcel leaves the fulfilment point. Delivery estimates are estimates, not guaranteed dates, unless a specific date is expressly agreed.",
        ],
      },
      {
        id: "change-or-cancel",
        heading: "Change or cancel an order",
        paragraphs: [
          "Contact customer care as soon as possible. An address or cancellation request can only be accepted before the parcel enters carrier handling.",
        ],
      },
      {
        id: "withdrawal",
        heading: "Fourteen-day withdrawal",
        paragraphs: [
          "Consumers buying online in the EU generally have fourteen days from delivery to withdraw without giving a reason. Tell us clearly that you wish to withdraw, then follow the return instructions provided by customer care.",
          "Keep the product sealed and handle it only as much as necessary to establish its nature and characteristics. Statutory exceptions may apply to sealed goods that are not suitable for return for health-protection or hygiene reasons after unsealing.",
        ],
        links: [
          {
            label: "Official EU guidance on returns",
            href: "https://europa.eu/youreurope/citizens/consumers/shopping/shopping-consumer-rights/index_en.htm",
          },
        ],
      },
      {
        id: "faulty-or-damaged",
        heading: "Faulty, damaged or incorrect products",
        paragraphs: [
          "If something arrives damaged, incomplete or different from the order, contact us promptly with the order number and clear photographs of the parcel and product. Your statutory remedies for non-conforming goods are separate from the withdrawal process and are not limited by this page.",
        ],
      },
      {
        id: "refunds",
        heading: "Refunds",
        paragraphs: [
          "Once an accepted return is received and checked, the refund should be issued to the original payment method. Banking and payment-provider processing times may affect when the credit appears.",
        ],
      },
      {
        id: "return-contact",
        heading: "Start a return",
        paragraphs: [
          `Write to ${legalConfig.supportEmail} with the order number, the products being returned and whether the request concerns withdrawal or a faulty item. Customer care will provide the applicable return address and packing instructions.`,
        ],
        links: [
          { label: "Contact customer care", href: "/contact" },
          { label: "Read common questions", href: "/faq" },
        ],
      },
    ],
  },
  faq: {
    canonicalPath: "/faq",
    description: "Answers to common questions about AVELIS fragrance, refills, orders and care.",
    eyebrow: "The useful details",
    title: "Questions, answered with enough context.",
    intro:
      "Fragrance is personal; ordering and care should be straightforward. These are the questions we would want answered before choosing a bottle.",
    sections: [
      {
        id: "choosing",
        heading: "How do I choose a fragrance online?",
        paragraphs: [
          "Begin with a family or atmosphere rather than a long list of notes. The fragrance guide connects families, note layers and wearing contexts, while product pages show the complete composition and available formats.",
        ],
        links: [{ label: "Use the fragrance guide", href: "/fragrance-guide" }],
      },
      {
        id: "longevity",
        heading: "How long will a fragrance last?",
        paragraphs: [
          "Longevity varies with concentration, skin, climate and application. Product-page estimates are directional. Apply to clean skin, avoid rubbing the fragrance in, and reassess it after the opening notes have softened.",
        ],
      },
      {
        id: "gender",
        heading: "Are the fragrances gendered?",
        paragraphs: [
          "AVELIS compositions are presented by material, atmosphere and character. Wear is not restricted by gender; the useful distinction is whether the scent feels right on your skin and in your context.",
        ],
      },
      {
        id: "refills",
        heading: "How do refills work?",
        paragraphs: [
          "Choose the refill made for the same fragrance and compatible bottle volume. Keep the original bottle clean and dry, and follow the handling instructions supplied with the refill. A refill is not a universal mixing vessel.",
        ],
      },
      {
        id: "storage",
        heading: "How should I store perfume?",
        paragraphs: [
          "Keep the bottle upright, tightly closed and away from strong heat, direct sun and repeated temperature changes. A wardrobe or drawer is usually kinder than a bright bathroom shelf.",
        ],
      },
      {
        id: "orders",
        heading: "Where can I see my order?",
        paragraphs: [
          "Signed-in customers can review each order as one container with all purchased compositions grouped inside it. Guest orders remain available from the confirmation flow while the guest access token is valid.",
        ],
        links: [{ label: "Open account orders", href: "/account/orders" }],
      },
    ],
  },
  materials: {
    canonicalPath: "/materials",
    description: "How AVELIS approaches fragrance materials, formulation and packaging.",
    eyebrow: "Material intelligence",
    title: "Chosen for expression, explained without myth.",
    intro:
      "A composition can combine botanical extracts, aroma molecules and carefully selected supporting materials. The standard is not a romantic origin story; it is beauty, safety, stability and traceability working together.",
    sections: [
      {
        id: "palette",
        heading: "A modern palette",
        paragraphs: [
          "Natural extracts bring complexity and variation. Synthetic aroma materials can offer precision, consistency and effects that extraction cannot provide. AVELIS treats both as creative tools and avoids equating natural with automatically safer or superior.",
        ],
      },
      {
        id: "structure",
        heading: "What holds a fragrance together",
        paragraphs: [
          "Perfumer's alcohol carries the aromatic concentrate and helps it diffuse from skin. Small quantities of stabilising or functional materials may be used where required by the formula. Product information should identify the applicable ingredient and allergen disclosures for the market in which it is sold.",
        ],
      },
      {
        id: "responsibility",
        heading: "Responsible selection",
        paragraphs: [
          "Material choices consider performance, regulatory status, supplier documentation and the pressure a material may place on ecosystems or communities. Claims should be specific and supportable rather than hidden behind broad words such as clean or non-toxic.",
        ],
      },
      {
        id: "packaging",
        heading: "Bottle, carton and refill",
        paragraphs: [
          "The refill programme is designed to keep the primary bottle in use. Packaging should protect the formula with no unnecessary layers, while local recycling instructions take priority because collection systems differ by municipality.",
        ],
      },
    ],
  },
  journal: {
    canonicalPath: "/journal",
    description: "AVELIS journal notes on fragrance materials, rituals and composition.",
    eyebrow: "Journal · Edition 01",
    title: "Notes from the space between material and memory.",
    intro:
      "Short editorial studies from the AVELIS practice: how a material changes a composition, why a ritual matters, and what restraint can make visible.",
    sections: [
      {
        id: "ash-as-colour",
        heading: "Ash as colour, not aftermath",
        paragraphs: [
          "Ashwood begins with a contradiction: the pale, mineral impression of something usually imagined as dark. Elemi and juniper create air around the accord; orris softens its edge; vetiver gives the composition a dry grain.",
          "The result is not smoke in a room. It is the quiet colour left when warmth has moved on.",
        ],
        links: [{ label: "Discover Ashwood", href: "/products/ashwood" }],
      },
      {
        id: "reading-notes",
        heading: "How to read a note list",
        paragraphs: [
          "A note list is a map, not a recipe. Some notes name extracts, others describe an effect built from several materials. Read the hierarchy as a sequence of impressions, then let skin and time provide the final interpretation.",
        ],
        links: [{ label: "Explore note layers", href: "/fragrance-guide#notes" }],
      },
      {
        id: "keeping-the-object",
        heading: "Keeping the object",
        paragraphs: [
          "Refilling changes the relationship between fragrance and packaging. The bottle stops being disposable presentation and becomes part of the daily ritual: kept, handled and renewed.",
        ],
      },
    ],
  },
  privacy: {
    canonicalPath: "/privacy",
    description: "AVELIS privacy notice and data-handling overview.",
    eyebrow: "Legal · Privacy",
    title: "Privacy, written in plain language.",
    intro:
      `This notice explains what ${legalConfig.operatorName} can collect through AVELIS, why it is used and the choices available to visitors and account holders.`,
    updated: "10 August 2026",
    notice: legalConfig.isDemoStore
      ? "AVELIS is currently a portfolio demonstration. It does not accept real payment credentials or fulfil commercial orders, and staging data may be reset during development."
      : undefined,
    sections: [
      {
        id: "controller",
        heading: "Who controls the data",
        paragraphs: [
          `${legalConfig.operatorName}, ${legalConfig.operatorAddress}, is responsible for the personal data processed through this storefront. Privacy requests can be sent to ${legalConfig.legalEmail}.`,
        ],
      },
      {
        id: "data",
        heading: "Data the store may process",
        paragraphs: [
          "Depending on how the store is used, records may include account identity and credentials, contact and delivery details, order and payment-status snapshots, wishlist and cart activity, support correspondence, consent choices and basic security logs.",
          "The application should never store full card numbers. A live payment provider would process payment credentials under its own notice and return only the identifiers and status needed to reconcile an order.",
        ],
      },
      {
        id: "purposes",
        heading: "Purposes and legal grounds",
        paragraphs: [
          "Data may be used to create and secure an account, perform an order contract, deliver customer support, meet accounting or consumer-law duties, prevent abuse and—only with the required choice—measure site use or send marketing communications.",
        ],
      },
      {
        id: "retention-sharing",
        heading: "Retention and recipients",
        paragraphs: [
          "Authentication sessions expire after 30 days. Local cart, wishlist and recently viewed data remain in the visitor's browser until cleared. Account and order records remain in the application database until deletion, a staging reset, or a legally required production retention period applies. Support messages should be removed when the request and any required follow-up are complete.",
          "Necessary information may be shared with contracted database, hosting, object-storage, payment, email, analytics and delivery providers under appropriate safeguards. The live vendor register and international-transfer safeguards must match the services actually enabled for the deployment.",
        ],
      },
      {
        id: "security-contact",
        heading: "Security and contact",
        paragraphs: [
          `AVELIS uses restricted administrative access, hashed passwords, opaque session tokens and validated uploads. No internet service is risk-free. Report a privacy or security concern to ${legalConfig.legalEmail}.`,
        ],
        links: [{ label: "Contact customer care", href: "/contact" }],
      },
      {
        id: "rights",
        heading: "Your choices and rights",
        paragraphs: [
          "Depending on the circumstances, people in the EU may have rights to information, access, correction, erasure, restriction, portability and objection, and rights concerning solely automated decisions. Consent can be withdrawn without affecting earlier lawful processing, and a complaint can be made to the competent data-protection authority.",
        ],
        links: [
          {
            label: "European Commission: data-protection rights",
            href: "https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en",
          },
        ],
      },
    ],
  },
  terms: {
    canonicalPath: "/terms",
    description: "Terms for using the AVELIS storefront.",
    eyebrow: "Legal · Terms",
    title: "Terms designed to make the transaction legible.",
    intro:
      "These terms outline how the storefront, accounts and orders are intended to work. Mandatory consumer rights always take priority over conflicting template language.",
    updated: "10 August 2026",
    notice: legalConfig.isDemoStore
      ? "Demonstration terms: checkout creates test records only. No payment is captured, parcel dispatched or commercial contract formed."
      : undefined,
    sections: [
      {
        id: "scope",
        heading: "Store operator and scope",
        paragraphs: [
          `${legalConfig.operatorName}, ${legalConfig.operatorAddress}, operates this AVELIS storefront. Questions can be sent to ${legalConfig.supportEmail}. These terms apply to use of the storefront and, when commercial checkout is enabled, distance purchases offered in supported delivery territories.`,
        ],
      },
      {
        id: "catalogue-orders",
        heading: "Catalogue and ordering",
        paragraphs: [
          "Product pages should state the essential characteristics, total price and available formats. Adding an item to the cart does not reserve stock. An order is submitted only after the checkout summary is reviewed and the order button is activated.",
          legalConfig.isDemoStore
            ? "The customer must provide accurate contact and delivery details. A demonstration confirmation records the test request, but no commercial contract is formed."
            : "The customer must provide accurate contact and delivery details. The sales contract is concluded when the operator sends a dispatch confirmation, unless the checkout expressly states another legally valid point of acceptance.",
        ],
      },
      {
        id: "payment-delivery",
        heading: "Payment and delivery",
        paragraphs: [
          "Accepted payment and delivery methods, costs and any restrictions are presented before submission. Test-mode transactions in this portfolio do not create a real charge or commercial order.",
        ],
      },
      {
        id: "withdrawal-conformity",
        heading: "Withdrawal and product conformity",
        paragraphs: [
          "Consumers buying online in the EU generally receive a fourteen-day withdrawal period, subject to statutory exceptions. Separate legal remedies apply when goods are faulty, damaged or not as agreed. The Delivery & Returns page explains the operational steps without limiting mandatory rights.",
        ],
        links: [
          { label: "Read Delivery & Returns", href: "/delivery-returns" },
          {
            label: "Official EU consumer-rights overview",
            href: "https://europa.eu/youreurope/citizens/consumers/shopping/shopping-consumer-rights/index_en.htm",
          },
        ],
      },
      {
        id: "acceptable-use",
        heading: "Accounts, acceptable use and intellectual property",
        paragraphs: [
          "Keep account credentials confidential and do not interfere with storefront security, automate abusive requests or misuse another person's information. AVELIS names, editorial copy, interface design and original visual assets remain protected by the rights applicable to their owners.",
        ],
      },
      {
        id: "contact-disputes",
        heading: "Questions and complaints",
        paragraphs: [
          `Contact ${legalConfig.supportEmail} first so the operator can review the issue and provide a written response. Nothing in these terms removes a consumer's right to contact the competent consumer-protection authority or use another remedy available under applicable law.`,
        ],
        links: [
          { label: "Contact customer care", href: "/contact" },
          { label: "Read the FAQ", href: "/faq" },
        ],
      },
    ],
  },
  cookies: {
    canonicalPath: "/cookies",
    description: "How the AVELIS portfolio store uses cookies and consent choices.",
    eyebrow: "Legal · Cookies",
    title: "Small files, specific purposes, real choices.",
    intro:
      "Cookies and similar storage can keep a session working, remember a preference or—when permitted—help understand how the storefront is used.",
    updated: "10 August 2026",
    notice:
      "This inventory describes the storage implemented by the current storefront. It must be reviewed whenever analytics vendors, tags or browser-storage keys change.",
    sections: [
      {
        id: "necessary",
        heading: "Strictly necessary storage",
        paragraphs: [
          "Some storage is required to authenticate a session, secure requests, maintain a cart, remember privacy choices or provide a feature expressly requested by the visitor. Disabling it may prevent the store from working correctly.",
        ],
        items: [
          "avelis_session: secure, HTTP-only authentication cookie; expires after 30 days",
          "avelis.cookie-preferences.v1: local consent choices; retained until cleared or replaced",
          "avelis-local-cart: local cart contents; retained until cleared",
          "avelis-local-wishlist and avelis-recently-viewed: local shopping preferences; retained until cleared",
          "avelis-featured-theme: session-only homepage presentation preference",
          "avelis.analytics.purchases.v1: session-only duplicate-event protection",
        ],
      },
      {
        id: "analytics",
        heading: "Analytics",
        paragraphs: [
          "Analytics remains off until the visitor makes the required choice. When enabled, Google Tag Manager may load measurement tags for aggregated journeys such as product views, cart activity and completed demo checkouts. Google or configured tag vendors may then set their own identifiers according to the deployed container configuration.",
        ],
      },
      {
        id: "operator",
        heading: "Who to contact",
        paragraphs: [
          `Questions about storage or consent can be sent to ${legalConfig.legalEmail}. The operator is ${legalConfig.operatorName}, ${legalConfig.operatorAddress}.`,
        ],
        links: [{ label: "Read the privacy notice", href: "/privacy" }],
      },
      {
        id: "manage",
        heading: "Manage or withdraw a choice",
        paragraphs: [
          "Open Cookie preferences in the footer at any time. Withdrawing should be as easy as accepting; the application should update consent state and prevent optional tags from continuing to collect data.",
          "Browser controls can also delete or block storage, although strictly necessary features may then stop working.",
        ],
        links: [
          {
            label: "Official EU cookie guidance for websites",
            href: "https://europa.eu/youreurope/business/growing/digitalising/online-privacy/index_en.htm",
          },
        ],
      },
    ],
  },
} satisfies Record<string, InformationPageContent>;
