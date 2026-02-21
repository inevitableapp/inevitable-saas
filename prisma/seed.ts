import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLANS = [
    {
        id: "free_diagnostico",
        name: "Diagnóstico",
        price: 0,
        currency: "CLP",
        recommended: false,
    },
    {
        id: "plan_a_impulso",
        name: "Impulso",
        price: 5990,
        currency: "CLP",
        recommended: false,
        stripePriceId: "price_clp_5990_month",
    },
    {
        id: "plan_b_aceleracion",
        name: "Aceleración",
        price: 10990,
        currency: "CLP",
        recommended: true,
        stripePriceId: "price_clp_10990_month",
    },
    {
        id: "plan_c_inevitable_pro",
        name: "Inevitable Pro",
        price: 21990,
        currency: "CLP",
        recommended: false,
        stripePriceId: "price_clp_21990_month",
    },
];

const TEMPLATES = [
    {
        id: "tpl_ats_classic_1p",
        name: "ATS Classic (1 página)",
        active: true,
        isPremium: false,
        config: {
            layout: "single_column",
            pageTarget: 1,
            sectionsOrder: ["header", "summary", "skills", "experience", "education", "certifications", "languages", "projects"],
            typography: { "fontFamily": "Inter", "baseFontSize": 11, "headingSize": 14, "subheadingSize": 12, "lineHeight": 1.25 },
            formatting: { "useBullets": true, "bulletChar": "•", "maxBulletsPerExperience": 5, "dateFormat": "MMM YYYY", "uppercaseHeadings": true },
            rules: { "noTables": true, "noIcons": true, "noColumns": true, "avoidGraphics": true }
        }
    },
    {
        id: "tpl_ats_modern_2p",
        name: "ATS Modern (1–2 páginas)",
        active: true,
        isPremium: true,
        config: {
            layout: "single_column",
            pageTarget: 2,
            sectionsOrder: ["header", "summary", "coreCompetencies", "experience", "education", "skills", "certifications", "languages", "projects"],
            typography: { "fontFamily": "Inter", "baseFontSize": 10.5, "headingSize": 14, "subheadingSize": 12, "lineHeight": 1.22 },
            formatting: { "useBullets": true, "bulletChar": "•", "maxBulletsPerExperience": 6, "dateFormat": "YYYY", "uppercaseHeadings": false },
            rules: { "noTables": true, "noIcons": true, "noColumns": true, "avoidGraphics": true }
        }
    },
    {
        id: "tpl_ats_minimal_impact_1p",
        name: "ATS Minimal Impact (1 página)",
        active: true,
        isPremium: false,
        config: {
            layout: "single_column",
            pageTarget: 1,
            sectionsOrder: ["header", "summary", "experience", "skills", "education", "certifications"],
            typography: { "fontFamily": "Inter", "baseFontSize": 11, "headingSize": 13, "subheadingSize": 12, "lineHeight": 1.2 },
            formatting: { "useBullets": true, "bulletChar": "-", "maxBulletsPerExperience": 4, "dateFormat": "MMM YYYY", "uppercaseHeadings": true },
            rules: { "noTables": true, "noIcons": true, "noColumns": true, "avoidGraphics": true }
        }
    }
];

