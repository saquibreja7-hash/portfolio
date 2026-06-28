export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  sourceUrl: string;
  image: string;
  sections: Array<{
    heading?: string;
    paragraphs: string[];
  }>;
};

export const articles: BlogArticle[] = [
  {
    slug: "uk-under-16-social-media-ban",
    title: "Britain Bans Social Media for Under-16s: What a Contested Policy Teaches Us About Online Safety",
    excerpt:
      "The UK's under-16 social media ban is a case study in the hardest question of online safety: how do you protect children without creating new harms?",
    date: "Jun 15, 2026",
    category: "COMMENTARY",
    author: "Saquib Jamil",
    sourceUrl: "https://trustandsafetyindia.org/blog/uk-under-16-social-media-ban",
    image: "https://cdn.sanity.io/images/5ng74hdf/production/35352eb4ade15031c01dade43aa9c7ce64b2d8c3-1920x1080.jpg?w=1600&h=900",
    sections: [
      {
        paragraphs: [
          "On 15 June 2026, the United Kingdom became the second country in the world, after Australia, to commit to banning children under 16 from major social media platforms. Prime Minister Keir Starmer announced what the government called an Australia-plus policy: TikTok, Snapchat, Instagram, YouTube, Facebook, and X would be closed to under-16s, with regulations promised before Christmas and enforcement from spring 2027.",
          "Messaging apps like WhatsApp and Signal are exempt, while gaming, livestreaming, stranger contact, disappearing messages, location sharing, and romantic AI chatbots face new restrictions. Liability sits with platforms, not children or parents, and enforcement depends on highly effective age assurance.",
          "The reaction has been anything but unanimous. The policy follows a national consultation that drew more than 116,000 responses, with around 90 percent of parents backing a minimum age of 16. It also follows grief-driven campaigning, expert dissent, and warnings from child-safety organisations.",
        ],
      },
      {
        heading: "The Evidence Behind The Policy",
        paragraphs: [
          "The harms are real and measurable. Research cited around the announcement found that many UK girls had encountered harmful social-media content in a single week, and that a significant share of teenagers had seen high-risk suicide, self-harm, or eating-disorder material.",
          "Young people themselves often agree that the most harmful features should be reined in, while still wanting space to communicate, learn, and create. The disagreement is rarely about whether harm exists. It is about whether a blanket age ban is the best instrument to reduce it.",
        ],
      },
      {
        heading: "Support, Opposition, And The Privacy Trade-Off",
        paragraphs: [
          "Supporters frame the ban as a necessary response to an industry that has had too many chances to protect children and failed. Bereaved families have carried particular moral weight in the debate, arguing from lived loss rather than theory.",
          "The strongest opposition is not only from technology companies. It also comes from child-safety experts who worry that bans may be easy to announce and hard to enforce. Australia's early experience suggests that many under-16s retain access through fake IDs, VPNs, and workarounds, potentially shifting behaviour into less moderated spaces.",
          "The privacy problem is unavoidable: keeping under-16s off a platform means checking the age of everyone trying to use it. Government ID, facial age estimation, credit-card checks, and device-level verification all carry costs in privacy, breach risk, and the normalisation of identity checks as the price of using the open internet.",
        ],
      },
      {
        heading: "What India Should Watch",
        paragraphs: [
          "India is the world's largest open internet market, with nearly a billion users across dozens of languages. The harms driving the UK's decision, including algorithmic amplification of self-harm content, grooming, image-based abuse, and addictive design aimed at children, play out here at enormous scale.",
          "The lesson is not simply that bans are right or wrong. It is that a policy designed for children quietly reshapes the internet for adults too, and the hardest parts of governance often arrive after the announcement: age assurance, enforcement, migration to darker corners, and the cliff edge when a teenager turns 16.",
        ],
      },
    ],
  },
  {
    slug: "fable-5-shutdown-who-governs-ai",
    title: "Who Governs the Frontier? What the Fable 5 Shutdown Means for AI and the Global South",
    excerpt:
      "One government letter, one AI model switched off overnight, and a much larger question about who gets authority over frontier AI.",
    date: "Jun 13, 2026",
    category: "COMMENTARY",
    author: "Saquib Jamil",
    sourceUrl: "https://trustandsafetyindia.org/blog/fable-5-shutdown-who-governs-ai",
    image: "https://cdn.sanity.io/images/5ng74hdf/production/39ef09c672d84efbb00a91631d53051c83c9ad4a-1620x1080.png?rect=0,85,1620,911&w=1600&h=900",
    sections: [
      {
        paragraphs: [
          "On Friday, 12 June 2026, a letter from the US Commerce Secretary arrived at Anthropic. By evening, Fable 5 and Mythos 5, two of the most capable AI models ever deployed publicly, were switched off for every user outside the United States. There was no warning, no transition period, and no published technical justification.",
          "In the hours that followed, the conversation split into familiar camps: founders worrying about their products, nationalists declaring vindication, and safety researchers arguing over whether the trigger was real. But the deeper story is about how consequential technology is governed, and who gets to be in the room when decisions are made.",
        ],
      },
      {
        heading: "What Happened",
        paragraphs: [
          "Anthropic released Fable 5 on 9 June. Three days later, the US government cited a jailbreak demonstrated by a third party, invoked national security authority, and ordered access suspended for foreign nationals, including Anthropic's own non-citizen employees inside the United States, under the deemed export rule.",
          "Unable to cleanly separate US from non-US users on live infrastructure, Anthropic pulled the models for everyone. The company complied within hours, then argued that intervention should be transparent, fair, clear, and grounded in technical facts.",
        ],
      },
      {
        heading: "The Safety Paradox",
        paragraphs: [
          "The uncomfortable irony is familiar to anyone working on platform governance. Anthropic invested heavily in describing its models as potentially dangerous, building safeguards, and publishing risks openly. That framing appears to have given government the language to treat the model like a controlled strategic asset.",
          "This is the double bind of safety work: name a harm clearly enough and you create the justification for control; stay quiet and accountability suffers. Risk disclosure needs governance processes strong enough to handle it.",
        ],
      },
      {
        heading: "Why Due Process Matters",
        paragraphs: [
          "The troubling part is not whether states should ever intervene in dangerous AI. A credible case exists that they should. The problem is intervention without published evidence, shared technical review, notice, or appeal.",
          "When a capability used by millions can vanish on the say-so of one office, the missing infrastructure is due process. Without it, global access becomes unpredictable and contestable only for those with enough power to contest it.",
        ],
      },
      {
        heading: "The Global South Problem",
        paragraphs: [
          "The phrase foreign national should stop readers in Delhi, Lagos, Jakarta, and beyond. If the most capable AI systems become credentialed exports, available to US persons and US-aligned entities while withheld from everyone else, then the Global South risks structurally second-tier access to tools that will shape economies, public services, and information environments.",
          "For builders, model access is permission, not property. An API subscription is a revocable license inside a stack governed elsewhere. Critical systems need fallbacks, provider diversity, and governance plans that assume access can change overnight.",
        ],
      },
    ],
  },
  {
    slug: "what-is-trust-and-safety",
    title: "What is Trust and Safety? Apple, Meta, and Two Governments Just Showed Us",
    excerpt:
      "Apple's child safety features, a Meta AI flaw, the US Take It Down Act, and a UK scanning order show what trust and safety looks like in practice.",
    date: "Jun 12, 2026",
    category: "COMMENTARY",
    author: "Saquib Jamil",
    sourceUrl: "https://trustandsafetyindia.org/blog/what-is-trust-and-safety",
    image: "https://cdn.sanity.io/images/5ng74hdf/production/3e07e927845e964b4e3fa6fc7ff11ef98ba75c3b-1536x1024.png?rect=0,80,1536,864&w=1600&h=900",
    sections: [
      {
        paragraphs: [
          "Every time you report a harassing comment, recover a hacked account, or scroll a feed without stumbling into graphic violence, you are seeing trust and safety at work. It is one of the most consequential disciplines on the internet, and one of the least understood.",
          "In recent weeks, trust and safety has been at the centre of Apple's product announcements, a breach affecting more than twenty thousand Instagram accounts, a new American federal law, and a privacy standoff in the United Kingdom.",
        ],
      },
      {
        heading: "What Trust And Safety Means",
        paragraphs: [
          "Trust and safety is the work of protecting people from harm on digital platforms. The name covers a lot of ground, but the core is simple: someone has to decide what a platform allows, build the systems and teams that enforce those rules, and respond when something slips through.",
          "The visible part is content moderation: removing hate speech, harassment, misinformation, and graphic or illegal material. But the same teams also work on child safety, account takeovers, impersonation scams, image-based abuse, and policy implementation across legal regimes.",
          "Cybersecurity protects systems from attackers. Trust and safety protects people from each other, and increasingly from the misuse of a platform's own tools.",
        ],
      },
      {
        heading: "Apple Designs Safety Into The Operating System",
        paragraphs: [
          "At WWDC in June 2026, Apple put child safety at the centre of its keynote. Child Accounts apply age-tailored safeguards across the system, Ask to Browse requires parental approval before a child visits a new website, and Time Allowances give parents per-app and per-category controls.",
          "Communication Safety, which detects and blurs nudity in Messages and FaceTime, is now on by default for users under 18 and extends to violent and graphic content. The larger point is that safety is being treated as product architecture, not a settings page.",
        ],
      },
      {
        heading: "Meta's AI Support Bot Became An Attack Surface",
        paragraphs: [
          "In June 2026, Meta disclosed that 20,225 Instagram accounts were compromised after attackers abused its AI-powered support system. A bug meant the system failed to verify that the email address supplied in a password-reset conversation actually belonged to the account.",
          "Attackers could talk the chatbot into sending reset links for accounts they did not own, and in some cases change the account email entirely. The lesson is direct: when an AI agent can reset passwords, prompt manipulation becomes part of the attack surface.",
        ],
      },
      {
        heading: "Law, Safety, And Surveillance",
        paragraphs: [
          "The US Take It Down Act turned removal of non-consensual intimate imagery, including AI-generated deepfakes, into a legal obligation with a 48-hour clock. In practice, that means intake forms, reporter verification, hash-matching, audit trails, and teams that can move quickly without breaking due process.",
          "The UK's scanning order shows the harder edge of the debate. Child protection and private communication are both legitimate goals, but scanning every message before encryption can create vulnerabilities that make everyone less safe.",
          "Getting this balance right requires technologists, policymakers, child-safety advocates, and civil-liberties experts in the same room, working through trade-offs instead of talking past each other.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
