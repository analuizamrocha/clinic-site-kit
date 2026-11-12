import type { SiteConfig } from '@/lib/site/types'

/**
 * ⚠️ FICTIONAL DEMO PRACTICE. Every name, number and address below is invented
 * so the starter builds and its tests run. `scripts/new-site` replaces this
 * file from a filled client brief; never publish it as is (`fictional: true`
 * noindexes the site, shows a demo banner and fails a production build).
 *
 * Clinical copy here is placeholder-grade and generic. Real service text comes
 * from the practitioner and goes through the compliance review.
 */
const config: SiteConfig = {
  fictional: true,

  brand: {
    siteName: 'Dra. Helena Exemplo',
    url: 'https://www.helena-exemplo.com.br',
    locale: 'pt-BR',
    tagline: 'Consulta dermatológica com escuta, explicação clara e acompanhamento.',
    description:
      'Dermatologista em Florianópolis - SC. Avaliação de pele, cabelo e unhas com acompanhamento individualizado. Site de demonstração.',
    palette: {
      primary: '#1f4e5f',
      onPrimary: '#ffffff',
      accent: '#c58b5b',
      background: '#fbf8f4',
      surface: '#f1ebe3',
      text: '#1c2428',
      muted: '#55626a',
    },
    primaryContactId: 'agendamento',
  },

  practitioner: {
    name: 'Helena Exemplo Modelo',
    displayName: 'Dra. Helena Exemplo',
    specialty: 'Dermatologista',
    council: { body: 'CRM', region: 'SC', number: '00000' },
    rqe: ['00000'],
    bio: 'Médica dermatologista. Atende em consultório com foco em avaliação cuidadosa, explicação clara e acompanhamento ao longo do tempo.',
    credentials: [
      'Residência em Dermatologia (instituição fictícia de demonstração)',
      'Título de especialista (dado fictício de demonstração)',
    ],
    photo: {
      src: '/images/practitioner.svg',
      alt: 'Ilustração neutra no lugar do retrato profissional',
      width: 800,
      height: 1000,
    },
    sameAs: ['https://www.instagram.com/helena.exemplo.demo'],
  },

  contacts: [
    {
      id: 'agendamento',
      purpose: 'consulta',
      channel: 'whatsapp',
      e164: '+5548900000000',
      display: '(48) 90000-0000',
      ctaLabel: 'Agendar consulta',
      message: 'Olá! Vim pelo site e gostaria de agendar uma consulta com a Dra. Helena.',
    },
    {
      id: 'recepcao',
      purpose: 'secretaria',
      channel: 'phone',
      e164: '+554830000000',
      display: '(48) 3000-0000',
      ctaLabel: 'Ligar para a recepção',
    },
  ],

  locations: [
    {
      id: 'consultorio-centro',
      slug: 'florianopolis-centro',
      name: 'Consultório Centro (endereço fictício)',
      address: {
        street: 'Rua Exemplo',
        number: '100',
        complement: 'Sala 1',
        district: 'Centro',
        city: 'Florianópolis',
        region: 'SC',
        postalCode: '88000-000',
      },
      hours: ['Segunda a sexta, 8h às 18h'],
      contactIds: ['agendamento', 'recepcao'],
    },
  ],

  services: [
    {
      slug: 'consulta-dermatologica',
      title: 'Consulta dermatológica',
      summary: 'Avaliação de pele, cabelo e unhas, com explicação do que foi observado e dos próximos passos.',
      indications: [
        'Alterações na pele que surgiram ou mudaram recentemente',
        'Acompanhamento de uma condição já diagnosticada',
        'Dúvidas sobre cuidados diários com a pele',
      ],
      body: [
        'A consulta começa pela conversa sobre o que motivou a visita e pelo histórico de saúde.',
        'Em seguida vem o exame da pele. A conduta é explicada e definida em conjunto, conforme o caso.',
      ],
      faqs: [
        {
          question: 'Preciso levar exames anteriores?',
          answer: 'Se tiver, leve. Exames e receitas anteriores ajudam a entender o histórico.',
        },
      ],
      contactId: 'agendamento',
      locationIds: ['consultorio-centro'],
      state: 'published',
      indexable: true,
    },
    {
      slug: 'acompanhamento-de-pintas',
      title: 'Acompanhamento de pintas',
      summary: 'Avaliação periódica de pintas e sinais na pele, com registro para comparar ao longo do tempo.',
      indications: ['Pintas que mudaram de tamanho, cor ou formato', 'Histórico familiar que justifique acompanhamento'],
      body: ['A frequência do acompanhamento é definida na consulta, de acordo com cada pessoa.'],
      faqs: [],
      contactId: 'agendamento',
      locationIds: ['consultorio-centro'],
      state: 'published',
      indexable: false,
    },
  ],

  faqs: [
    {
      question: 'Como agendar uma consulta?',
      answer: 'Pelo WhatsApp do consultório ou por telefone, nos horários de atendimento.',
    },
    {
      question: 'Onde fica o consultório?',
      answer: 'No Centro de Florianópolis. O endereço completo está na página de atendimento.',
    },
  ],

  analytics: {},

  privacy: {
    controller: 'Helena Exemplo Modelo (demonstração)',
    email: 'privacidade@helena-exemplo.com.br',
  },
}

export default config