const PROMPTS = [
    {
        key: "ATS_SCAN_V1",
        content: `SYSTEM:
Eres un especialista en reclutamiento y ATS (Applicant Tracking Systems). Evalúas CVs con criterios reales y prácticos.
No inventes datos. No asumas experiencia que no exista. Responde SIEMPRE en JSON válido.
USER:
Analiza el siguiente perfil/CV estructurado (JSON) para el objetivo laboral indicado.
Devuelve:
- score (0-100)
- criticalErrors[] (máx 10, ordenados por impacto)
- warnings[] (máx 10)
- missingKeywords[] (máx 25) basadas en el objetivo laboral
- atsReadability (0-100)
- impactStrength (0-100)
- clarity (0-100)
- suggestions[] (máx 12) accionables, sin inventar experiencia
Objetivo laboral: {{targetRole}}
País/mercado: {{country}}
Perfil/CV JSON: {{profileJson}}
REGLAS:
- Si el usuario no tiene experiencia, sugiere alternativas honestas: proyectos, cursos, voluntariado, prácticas, logros transferibles.
- Penaliza: falta de logros cuantificables, bullets débiles (“responsable de”), exceso de texto, falta de keywords, incoherencias de fechas, títulos vagos.
- Evita diseño gráfico; enfócate en ATS.
- Salida JSON estricto con esquema:
{
  "score": 0,
  "atsReadability": 0,
  "impactStrength": 0,
  "clarity": 0,
  "criticalErrors": [{"code":"","title":"","detail":"","fix":""}],
  "warnings": [{"code":"","title":"","detail":"","fix":""}],
  "missingKeywords": [{"keyword":"","reason":""}],
  "suggestions": [{"title":"","why":"","how":""}]
}`
    },
    {
        key: "LOST_OPPORTUNITIES_V1",
        content: `SYSTEM:
Eres un analista de empleabilidad. Estima oportunidades perdidas con heurísticas realistas.
No inventes ofertas concretas ni uses fuentes externas. Estima con rangos y explica supuestos.
Responde SIEMPRE en JSON válido.
USER:
Dado este perfil y su diagnóstico ATS, estima oportunidades perdidas si el usuario no mejora su CV.
Devuelve:
- jobMatchesEstimate {min,max}
- salaryRangeEstimate {min,max,currency} (si no hay datos, currency="unknown" y min/max null)
- interviewProbNow (0-1)
- interviewProbOptimized (0-1)
- rolesReachable[] (máx 8)
- topLossDrivers[] (máx 6)
- valueNarrative (2-3 líneas persuasivo sin exagerar)
Perfil: {{profileJson}}
Diagnóstico: {{diagnosticJson}}
Mercado: {{country}}
JSON estricto:
{
  "jobMatchesEstimate": {"min":0,"max":0},
  "salaryRangeEstimate": {"min":null,"max":null,"currency":"unknown"},
  "interviewProbNow": 0.0,
  "interviewProbOptimized": 0.0,
  "rolesReachable": [{"role":"","why":""}],
  "topLossDrivers": [{"title":"","detail":""}],
  "valueNarrative": ""
}`
    },
    {
        key: "PREVIEW_LOCKED_V1",
        content: `SYSTEM:
Eres un redactor ATS. Produces una versión mejorada del CV como PREVIEW BLOQUEADO.
No inventes experiencia. Si falta info usa placeholders [métrica], [herramienta], [resultado].
Responde SIEMPRE en JSON válido.
USER:
Genera preview mejorada para mostrar borrosa/bloqueada (FREE).
Máximo 1 página. locked=true.
Objetivo: {{targetRole}}
Perfil JSON: {{profileJson}}
Salida JSON:
{
  "locked": true,
  "templateSuggestion": "tpl_ats_classic_1p",
  "content": {
    "header": {},
    "summary": "",
    "skills": [],
    "experience": [],
    "education": [],
    "certifications": []
  }
}`
    },
    {
        key: "GENERATE_OPTIMIZED_CV_V1",
        content: `SYSTEM:
Eres experto ATS y redactor profesional. Optimiza para rol objetivo sin inventar datos.
Responde SIEMPRE en JSON válido.
USER:
Genera CV optimizado ATS en template indicado. Máximo 2 páginas según template.
Sin tablas/íconos/columnas. Bullets: verbo + acción + resultado + métrica (si hay).
Objetivo: {{targetRole}}
TemplateId: {{templateId}}
Perfil JSON: {{profileJson}}
Salida JSON:
{
  "templateId": "",
  "content": {
    "header": {},
    "summary": "",
    "coreCompetencies": [],
    "skills": [],
    "experience": [],
    "education": [],
    "certifications": [],
    "languages": [],
    "projects": []
  }
}`
    },
    {
        key: "GENERATE_COVER_LETTER_V1",
        content: `SYSTEM:
Eres reclutador y copywriter. Carta breve, específica y sin clichés. No inventes experiencia.
Responde SIEMPRE en JSON válido.
USER:
Genera carta para:
Cargo: {{jobTitle}}
Empresa: {{company}}
Tono: {{tone}}
Usa CV/Perfil JSON: {{profileJson}}
Job description: {{jobDescription}}
Estructura: Apertura / Ajuste con 2-3 pruebas / Cierre CTA entrevista
Salida JSON: { "subject":"","body":"" }`
    },
    {
        key: "QUANTIFY_ACHIEVEMENTS_V1",
        content: `SYSTEM:
Eres un coach de logros cuantificables. No inventes números; propone rangos y placeholders.
Responde SIEMPRE en JSON válido.
USER:
Convierte este texto en 3-5 logros cuantificables ATS.
Texto: {{text}}
Salida JSON:
{
  "bullets": [
    {"bullet":"","needsUserMetric": true, "suggestedMetrics":[""], "placeholderExample":"[métrica]"}
  ]
}`
    },
    {
        key: "IMPROVE_BULLETS_V1",
        content: `SYSTEM:
Eres editor ATS. Reescribes bullets para impacto sin inventar.
Responde SIEMPRE en JSON válido.
USER:
Mejora estos bullets para rol objetivo: {{targetRole}}
Bullets: {{bulletsJson}}
Reglas:
- Mantén verdad. No agregues herramientas/logros no mencionados.
- Si falta métrica: placeholder [métrica] y needsUserMetric=true.
Salida JSON:
{
  "bullets": [
    {"original":"","improved":"","needsUserMetric": true}
  ]
}`
    }
];

async function main() {
    console.log("Seeding Database...");

    console.log("Seeding Pricing Plans...");
    for (const plan of PLANS) {
        await prisma.pricingPlan.upsert({
            where: { id: plan.id },
            update: {
                name: plan.name,
                price: plan.price,
                currency: plan.currency,
                recommended: plan.recommended,
                stripePriceId: plan.stripePriceId,
            },
            create: {
                id: plan.id,
                name: plan.name,
                price: plan.price,
                currency: plan.currency,
                recommended: plan.recommended,
                stripePriceId: plan.stripePriceId,
            },
        });
    }

    console.log("Seeding CV Templates...");
    for (const template of TEMPLATES) {
        await prisma.cVTemplate.upsert({
            where: { id: template.id },
            update: {
                name: template.name,
                active: template.active,
                isPremium: template.isPremium,
                config: template.config,
            },
            create: {
                id: template.id,
                name: template.name,
                active: template.active,
                isPremium: template.isPremium,
                config: template.config,
            },
        });
    }

    console.log("Seeding Admin Prompts...");
    for (const prompt of PROMPTS) {
        await prisma.adminPrompt.upsert({
            where: { key: prompt.key },
            update: {
                content: prompt.content,
                active: true,
            },
            create: {
                key: prompt.key,
                content: prompt.content,
                version: 1,
                active: true,
            },
        });
    }

    console.log("Seed completed successfully.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
