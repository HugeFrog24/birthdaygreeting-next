import { GreetingConfig, Wish } from "../types/greeting";

export type Language = "en" | "de" | "ru" | "ka";
export type Formality =
  | "formal"
  | "informal"
  | "parent.mama"
  | "parent.papa"
  | "intimate";

interface GreetingTemplates {
  greetingText: string;
  message: {
    formal: string;
    informal: string;
    "parent.mama": string;
    "parent.papa": string;
    intimate: string;
  };
  wishes: {
    dream: string;
    celebration: string;
    enjoyment: string;
  };
  signature: {
    formal: {
      anonymous: string;
      custom: string;
    };
    informal: {
      anonymous: string;
      custom: string;
    };
    "parent.mama": {
      anonymous: string;
      custom: string;
    };
    "parent.papa": {
      anonymous: string;
      custom: string;
    };
    intimate: {
      anonymous: string;
      custom: string;
    };
  };
}

export const defaultNames: Record<Language, Record<Formality, string>> = {
  en: {
    informal: "Friend",
    formal: "Dear Guest",
    "parent.mama": "Dear Mom",
    "parent.papa": "Dear Dad",
    intimate: "My Love",
  },
  de: {
    informal: "Freund",
    formal: "Sehr geehrter Gast",
    "parent.mama": "Liebe Mama",
    "parent.papa": "Lieber Papa",
    intimate: "Mein Schatz",
  },
  ru: {
    informal: "Друг",
    formal: "Уважаемый гость",
    "parent.mama": "Дорогая мама",
    "parent.papa": "Дорогой папа",
    intimate: "Любимый",
  },
  ka: {
    informal: "მეგობარო",
    formal: "პატივცემულო სტუმარო",
    "parent.mama": "ძვირფასო დედა",
    "parent.papa": "ძვირფასო მამა",
    intimate: "ჩემო სიყვარულო",
  },
};

