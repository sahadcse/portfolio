import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Shared page opening (mono eyebrow → title → lead) so About/Services/
 * Contact/Projects all start from the same visual grammar. `cta` renders
 * an inline primary button after the lead when given.
 */
export default function PageHero({
    eyebrow,
    title,
    lead,
    cta,
}: {
    eyebrow?: string;
    title: string;
    /** String or rich-text node (t.rich output) */
    lead: React.ReactNode;
    cta?: { label: string; href: string };
}) {
    return (
        <div className="max-w-3xl mb-14 md:mb-20">
            {eyebrow && <p className="text-mono text-muted-foreground mb-5">{eyebrow}</p>}
            <h1 className="text-hero mb-5">{title}</h1>
            <p className="text-lead max-w-2xl mb-2">{lead}</p>
            {cta && (
                <Link href={cta.href} className="inline-flex mt-4">
                    <Button size="md">
                        {cta.label}
                        <ArrowRight className="ms-2 w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                    </Button>
                </Link>
            )}
        </div>
    );
}
