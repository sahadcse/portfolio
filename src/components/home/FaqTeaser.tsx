import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FAQ_ITEMS } from "@/data/faq";

/**
 * FAQ teaser (plan §6.3 #7): objection handling — ownership, maintenance,
 * timezone — with a link to the full FAQ on the services page. Questions
 * are referenced by id from the shared FAQ data (no duplicated copy).
 */
const TEASER_IDS = ["code-ownership", "retainer-model", "communication-timezone"];

export default async function FaqTeaser() {
    const t = await getTranslations("home.faqTeaser");
    const items = TEASER_IDS.map((id) => FAQ_ITEMS.find((item) => item.id === id)).filter(
        (item): item is (typeof FAQ_ITEMS)[number] => Boolean(item)
    );

    return (
        <section id="faq" className="py-16 md:py-24">
            <div className="container-content">
            <h2 className="text-h2 mb-10">{t("title")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {items.map((item) => (
                    <div key={item.id} className="rounded-md border border-border/50 bg-card p-6">
                        <h3 className="text-body font-semibold text-foreground mb-2.5">
                            {item.question}
                        </h3>
                        <p className="text-body text-muted-foreground">{item.answer}</p>
                    </div>
                ))}
            </div>

            <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-label text-primary hover:underline"
            >
                {t("link")}
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
            </Link>
            </div>
        </section>
    );
}
