import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { config } from "./config";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Quiz da Libertadores — responda e resgate seu prêmio",
  description:
    "6 perguntas sobre a Libertadores. Quanto mais você acertar, maior o prêmio pra resgatar no WhatsApp na reta final.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "Quiz da Libertadores — responda e resgate seu prêmio",
    description: "Prova que você é da Glória Eterna e resgata seu prêmio no WhatsApp.",
    type: "website",
  },
};

export const viewport = {
  themeColor: config.tema.fundo,
  width: "device-width",
  initialScale: 1,
};

function Pixel({ id }) {
  if (!id) return null;
  const code = [
    "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?",
    "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;",
    "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;",
    "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,",
    "document,'script','https://connect.facebook.net/en_US/fbevents.js');",
    "fbq('init','" + id + "');fbq('track','PageView');",
  ].join("\n");
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default function RootLayout({ children }) {
  const t = config.tema;
  const style = {
    "--gold": t.destaque,
    "--bg": t.fundo,
    "--bg-top": t.fundoClaro,
    "--card": t.card,
    "--border": t.borda,
  };
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`} style={style}>
      <head>
        <Pixel id={config.pixelId} />
      </head>
      <body>{children}</body>
    </html>
  );
}
