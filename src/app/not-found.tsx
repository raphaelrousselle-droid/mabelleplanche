import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="font-serif text-5xl text-ecorce">404</p>
      <h1 className="mt-4 text-xl text-ecorce">Cette page n&apos;existe pas</h1>
      <p className="mt-2 text-brou">
        Le lien est peut-être ancien, ou la planche a changé d&apos;adresse.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-chene px-5 py-2.5 font-medium text-white hover:bg-chene-fonce"
        >
          Accueil
        </Link>
        <Link
          href="/catalogue"
          className="rounded-lg border border-bordure px-5 py-2.5 font-medium text-ecorce hover:bg-creme"
        >
          Catalogue
        </Link>
      </div>
    </div>
  );
}
