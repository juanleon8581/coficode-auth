import { Button } from "@/presentation/components/ui/button";
import { Locale } from "@/infrastructure/i18n/config";
import { getDictionary } from "@/infrastructure/i18n/dictionaries";
import { LocalizedLink } from "@/presentation/components/LocalizedLink/LocalizedLink";

interface Props {
  params: Promise<{ lang: Locale }>;
}

export default async function Home({ params }: Readonly<Props>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex items-center justify-center h-screen gap-6">
      <Button>
        <LocalizedLink href="/login" locale={lang}>
          {dict.login.submitButton}
        </LocalizedLink>
      </Button>
      <Button>
        <LocalizedLink href="/register" locale={lang}>
          {dict.register.submitButton}
        </LocalizedLink>
      </Button>
    </div>
  );
}
