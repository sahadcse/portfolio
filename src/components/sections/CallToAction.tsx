import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
    return (
        <div className="my-12 p-8 rounded-md border border-primary/20 bg-primary/5">
            <h3 className="text-xl font-bold mb-3">Need a high-performance solution?</h3>
            <p className="text-muted-foreground mb-6">
                I help businesses build scalable backends and real-time applications. Let&apos;s discuss your project.
            </p>
            <Link
                href="/contact"
                className="inline-flex items-center text-primary font-medium hover:underline"
            >
                Let&apos;s talk <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>
    );
}