const templates: Record<Language, GreetingTemplates> = {
  en: {
    greetingText: "Happy Birthday, {name}!",
    message: {
      informal:
        "Wishing you a fantastic birthday filled with joy and wonderful surprises!",
      formal:
        "I extend my warmest wishes on your birthday. May this special day bring you joy and wonderful moments.",
      "parent.mama":
        "Mom, thank you for your endless love and care. On your birthday, I want you to know how much you mean to me.",
      "parent.papa":
        "Dad, thank you for always being there for me. On your birthday, I want you to know how much you mean to me.",
      intimate:
        "Happy birthday to the most special person in my life. Every moment with you is a gift.",
    },
    wishes: {
      dream: "May all your dreams come true",
      celebration: "Have an amazing celebration",
      enjoyment: "Enjoy your special day",
    },
    signature: {
      formal: {
        anonymous: "Best regards,\nYour well-wisher",
        custom: "Best regards,\n{signatureName}",
      },
      informal: {
        anonymous: "With love,\nYour friend",
        custom: "With love,\n{signatureName}",
      },
      "parent.mama": {
        anonymous: "With gratitude and love,\nYour loving child",
        custom: "With gratitude and love,\n{signatureName}",
      },
      "parent.papa": {
        anonymous: "With gratitude and love,\nYour loving child",
        custom: "With gratitude and love,\n{signatureName}",
      },
      intimate: {
        anonymous: "Forever yours,\nWith all my love",
        custom: "Forever yours,\n{signatureName}",
      },
    },
  },
  de: {
    greetingText: "Alles Gute zum Geburtstag, {name}!",
    message: {
      informal:
        "Ich wünsche dir einen wundervollen Geburtstag! Möge dein Tag voller Freude, Lachen und schöner Überraschungen sein!",
      formal:
        "Ich wünsche Ihnen einen wundervollen Geburtstag! Möge Ihr Tag voller Freude und schöner Überraschungen sein!",
      "parent.mama":
        "Mama, danke für deine endlose Liebe und Fürsorge. An deinem Geburtstag möchte ich dir sagen, wie viel du mir bedeutest.",
      "parent.papa":
        "Papa, danke dass du immer für mich da bist. An deinem Geburtstag möchte ich dir sagen, wie viel du mir bedeutest.",
      intimate:
        "Alles Liebe zum Geburtstag, mein Schatz. Jeder Moment mit dir ist ein Geschenk.",
    },
    wishes: {
      dream: "Mögen all deine Träume wahr werden",
      celebration: "Genieße deinen besonderen Tag in vollen Zügen",
      enjoyment: "Lass es dir gut gehen und feier schön",
    },
    signature: {
      formal: {
        anonymous: "Herzliche Grüße,\nIhr Wohlwünscher",
        custom: "Herzliche Grüße,\n{signatureName}",
      },
      informal: {
        anonymous: "Herzlichst,\nDein Freund",
        custom: "Herzlichst,\n{signatureName}",
      },
      "parent.mama": {
        anonymous: "In Liebe und Dankbarkeit,\nDein Kind",
        custom: "In Liebe und Dankbarkeit,\n{signatureName}",
      },
      "parent.papa": {
        anonymous: "In Liebe und Dankbarkeit,\nDein Kind",
        custom: "In Liebe und Dankbarkeit,\n{signatureName}",
      },
      intimate: {
        anonymous: "Für immer dein,\nIn ewiger Liebe",
        custom: "Für immer dein,\n{signatureName}",
      },
    },
  },
  ru: {
    greetingText: "С Днём Рождения, {name}!",
    message: {
      informal:
        "От всей души поздравляю тебя с днём рождения! Пусть этот день будет наполнен радостью и счастьем!",
      formal:
        "Сердечно поздравляю Вас с днём рождения! Пусть этот день будет наполнен радостью и прекрасными моментами!",
      "parent.mama":
        "Мама, спасибо за твою бесконечную любовь и заботу. В твой день рождения хочу сказать, как много ты для меня значишь.",
      "parent.papa":
        "Папа, спасибо что ты всегда рядом. В твой день рождения хочу сказать, как много ты для меня значишь.",
      intimate:
        "С днём рождения, любимый человек. Каждый момент с тобой - это подарок судьбы.",
    },
    wishes: {
      dream: "Пусть все твои мечты сбываются",
      celebration: "Веселись от души и наслаждайся каждым моментом",
      enjoyment: "Пусть этот день принесёт много радости",
    },
    signature: {
      formal: {
        anonymous: "С уважением,\nВаш доброжелатель",
        custom: "С уважением,\n{signatureName}",
      },
      informal: {
        anonymous: "С любовью,\nТвой друг",
        custom: "С любовью,\n{signatureName}",
      },
      "parent.mama": {
        anonymous: "С любовью и благодарностью,\nТвой ребёнок",
        custom: "С любовью и благодарностью,\n{signatureName}",
      },
      "parent.papa": {
        anonymous: "С любовью и благодарностью,\nТвой ребёнок",
        custom: "С любовью и благодарностью,\n{signatureName}",
      },
      intimate: {
        anonymous: "Навсегда твой,\nСо всей моей любовью",
        custom: "Навсегда твой,\n{signatureName}",
      },
    },
  },
  ka: {
    greetingText: "გილოცავ დაბადების დღეს, {name}!",
    message: {
      informal:
        "გისურვებ მხიარულ დაბადების დღეს, სავსეს სიხარულითა და სასიამოვნო სიურპრიზებით!",
      formal:
        "გულითადად გილოცავთ დაბადების დღეს. დაე, ეს განსაკუთრებული დღე იყოს სიხარულითა და საოცარი მომენტებით სავსე.",
      "parent.mama":
        "დედა, მადლობა შენი უსაზღვრო სიყვარულისა და ზრუნვისთვის. შენს დაბადების დღეს მინდა იცოდე, რამდენს ნიშნავ ჩემთვის.",
      "parent.papa":
        "მამა, მადლობა რომ ყოველთვის ჩემს გვერდით ხარ. შენს დაბადების დღეს მინდა იცოდე, რამდენს ნიშნავ ჩემთვის.",
      intimate:
        "გილოცავ დაბადების დღეს, ჩემო ყველაზე ძვირფასო ადამიანო. ყოველი წუთი შენთან ერთად საჩუქარია.",
    },
    wishes: {
      dream: "დაე, ყველა შენი ოცნება ახდეს",
      celebration: "იზეიმე შესანიშნავად",
      enjoyment: "დატკბი შენი განსაკუთრებული დღით",
    },
    signature: {
      formal: {
        anonymous: "პატივისცემით,\nთქვენი კეთილისმსურველი",
        custom: "პატივისცემით,\n{signatureName}",
      },
      informal: {
        anonymous: "სიყვარულით,\nშენი მეგობარი",
        custom: "სიყვარულით,\n{signatureName}",
      },
      "parent.mama": {
        anonymous: "სიყვარულითა და მადლიერებით,\nშენი შვილი",
        custom: "სიყვარულითა და მადლიერებით,\n{signatureName}",
      },
      "parent.papa": {
        anonymous: "სიყვარულითა და მადლიერებით,\nშენი შვილი",
        custom: "სიყვარულითა და მადლიერებით,\n{signatureName}",
      },
      intimate: {
        anonymous: "სამუდამოდ შენი,\nმთელი ჩემი სიყვარულით",
        custom: "სამუდამოდ შენი,\n{signatureName}",
      },
    },
  },
};

const greetingIcons = ["🎉", "🎈", "🌟", "🎂", "🌸"];

function getRandomIcon(): string {
  return greetingIcons[Math.floor(Math.random() * greetingIcons.length)];
}

const wishEmojis = {
  dream: "✨",
  celebration: "🎉",
  enjoyment: "🎁",
};

export function generateGreeting(
  name: string,
  language: Language = "en",
  formality: Formality = "informal",
  signatureName?: string,
): GreetingConfig {
  const template = templates[language];

  const wishes: Wish[] = [
    { emoji: wishEmojis.dream, text: template.wishes.dream },
    { emoji: wishEmojis.celebration, text: template.wishes.celebration },
    { emoji: wishEmojis.enjoyment, text: template.wishes.enjoyment },
  ];

  const signatureTemplate = template.signature[formality];
  const signature = signatureName
    ? signatureTemplate.custom.replace("{signatureName}", signatureName)
    : signatureTemplate.anonymous;

  return {
    name,
    language,
    greetingText: template.greetingText.replace("{name}", name),
    greetingIcon: getRandomIcon(),
    message: template.message[formality],
    wishes,
    signature,
  };
}
